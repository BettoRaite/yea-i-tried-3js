import * as THREE from "three";
import {
  vert,
  fragPlane,
  fragPlaneback,
  // fragskull,
  // vertskull,
} from "./shaders";
import { createRenderer, setupControls, setupComposer } from "./setup";
import { CONFIG } from "./config";
import { createMaterial, createPlane, loadTextures } from "./helpers";

const clock = new THREE.Clock();
// const matrix = new THREE.Matrix4();
// const period = 5;

function createCameras() {
  const camera = new THREE.PerspectiveCamera(
    30,
    CONFIG.dimensions.width / 2 / CONFIG.dimensions.height,
    1,
    10000,
  );
  camera.position.z = 100;

  const cameraRTT = new THREE.PerspectiveCamera(
    30,
    CONFIG.dimensions.width / 2 / CONFIG.dimensions.height,
    1,
    10000,
  );
  cameraRTT.position.z = 30;
  cameraRTT.position.y = -3.5;
  return {
    camera,
    cameraRTT,
  };
}

// Scene
const scene = new THREE.Scene();
const sceneRTT = new THREE.Scene();
const { camera, cameraRTT } = createCameras();
const renderer = createRenderer();
// Textures
const textures = loadTextures<keyof typeof CONFIG.textures>({
  cardtemplate: CONFIG.textures.cardtemplate,
  cardtemplateback: CONFIG.textures.cardtemplateback,
  backtexture: CONFIG.textures.backtexture,
  noiseTex: CONFIG.textures.voronoi,
  color: CONFIG.textures.color,
  noise: CONFIG.textures.noise,
});

const orbitControls = setupControls(camera, renderer);

const frontmaterial = createMaterial(fragPlane, vert, textures);
const backmaterial = createMaterial(fragPlaneback, vert, {
  ...textures,
  cardtemplate: textures.cardtemplateback,
});

const frontcard = createPlane(frontmaterial);
const backcard = createPlane(backmaterial);
backcard.rotation.set(0, Math.PI, 0);

frontcard.position.set(0, 0, 0);
backcard.position.set(0, 0, 0);

const cardGroup = new THREE.Group();
cardGroup.add(frontcard, backcard);

scene.add(frontcard, backcard);

// function updateDraw() {
//   cardGroup.rotation.set(-camera.rotation.x, -camera.rotation.y, 0);
//   if (CONFIG.isanimate) {
//     matrix.makeRotationY((clock.getDelta() * 0.7 * Math.PI) / period);
//     camera.position.applyMatrix4(matrix);
//     camera.lookAt(frontcard.position);
//   }

//   bloomPass.threshold = CONFIG.bloomThreshold;
//   bloomPass.strength = CONFIG.bloomStrength;
//   bloomPass.radius = CONFIG.bloomRadius;
// }

function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta();
  // updateDraw();
  orbitControls.update();
  camera.lookAt(frontcard.position);
  // composer.render();
  renderer.render(scene, camera);
}

animate();

window.addEventListener(
  "resize",
  () => {
    const width = CONFIG.dimensions.width / 2;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    frontcard.material.uniforms.resolution.value = new THREE.Vector2(
      width,
      height,
    );
    renderer.setSize(width, height);
  },
  false,
);
