import * as Ray from './ray.js';
import * as Vector from './vector.js';

// For each pixel of our canvas, bounce a ay from the eye through the scene, determining if any
// objects or lights are encountered.
export default function render(scene, height, width, pixelData) {
  const { camera, objects, lights } = scene;

  // Vector pointing in the direction the camera is pointing.
  const eyeVector = Vector.unitVector(Vector.subtract(camera.vector, camera.point));

  // Vectors rotated up and right from the direction the camera is pointing. Recall that the cross
  // product returns a new vector perpendicular to plain formed by two vectors.
  const facingRight = Vector.unitVector(Vector.cross(eyeVector, Vector.UP));
  const facingUp = Vector.unitVector(Vector.cross(facingRight, eyeVector));

  const fovRadians = Math.PI * (camera.fieldOfView / 2) / 180;
  const heightWidthRatio = height / width;
  const halfWidth = Math.tan(fovRadians);
  const halfHeight = heightWidthRatio * halfWidth;
  const cameraWidth = halfWidth * 2;
  const cameraHeight = halfHeight * 2;
  const pixelWidth = cameraWidth / (width - 1);
  const pixelHeight = cameraHeight / (height - 1);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Turn the ray `x` and `y` pixel values into values between -1 and 1, and use those values
      // to scale the right and up vectors, so tht we can skew the eye vector in each necessary
      // direction.
      const xComp = Vector.scale(facingRight, x * pixelWidth - halfWidth);
      const yComp = Vector.scale(facingUp, y * pixelHeight - halfHeight);

      const ray = Ray.create(
        camera.point,
        Vector.unitVector(Vector.add3(eyeVector, xComp, yComp)),
      );

      const color = Ray.trace(ray, scene);
      const index = (x * 4) + (y * width * 4);

      // Directly modify the pixel data of our canvas.
      pixelData.data[index + 0] = color.x;
      pixelData.data[index + 1] = color.y;
      pixelData.data[index + 2] = color.z;
      pixelData.data[index + 3] = 255;
    }
  }

  // Return the generated pixel values.
  return pixelData;
}
