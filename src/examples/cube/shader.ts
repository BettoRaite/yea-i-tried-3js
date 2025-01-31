// Vertex Shader
export const vertexShader = `
  varying vec2 vUv; // Pass UV coordinates
  varying vec3 vNormal; // Pass normals
  varying vec3 vPosition; // Pass vertex position in world space

  void main() {
    vUv = uv; // Pass UV coordinates
    vNormal = normalMatrix * normal; // Transform normals to world space
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz; // Transform vertex position to world space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Standard vertex position calculation
  }
`;

// Fragment Shader
export const fragmentShader = `
  precision mediump float;

  uniform float time;
  uniform sampler2D pattern; // Texture
  uniform vec3 lightPosition; // Light position in world space
  uniform vec3 lightColor; // Light color
  uniform vec3 ambientColor; // Ambient light color
  uniform float ambientIntensity; // Ambient light intensity
  uniform float diffuseIntensity; // Diffuse light intensity

  varying vec2 vUv; // UV coordinates
  varying vec3 vNormal; // Normals
  varying vec3 vPosition; // Vertex position in world space

  void main() {
    // Create a vertical wave effect
    float wave = sin(vUv.y * 1.0 + time * 1.0) * 2.0;
    vec2 animatedUv = vUv + vec2(wave, 0.0);

    // Sample the texture
    vec3 texColor = texture(pattern, animatedUv).rgb;

    // Normalize the normal and light direction
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(lightPosition - vPosition);

    // Ambient lighting
    vec3 ambient = ambientColor * ambientIntensity;

    // Diffuse lighting (Lambertian reflection)
    float diff = max(dot(normal, lightDir), 0.0); // Calculate diffuse intensity
    vec3 diffuse = diff * lightColor * diffuseIntensity;

    // Combine ambient, diffuse, and texture color
    vec3 finalColor = (ambient + diffuse) * texColor;

    // Output the final color
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
