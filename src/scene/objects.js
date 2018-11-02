import Sphere from '../utils/sphere.js';
import Vector from '../utils/vector.js';

export default [
  new Sphere({
    point: new Vector(0, 3.5, -3),
    color: new Vector(155, 200, 155),
    specular: 0.2,
    lambert: 0.7,
    ambient: 0.1,
    radius: 3,
  }),
  new Sphere({
    point: new Vector(-4, 2, -1),
    color: new Vector(155, 155, 155),
    specular: 0.1,
    lambert: 0.9,
    ambient: 0.0,
    radius: 0.2,
  }),
  new Sphere({
    point: new Vector(-4, 3, -1),
    color: new Vector(255, 255, 255),
    specular: 0.2,
    lambert: 0.7,
    ambient: 0.1,
    radius: 0.1,
  }),
];
