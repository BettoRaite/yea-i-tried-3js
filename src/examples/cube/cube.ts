import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shader";
import { loadTexture } from "../../lib/helpers";
import { materialAO } from "three/tsl";
const container = document.getElementById("app") as HTMLDivElement;

if (!container) {
  console.error("Container element not found");
  throw new Error("Container element not found");
}

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1); // Set background to white

const fov = 45;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 10000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 5); // Move the camera back

const textures = {
  texture:
    "https://images.unsplash.com/photo-1567609562303-974f34396acb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGF0dGVybnxlbnwwfHwwfHx8Mg%3D%3D",
};

const loadedTextures = loadTexture<keyof typeof textures>(textures);
console.log(loadedTextures);
loadedTextures.texture.wrapS = THREE.RepeatWrapping;
loadedTextures.texture.wrapT = THREE.RepeatWrapping;

const material = new THREE.ShaderMaterial({
  fragmentShader,
  vertexShader,
  uniforms: {
    pattern: {
      value: loadedTextures.texture,
    },
    time: { value: 0.0 },
  },
});

const geometry = new THREE.SphereGeometry(1);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);

// Animation loop

mesh.rotation.y = 1;
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  // Optional: Rotate the cube for some animation
  material.uniforms.time.value = clock.getElapsedTime() * 1;
  renderer.render(scene, camera);
}

animate(); // Start the animation loop
