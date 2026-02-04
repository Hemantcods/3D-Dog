import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Dog = () => {
  // gsap register plugin
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);
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
    "branches_diffuse.jpg",
    "branches_normals.jpg",
  ]).map((texture) => {
    // now the textrue auto flips the texture map so details are not good
    // now improve the colourspace of texture
    ((texture.flipY = false), (texture.colorSpace = THREE.SRGBColorSpace));
    return texture;
  });

  // texture for leaves/branches
  const [branchMap, branchNormalMap] = useTexture([
    "branches_diffuse.jpg",
    "branches_normals.jpg",
  ]).map((texture) => {
    ((texture.flipY = true), (texture.colorSpace = THREE.SRGBColorSpace));
    return texture;
  });
  //   animations
  const { actions } = useAnimations(model.animations, model.scene);
  // use effect to play the animation
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  //  earlier for each child there is a new matrial formed so to fix that create material one time and use it
  const material = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });
  // now selecting dog to apply the texture
  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = material;
    } else {
      child.material = material;
    }
  });
  const refmodel = useRef(model);
  //   gsap animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: true,
      },
    });
    tl.to(refmodel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.25",
    })
      .to(refmodel.current.scene.rotation, {
        x: `+=${Math.PI / 12}`,
      })
      .to(refmodel.current.scene.rotation, {
        y: `-=${Math.PI}`,
        x: `+=${Math.PI / 14}`,
      },"third")
      .to(refmodel.current.scene.position,{
        x:"-=0.5",
        z:"+=0.5",
        y:"-=0.15"
      },"third")
  });
  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 4.3, 0]}
      />
      <directionalLight color={0xffffff} position={[0, 5, 5]} intensity={10} />
    </>
  );
};

export default Dog;
