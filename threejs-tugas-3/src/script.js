import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { generateBox } from "./utils/generateBox";
import { SIZES } from "./constants/sizes";
import { pointLight } from "./lights/rootLights";
import {
  grassAmbientOcclusionTexture,
  grassColorTexture,
  grassNormalTexture,
} from "./texture/texture";

const canvas = document.querySelector("canvas.app");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd2d2d2);

const loader = new THREE.TextureLoader();
const texture = loader.load("/darkScenary.jpg", () => {
  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
  rt.fromEquirectangularTexture(renderer, texture);
  scene.background = rt.texture;
});

scene.add(pointLight);

const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(50, 50),
  new THREE.MeshPhongMaterial({
    specular: 0xffffff,
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(5, 32, 32),
  new THREE.MeshPhongMaterial({ color: "#FFA500", specular: 0xffffff })
);

scene.add(floor, sphere);
sphere.position.y = 10;
sphere.position.x = -10;

const fog = new THREE.Fog(new THREE.Color("black"), 0.1, 100);
scene.fog = fog;

window.addEventListener("resize", () => {
  SIZES.width = window.innerWidth;
  SIZES.height = window.innerHeight;

  camera.aspect = SIZES.width / SIZES.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZES.width, SIZES.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  70,
  SIZES.width / SIZES.height,
  0.1,
  1000
);
camera.position.set(0, 10, 50);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const mouse = new THREE.Vector2();
mouse.setX(-1);
mouse.setY(-1);

for (let i = 0; i < 10; i++) {
  generateBox(scene);
}

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(SIZES.width, SIZES.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
