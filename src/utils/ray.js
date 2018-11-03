import * as Vector from './vector';

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
    sphereNormal(object, intersectionPoint),
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
    const distance = sphereIntersection(object, ray);

    if (distance != null && distance < closest.distance) {
      closest = { distance, object };
    }
  }

  return closest;
}

// A normal is a vector radiating outward from a point on a sphere's surface, perpendicular to the
// surface. See https://en.wikipedia.org/wiki/Normal_(geometry).
function sphereNormal(sphere, point) {
  return Vector.unitVector(Vector.subtract(point, sphere.point));
}

// Get the distance between a sphere and a ray.
function sphereIntersection(sphere, ray) {
  // Imagine a triangle with the following sides:
  // - Camera point to center of the sphere
  // - The ray's vector
  // - Right angle between the other two
  const eyeToCenter = Vector.subtract(sphere.point, ray.point);
  const vectorLength = Vector.dot(eyeToCenter, ray.vector);
  const toCenterOfSphereLength = Vector.dot(eyeToCenter, eyeToCenter);

  // Not exactly sure what a disciminant is, but see https://en.wikipedia.org/wiki/Discriminant.
  // Has something to do with the segment from the right angle of the triangle to a point on the
  // vector's line that also intersects the sphere.
  const discriminant = (sphere.radius * sphere.radius) - toCenterOfSphereLength + (vectorLength * vectorLength);

  // If the descriminant is negative, the sphere has **_not_** been hit by the ray.
  if (discriminant < 0) {
    return;
  }

  // Return the distance from the camera to the sphere.
  return vectorLength - Math.sqrt(discriminant);
}

function surface(ray, scene, object, intersectionPoint, normal, depth) {
  return Vector.create(0, 0, 0);
}
