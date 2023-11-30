import * as THREE from "three";
// import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { PerspectiveCamera, CameraControls, Grid } from "@react-three/drei";

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // useFrame((state, delta) => (ref.current.position.x += delta));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "red" : "orange"} />
    </mesh>
  );
}

export default function FiberContainer() {
  return (
    <div className="three_container">
      <Canvas>
        <Grid cellSize={3} infiniteGrid={true} fadeStrength={5} />
        <PerspectiveCamera makeDefault fov={90} position={[0, 0, 2]} />
        <CameraControls maxPolarAngle={Math.PI / 2.1} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 1, 0]} rotation={[0, 0, 70]} />
        <Box position={[1.2, 1, 0]} />
        <mesh>
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
