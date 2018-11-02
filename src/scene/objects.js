import * as Vector from '../utils/vector.js';

export default [
  {
    point: Vector.create(0, 3.5, -3),
    color: Vector.create(155, 200, 155),
    specular: 0.2,
    lambert: 0.7,
    ambient: 0.1,
    radius: 3,
  },
  {
    point: Vector.create(-4, 2, -1),
    color: Vector.create(155, 155, 155),
    specular: 0.1,
    lambert: 0.9,
    ambient: 0.0,
    radius: 0.2,
  },
  {
    point: Vector.create(-4, 3, -1),
    color: Vector.create(255, 255, 255),
    specular: 0.2,
    lambert: 0.7,
    ambient: 0.1,
    radius: 0.1,
  },
];
