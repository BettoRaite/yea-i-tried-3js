import * as THREE from "three";
import { contain } from "three/src/extras/TextureUtils.js";

const container = document.getElementById("app") as HTMLDivElement;

const renderer = new THREE.WebGLRenderer();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  2000,
);
camera.position.z = 10;

const material = new THREE.MeshStandardMaterial();
const geometry = new THREE.RingGeometry(1, 2, 4);

const item = new THREE.Mesh(geometry, material);
const item2 = new THREE.Mesh(geometry, material);
item2.position.set(0, -3, 0);

const group = new THREE.Group();
group.add(item);
group.add(item2);

const light = new THREE.DirectionalLight();
light.lookAt(group.position);
light.position.z = 5;

scene.add(group);
scene.add(light);

container.appendChild(renderer.domElement);

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

function animate() {
  requestAnimationFrame(animate);

  group.rotation.y += 0.03;
  renderer.render(scene, camera);
}
animate();
