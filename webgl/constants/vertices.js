const leftLeaf = {
  color: [0, 1, 0],
  pointA: [-0.2, 0.0],
  pointB: [-0.8, 0.0],
  pointC: [-0.5, 0.3],
  pointD: [-0.5, -0.8],
};

const rightLeaf = {
  color: [0, 1, 0],
  pointA: [0.2, 0.0],
  pointB: [0.8, 0.0],
  pointC: [0.5, 0.3],
  pointD: [0.5, -0.3],
};

export const vertices = [
  ...leftLeaf.pointA,
  ...leftLeaf.color,
  ...leftLeaf.pointB,
  ...leftLeaf.color,
  ...leftLeaf.pointC,
  ...leftLeaf.color,
  ...leftLeaf.pointA,
  ...leftLeaf.color,
  ...leftLeaf.pointB,
  ...leftLeaf.color,
  ...leftLeaf.pointD,
  ...leftLeaf.color,
  ...rightLeaf.pointA,
  ...rightLeaf.color,
  ...rightLeaf.pointB,
  ...rightLeaf.color,
  ...rightLeaf.pointC,
  ...rightLeaf.color,
  ...rightLeaf.pointA,
  ...rightLeaf.color,
  ...rightLeaf.pointB,
  ...rightLeaf.color,
  ...rightLeaf.pointD,
  ...rightLeaf.color,
];
