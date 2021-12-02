import * as THREE from "three";

export const pointLight = new THREE.PointLight(new THREE.Color("gray"), 2, 200);
pointLight.castShadow = true;
pointLight.position.set(-5, 10, 10);
pointLight.shadow.mapSize.width = 1024;

/**
 * DirecitonalLight
 */
export const directionalLight = new THREE.DirectionalLight(
  new THREE.Color("white"),
  1
);
directionalLight.castShadow = true;
directionalLight.position.set(-20, 10, 30);
