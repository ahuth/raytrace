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

function intersectScene(ray, scene) {
  return {
    distance: Infinity,
    object: {},
  };
}

// A normal is a vector radiating outward from a point on a sphere's surface, perpendicular to the
// surface. See https://en.wikipedia.org/wiki/Normal_(geometry).
function sphereNormal(sphere, point) {
  return Vector.unitVector(Vector.subtract(point, sphere.point));
}

function surface(ray, scene, object, intersectionPoint, normal, depth) {
  return Vector.create(0, 0, 0);
}
