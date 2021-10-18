import * as THREE from "three";

export const ambientLight = new THREE.AmbientLight(
  new THREE.Color(0xffffff),
  0.51
);

export const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);

export const hemisphereLight = new THREE.HemisphereLight(
  0xff0000,
  0x000ff,
  0.3
);

export const pointLight = new THREE.PointLight(0xffffff, 2, 500);
pointLight.castShadow = true;
pointLight.position.set(0, 50, 30);

export const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.lookAt(new THREE.Vector3(-2, 0, 1.5));

export const spotLight = new THREE.SpotLight(0x78ff00, 1, 100, Math.PI / 4, 1);
spotLight.position.set(2, 0, 0);
