import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { normalMap, texture } from "three/tsl";
const Dog = () => {
  // with the canvas on the app.jsx we can use useThree hook now

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
    // improving the colour sapce and render tech of opengl
    ((gl.toneMapping = THREE.ReinhardToneMapping),
      (gl.outputColorSpace = THREE.SRGBColorSpace));
  });

  const model = useGLTF("/models/dog.drc.glb");

  /*
  const texure = useTexture({
    normalMap: "/dog_normals.jpg",
    sampleMatCap:"/matcap/mat-2.png"
  });*/
  const [normalMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
      // now the textrue auto flips the texture map so details are not good
      // now improve the colourspace of texture
    texture.flipY = false, texture.colorSpace = THREE.SRGBColorSpace;
    return texture
  });



  // now selecting dog to apply the texture
  model.scene.traverse((child) => {
    if (child.name.includes("DOG"))
      child.material = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap,
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
