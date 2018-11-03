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

  return Vector.create(0, 0, 0);
}
