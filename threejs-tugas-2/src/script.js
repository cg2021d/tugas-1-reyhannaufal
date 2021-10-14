import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  ambientLight,
  directionalLight,
  hemisphereLight,
  rectAreaLight,
  spotLight,
} from "../lights/rootLights";

const canvas = document.querySelector("canvas.app");

const scene = new THREE.Scene();

/*
 * Lights
 */
scene.add(
  ambientLight,
  directionalLight,
  hemisphereLight,
  rectAreaLight,
  spotLight
);

/*
 * Object
 */
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(20, 3, 10, 100),
  new THREE.MeshBasicMaterial({
    color: new THREE.Color("pink"),
  })
);
torus.position.z = -10;

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.MeshNormalMaterial({
    flatShading: true,
  })
);
cylinder.position.x = 0.2;
cylinder.position.y = 0.8;

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 32),
  new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.5,
    // envmap: environmentMapTexture,
  })
);
cone.position.x = 2;
cone.position.y = 0.8;

const octhaHedron = new THREE.Mesh(
  new THREE.OctahedronGeometry(1, 0),
  new THREE.MeshStandardMaterial({
    color: 0x49ef4,
    wireframe: true,
  })
);
octhaHedron.position.x = -2;
octhaHedron.position.y = 0.8;

const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshToonMaterial({
    depthTest: true,
    depthWrite: true,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -0.65;

scene.add(torus, cylinder, cone, octhaHedron, floor);

/*
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/*
 * Camera
 */
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);
camera.position.z = 3.5;
scene.add(camera);

/*
 * Control
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  //update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update canvas
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;

  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;
  cone.rotation.z += 0.01;

  octhaHedron.rotation.x += 0.01;
  octhaHedron.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
