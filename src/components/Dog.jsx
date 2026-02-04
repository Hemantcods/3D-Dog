import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import React from "react";
const Dog = () => {
  // with the canvas on the app.jsx we can use useThree hook now

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
  });

  const model = useGLTF("/models/dog.drc.glb");
  const texure = useTexture({
    normalMap: "/dog_normals.jpg",
  });
//   now the textrue auto flips the texture map so details are not good 
  texure.normalMap.flipY=false
  // now selecting dog to apply the texture
  model.scene.traverse((child) => {
    if (child.name.includes("DOG"))
      child.material = new THREE.MeshMatcapMaterial({
        normalMap: texure.normalMap,
        color:0xff00000
      });
  });
  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 4.3, 0]}
      />
      <directionalLight color={0xffffff} position={[0, 5, 5]} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
