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
const material = createMaterial(getShaders().f, getShaders().v, {
  u_time: 0.0,
});
const geometry = new THREE.BoxGeometry();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
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

    void main() {
        // Normalize the fragment coordinates to [0, 1]
        vec2 uv = vUv;
        // Center the y-coordinate and scale it to make the sine wave visible
        uv.y -= 0.5; // Move the sine wave to the center vertically
        uv.y *= 10.0; // Scale the sine wave amplitude

        // Calculate the sine wave value at the current x-coordinate
        float sineValue = sin(uv.x * 10.0 + u_time * 1.0); // Adjust frequency and animation speed

        // Draw the sine wave in white
        float lineThickness = 0.2; // Thickness of the sine wave line
        float color = smoothstep(lineThickness, 0.0, abs(uv.y - sineValue));

        // Set the output color
        gl_FragColor = vec4(vec3(color), 1.0); // White for the sine wave, black elsewhere
    }
    `,
  };
}
