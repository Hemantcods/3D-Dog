import { useState } from "react";
import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <Canvas style={{
          height:"100vh",
          position:"fixed",
          top:0,
          left:0,
          zIndex:1,
          backgroundImage:"url(/background-l.png)",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        }}>
          <Dog />
        </Canvas>
        <section id="section-1"></section>
        <section id="section-2"></section>
        <section id="section-3"></section>
      </main>
    </>
  );
}

export default App;
