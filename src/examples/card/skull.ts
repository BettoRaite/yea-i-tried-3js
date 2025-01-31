// function loadSkullModel() {
//   skullmaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       time: { type: "f", value: 0.0 },
//       color1: { value: new THREE.Vector3(...CONFIG.color1) },
//       color0: { value: new THREE.Vector3(...CONFIG.color0) },
//       resolution: {
//         value: new THREE.Vector2(
//           CONFIG.dimensions.width,
//           CONFIG.dimensions.height,
//         ),
//       },
//     },
//     fragmentShader: fragskull,
//     vertexShader: vertskull,
//   });

//   const spheregeo = new THREE.SphereGeometry(1.5, 32, 32);
//   basicmat = new THREE.MeshBasicMaterial({
//     color: new THREE.Color(...CONFIG.color2),
//   });
//   eye = new THREE.Mesh(spheregeo, basicmat);
//   eye2 = new THREE.Mesh(spheregeo, basicmat);
//   eye.position.set(-2.2, -2.2, -6.6);
//   eye2.position.set(2.2, -2.2, -6.6);
//   modelgroup.add(eye);
//   modelgroup.add(eye2);

//   const objloader = new OBJLoader();
//   objloader.load(
//     CONFIG.textures.skullmodel,
//     (object) => {
//       const mesh2 = object.clone();
//       mesh2.position.set(0, 0, -10);
//       mesh2.rotation.set(Math.PI, 0, Math.PI);

//       mesh2.children.forEach((val) => {
//         val.traverse((child) => {
//           if (child.isMesh) {
//             child.geometry = new THREE.Geometry().fromBufferGeometry(
//               child.geometry,
//             );
//             child.geometry.mergeVertices();
//             child.material = skullmaterial;
//             child.geometry.computeVertexNormals();
//           }
//         });
//         mesh2.scale.set(8, 8, 8);
//         modelgroup.add(mesh2);
//         sceneRTT.add(modelgroup);
//       });
//     },
//     undefined,
//     (error) => {
//       console.error("An error occurred while loading the skull model:", error);
//     },
//   );
// }
