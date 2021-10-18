import * as THREE from "three";

import { COLOR_LIST } from "../constants/color";
import { generateNumber } from "./generateNumber";

export const generateBox = (scene) => {
  const color = COLOR_LIST[Math.floor(generateNumber(0, 6))];
  const roughness = generateNumber(0, 1);
  const metalness = generateNumber(0, 1);
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({
    roughness,
    metalness,
    color,
    })
  );
  box.position.set(
    generateNumber(-20, 20),
    generateNumber(-20, 20),
    generateNumber(-20, 20)
  );
  scene.add(box ?? '');
};
