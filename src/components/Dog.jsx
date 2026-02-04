import { OrbitControls,useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React from 'react'
const Dog = () => {

    // with the canvas on the app.jsx we can use useThree hook now 

    useThree(({camera,scene,gl})=>{
        console.log(camera.position)
        camera.position.z=.55
    })

    const model=useGLTF("/models/dog.drc.glb")

  return (
    <>
        <primitive object={model.scene} position={[.25,-0.55,0]} rotation={[0,Math.PI/4.3 ,0]} />
        <directionalLight color={0xffffff} position={[0,5,5]} intensity={10} />
        <OrbitControls/>
    </>
  )
}

export default Dog