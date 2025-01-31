import * as THREE from "three";
import { CONFIG } from "./config";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  OBJLoader,
  OrbitControls,
} from "three/examples/jsm/Addons.js";

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(2);
  renderer.setSize(CONFIG.dimensions.width / 2, CONFIG.dimensions.height);
  renderer.autoClear = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  document.getElementById("app")?.appendChild(renderer.domElement);
  return renderer;
};

export const setupControls = (
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  return controls;
};

export const setupComposer = (
  sceneRTT: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  cameraRTT: THREE.Camera,
) => {
  const renderScene = new RenderPass(sceneRTT, cameraRTT);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(CONFIG.dimensions.width, CONFIG.dimensions.height),
    0.9,
    0.5,
    0.85,
  );
  const composer = new EffectComposer(renderer);
  composer.renderToScreen = false;
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  return { composer, bloomPass, renderScene };
};
