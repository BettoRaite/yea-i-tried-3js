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
