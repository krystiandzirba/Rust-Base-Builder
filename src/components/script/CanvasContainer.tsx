import React, { useRef, useState } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { PerspectiveCamera, CameraControls, Grid } from "@react-three/drei";

import StoneFoundationHigh from "../models/StoneFoundationHigh.tsx";

type ModelProps = ThreeElements["mesh"] & {
  position: [number, number, number];
  rotation?: [number, number, number];
};

function Box(props: ModelProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => [click(!clicked), console.log("Clicked")]}
      onPointerOver={() => [hover(true), console.log("Pointer Over")]}
      onPointerOut={() => [hover(false), console.log("Pointer Out")]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "red" : "#ffffff"} />
    </mesh>
  );
}

export default function CanvasContainer() {
  const [models, setModels] = useState<React.FC[]>([]);

  const addModel = (modelComponent: React.FC) => {
    setModels((prevModels) => [...prevModels, modelComponent]);
  };

  return (
    <>
      <div className="canvas_container">
        <Canvas>
          <Grid cellSize={3} infiniteGrid={true} fadeStrength={5} sectionColor={"white"} />
          <PerspectiveCamera makeDefault fov={90} position={[0, 0, 2]} />
          <CameraControls maxPolarAngle={Math.PI / 2.1} />
          <ambientLight />
          <directionalLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 1, 0]} rotation={[0, 0, 70]} />
          <Box position={[1.2, 1, 0]} />
          <mesh>
            <planeGeometry />
            <meshStandardMaterial />
          </mesh>
          {models.map((ModelComponent, index) => (
            <ModelComponent key={index} />
          ))}
        </Canvas>
      </div>
      <button className="test" onClick={() => addModel(StoneFoundationHigh)}>
        Add StoneFoundationHigh
      </button>
    </>
  );
}
