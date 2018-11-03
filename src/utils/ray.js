import * as Vector from './vector';

export function create(origin, vector) {
  return {
    point: origin,
    vector,
  };
}

export function trace(ray, scene, depth) {
  return Vector.create(0, 0, 0);
}
