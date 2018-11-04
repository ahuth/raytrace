import * as Sphere from './sphere.js';
import * as Vector from './vector.js';

export function create(origin, vector) {
  return {
    point: origin,
    vector,
  };
}

// Given a ray, shoot it through the scene until it hits an object and return that object's color.
export function trace(ray, scene, depth) {
  // Limit the amount of bouncing around (and therefore recursion) that we'll do.
  if (depth > 3) { return; }

  // Find what this ray hits and how far it travelled to do so.
  const { distance, object } = intersectScene(ray, scene);

  if (distance === Infinity) {
    return Vector.WHITE;
  }

  // Find the point this Ray intersects by taking the direction the ray is going and making it as
  // long as the distance from the intersection check.
  const intersectionPoint = Vector.add(ray.point, Vector.scale(ray.vector, distance));

  // Return the color the ray should be after interacting with objects in the scene.
  return surface(
    ray,
    scene,
    object,
    intersectionPoint,
    Sphere.normal(object, intersectionPoint),
    depth,
  );
}

// Given a ray, find the closest thing it hits in the scene.
function intersectScene(ray, scene) {
  let closest = {
    distance: Infinity,
    object: null,
  };

  for (let i = 0; i < scene.objects.length; i++) {
    const object = scene.objects[i];
    const distance = Sphere.intersection(object, ray);

    if (distance != null && distance < closest.distance) {
      closest = { distance, object };
    }
  }

  return closest;
}


// Given that we a ray has hit an object, determine what color the ray acquires from the
// interaction.
function surface(ray, scene, object, intersectionPoint, normal, depth) {
  const objectColor = object.color;
  let rayColor = Vector.ZERO;
  let lambertAmount = 0;

  // Lambert shading.
  // See http://en.wikipedia.org/wiki/Lambertian_reflectance
  if (object.lambert) {
    for (let i = 0; i < scene.lights.length; i++) {
      const lightPoint = scene.lights[i];

      // Can we even see the light?
      if (!isLightVisible(intersectionPoint, scene, lightPoint)) { continue; }

      // Calculate lambertian reflectance.
      const contribution = Vector.dot(
        Vector.unitVector(Vector.subtract(lightPoint, intersectionPoint)),
        normal,
      );

      if (contribution > 0) {
        lambertAmount += contribution;
      }
    }
  }

  // Specular reflection.
  // See https://en.wikipedia.org/wiki/Specular_reflection
  if (object.specular) {
    // Basically the same process as 'render', except from the standpoint of a point on an object.
    const reflectedRay = create(
      intersectionPoint,
      Vector.reflectThrough(ray.vector, normal),
    );

    const reflectedColor = trace(reflectedRay, scene, depth + 1);

    if (reflectedColor) {
      rayColor = Vector.add(rayColor, Vector.scale(reflectedColor, object.specular));
    }
  }

  // Ensure lambert never "blows out" the lighting of an object, even if it bounces between lots of
  // objects and lights.
  lambertAmount = Math.min(1, lambertAmount);

  // Ambient light shines bright regardless of whether a light is visible or not.
  return Vector.add3(
    rayColor,
    Vector.scale(objectColor, lambertAmount * object.lambert),
    Vector.scale(objectColor, object.ambient),
  );
}

// Check whether a light is visible from some point on the surface of something.
// Note that there might be an intersection here, which is tricky - but if it's
// tiny, it's actually an intersection with the object we're trying to decide
// the surface of. That's why we check for `> -0.005` at the end.
//
// This is the part that makes objects cast shadows on each other: from here
// we'd check to see if the area in a shadowy spot can 'see' a light, and when
// this returns `false`, we make the area shadowy.
function isLightVisible(point, scene, light) {
  const { distance } = intersectScene(
    create(
      point,
      Vector.unitVector(Vector.subtract(point, light))),
    scene,
  );

  return distance > -0.005;
}
