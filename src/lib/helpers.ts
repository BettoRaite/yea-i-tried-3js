import * as THREE from "three";

export const loadTexture = <T extends string>(
  textures: Record<string, string>,
) => {
  const textureLoader = new THREE.TextureLoader();
  const loadedTextures = {} as Record<T, THREE.Texture>;
  for (const k of Object.keys(textures)) {
    loadedTextures[k as T] = textureLoader.load(textures[k]);
  }
  return loadedTextures;
};

export const createMaterial = (
  fragmentShader: string,
  vertexShader: string,
  rawUniforms: Record<string, unknown>,
) => {
  const uniforms: Record<string, THREE.Uniform> = {};
  for (const key of Object.keys(rawUniforms)) {
    uniforms[key] = {
      value: rawUniforms[key],
    };
  }
  return new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms,
  });
};
