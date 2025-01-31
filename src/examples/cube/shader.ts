// Vertex Shader
export const vertexShader = `
  varying vec2 vUv; // Declare a varying variable to pass UV coordinates

  void main() {
    vUv = uv; // Assign the UV coordinates to the varying variable
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
export const fragmentShader = `
  precision mediump float; // Specify precision for floating-point operations
  uniform float time;
  uniform sampler2D pattern; // Declare a uniform for the texture
  varying vec2 vUv; // Receive the UV coordinates from the vertex shader

  void main() {
  float wave = sin(vUv.x * 1.0 + time * 1.0) * 2.0; // Vertical wave
  vec2 animatedUv = vUv + vec2(wave, 0.0);
  vec3 texColor = texture(pattern, animatedUv).rgb; // Sample the texture using UV coordinates
  gl_FragColor = vec4(texColor, 1.0); // Set the fragment color to the sampled texture color
  }
`;
