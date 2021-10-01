export function getPointOnBezierCurve(points, offset, t) {
  const invT = 1 - t;
  return v2.add(
    v2.mult(points[offset + 0], invT * invT * invT),
    v2.mult(points[offset + 1], 3 * t * invT * invT),
    v2.mult(points[offset + 2], 3 * invT * t * t),
    v2.mult(points[offset + 3], t * t * t)
  );
}

export function getPointsOnBezierCurve(points, offset, numPoints) {
  const cpoints = [];
  for (let i = 0; i < numPoints; ++i) {
    const t = i / (numPoints - 1);
    cpoints.push(getPointOnBezierCurve(points, offset, t));
  }
  return cpoints;
}
