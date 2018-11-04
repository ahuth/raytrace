import * as Vector from './vector';

export function create({ point, color, specular, lambert, ambient, radius }) {
  return { point, color, specular, lambert, ambient, radius };
}

// A normal is a vector radiating outward from a point on a sphere's surface, perpendicular to the
// surface. See https://en.wikipedia.org/wiki/Normal_(geometry).
export function normal(sphere, point) {
  return Vector.unitVector(Vector.subtract(point, sphere.point));
}

// Get the distance between a sphere and a ray.
export function intersection(sphere, ray) {
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
