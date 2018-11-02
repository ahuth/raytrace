export const UP = create(0, 1, 0);

export function create(x, y, z) {
  return { x, y, z };
}

// Return the Euclidean norm (AKA length) of a vector.
// See https://en.wikipedia.org/wiki/Euclidean_vector#Length
export function length(a) {
  return Math.sqrt(dot(a, a));
}

// Return the dot product of two vectors.
// See https://en.wikipedia.org/wiki/Dot_product
export function dot(a, b) {
  return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
}

// Return the cross product of two vectors.
// See https://en.wikipedia.org/wiki/Cross_product
export function cross(a, b) {
  return create(
    (a.y * b.z) - (a.z * b.y),
    (a.z * b.x) - (a.x * b.z),
    (a.x * b.y) - (a.y * b.x),
  );
}

// Elongate or shrink a vector by `factor`.
export function scale(a, factor) {
  return create(
    a.x * factor,
    a.y * factor,
    a.z * factor,
  );
}

// Return a new vector with magnitude (or length) of 1.
export function unitVector(a) {
  return scale(a, 1 / length(a));
}

// Return a new vector by adding together two vectors.
export function add(a, b) {
  return create(
    a.x + b.x,
    a.y + b.y,
    a.z + b.z,
  );
}

// Return a new vector by adding together three vectors.
export function add3(a, b, c) {
  return create(
    a.x + b.x + c.x,
    a.y + b.y + c.y,
    a.z + b.z + c.z,
  );
}

// Return a new vector by subtracting one from another.
export function subtract(a, b) {
  return create(
    a.x - b.x,
    a.y - b.y,
    a.z - b.z,
  );
}

// Given a vector `a` and a `normal`, which is the angle at which
// the vector hits a surface, return a new vector which is reflected off of
// that surface.
export function reflectThrough(a, normal) {
  const temp = scale(normal, dot(a, normal));
  return subtract(scale(temp, 2), a);
}
