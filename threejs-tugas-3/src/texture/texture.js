import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export const grassColorTexture = textureLoader.load(
  "/textures/grass/color.jpg"
);
export const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
export const grassNormalTexture = textureLoader.load(
  "/textures/grass/normal.jpg"
);
export const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
