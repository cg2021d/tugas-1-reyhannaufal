import * as THREE from "three";

export const pointLight = new THREE.PointLight(new THREE.Color("gray"), 2, 500);
pointLight.castShadow = true;
pointLight.position.set(0, 10, 30);
pointLight.shadow.mapSize.width = 1024;