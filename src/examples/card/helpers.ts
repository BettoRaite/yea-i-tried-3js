import * as THREE from "three";
import { CONFIG } from "./config";

export const createMaterial = (
  fragmentShader: string,
  vertexShader: string,
  textures: Record<string, THREE.Texture>,
) => {
  const uniforms: Record<string, THREE.IUniform> = {};
  for (const t of Object.keys(textures)) {
    uniforms[t] = {
      value: textures[t],
    };
  }
  return new THREE.ShaderMaterial({
    uniforms: {
      ...uniforms,
      resolution: {
        value: new THREE.Vector2(
          CONFIG.dimensions.width / 2,
          CONFIG.dimensions.height,
        ),
      },
    },
    fragmentShader,
    vertexShader,
    transparent: true,
    depthWrite: false,
  });
};

type LoadedTextures<T extends string> = Record<T, THREE.Texture>;
export const loadTextures = <T extends string>(
  textures: Record<string, string>,
) => {
  const textureLoader = new THREE.TextureLoader();
  const loadedTextures: LoadedTextures<T> = {} as LoadedTextures<T>;
  for (const t of Object.keys(textures)) {
    loadedTextures[t as T] = textureLoader.load(textures[t]);
  }
  return loadedTextures;
};

export const createPlane = (material: THREE.Material) => {
  const geometry = new THREE.PlaneGeometry(20, 30);
  return new THREE.Mesh(geometry, material);
};
