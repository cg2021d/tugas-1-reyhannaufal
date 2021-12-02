import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { generateBox } from "./utils/generateBox";
import { SIZES } from "./constants/sizes";
import { pointLight } from "./lights/rootLights";

const canvas = document.querySelector("canvas.app");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd2d2d2);

const loader = new THREE.TextureLoader();
const texture = loader.load(
  "https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
  () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    scene.background = rt.texture;
  }
);

scene.add(pointLight);

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

const currentScoreElement = document.getElementById("score");
const hightScoreElement = document.getElementById("high-score");
const rightPair = 50;
const wrongPair = -20;

let currentScore = 0;
let highScore = 0;


let selectedObject = [];
let originalColors = [];


const disposeObject = () => {
  let first = selectedObject[0].material.color.getHex();
  let second = selectedObject[1].material.color.getHex();

  if (first === second) {
    selectedObject.forEach((object) => {
      object.geometry.dispose();
      object.material.dispose();
      scene.remove(object);
      renderer.renderLists.dispose();
    });
    currentScore += rightPair;
  } else {
    currentScore += wrongPair;
  }
  currentScoreElement.innerHTML = currentScore;
  originalColors = [];
  selectedObject = [];
};

const rayCast = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.setX(-1);
mouse.setY(-1);

const onMouseClick = (e) => {
  /**
   * Get mouse position
   */

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  /**
   * Get intersected object
  */
  rayCast.setFromCamera(mouse, camera);
  let intersects = rayCast.intersectObjects(scene.children, false);

  if (intersects[0]) {
    let firstObject = intersects[0].object;
    if (selectedObject.length > 0) {
      if (firstObject.uuid === selectedObject[0].uuid) {
        firstObject.material.emissive.setHex(0x000000);
        selectedObject = [];
        originalColors = [];
        return;
      }
    }

    selectedObject.push(firstObject);
    originalColors.push(firstObject.material.color.getHex());
    if (selectedObject.length > 1) {
      disposeObject();
    }
  }
};

document.addEventListener("click", onMouseClick);

/**
 * Genertae 30 box
 */
for (let i = 0; i < 30; i++) {
  generateBox(scene);
}



const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(SIZES.width, SIZES.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;



const clock = new THREE.Clock();

let treshold = 0;
let speed = 0.002;
const baseSpeed = 0.002;

const tick = () => {
  /**
   * If length of cube is more than 40. reset score
   */
  if (scene.children.length >= 40) {
    treshold = 0;
    speed = baseSpeed;

    if (currentScore > highScore) {
      highScore = currentScore;
      hightScoreElement.innerHTML = highScore;
    }
    currentScore = 0;
    currentScoreElement.innerHTML = currentScore;
  } else {
    treshold += speed;
  }

  console.log("%cscript.js line:155 scene", "color: #007acc;", scene.children.length);
  console.log('%cscript.js line:155 treshold', 'color: #007acc;', treshold);

  /**
   * Generate more box on certain treshold. interval will be shorten as the time goes by
   */
  if (treshold > 1) {
    generateBox(scene);
    treshold = 0;
    speed += 100;
    console.log(`new box generated, speed increased to ${speed}`);
  }
  const elapsedTime = clock.getElapsedTime();

  if (selectedObject.length > 0) {
    selectedObject[0].material.emissive.setHex(
      elapsedTime % 0.5 >= 0.25 ? originalColors[0] : 0x000000
    );
  }

  


  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

/**
 * At first render game will be started automatically after page load
 */

tick();
