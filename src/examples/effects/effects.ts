import * as THREE from "three";
import { createMaterial } from "../../lib/helpers";

const renderer = new THREE.WebGLRenderer();
const container = document.getElementById("app") as HTMLDivElement;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  10000,
);
camera.position.set(0, 0, 5);

// Create a cube
const textureLoader = new THREE.TextureLoader();
const pattern = textureLoader.load(
  "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGF0dGVybnxlbnwwfHwwfHx8MA%3D%3D",
);
pattern.wrapS = THREE.RepeatWrapping;
pattern.wrapT = THREE.RepeatWrapping;
const material = createMaterial(getShaders().f, getShaders().v, {
  u_time: 0.0,
  pattern,
});
const geometry = new THREE.SphereGeometry();
const mesh = new THREE.Mesh(geometry, material);
const cube = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({
    color: "red",
  }),
);
cube.position.z = -1;

scene.add(mesh);
// scene.add(cube);

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  material.uniforms.u_time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}

animate();

function getShaders() {
  return {
    v: `
    varying vec2 vUv; // Pass UV coordinates

    void main() {
      vUv = uv; // Pass UV coordinates
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Standard vertex position calculation
    }
    `,
    f: `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec2 vUv;
    uniform float u_time;       // Time elapsed, useful for animation
    uniform sampler2D pattern;
    void main() {
        // Normalize the fragment coordinates to [0, 1]
        vec2 uv = vUv;
        // Center the y-coordinate and scale it to make the sine wave visible
        uv.y -= 0.5; // Move the sine wave to the center vertically
        uv.y *= 10.0; // Scale the sine wave amplitude

        // Calculate the sine wave value at the current x-coordinate
        float sineValue = sin(uv.x * 100.0 + u_time * 15.0); // Adjust frequency and animation speed
        vec4 texture = texture2D(pattern, uv);
        // Draw the sine wave in white

        float lineThickness = 3.0 * uv.x; // Thickness of the sine wave line
        float distanceFromSine = abs(uv.y - sineValue);
        float color = smoothstep(lineThickness, lineThickness - 0.1, distanceFromSine);

        // Set the fragment color based on the smoothstep output
        gl_FragColor = mix(texture, vec4(uv.y, uv.x, uv.x, 0.0), color);
    }
    `,
  };
}
1;
