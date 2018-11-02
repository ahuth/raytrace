import * as Vector from './vector.js';

export default function render(scene) {
  const { camera, objects, lights } = scene;

  // Vector pointing in the direction the camera is pointing.
  const eyeVector = Vector.unitVector(Vector.subtract(camera.vector, camera.point));

  // Vectors rotated up and right from the direction the camera is pointing. Recall that the cross
  // product returns a new vector perpendicular to plain formed by two vectors.
  const eyeRight = Vector.unitVector(Vector.cross(eyeVector, Vector.UP));
  const eyeUp = Vector.unitVector(Vector.cross(eyeRight, eyeVector));
}
