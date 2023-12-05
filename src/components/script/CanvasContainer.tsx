import React, { useRef, useState } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { PerspectiveCamera, CameraControls, Grid } from "@react-three/drei";

import StoneFoundationHigh from "../models/StoneFoundationHigh.tsx";
import StoneFoundationMid from "../models/StoneFoundationMid.tsx";

interface CanvasContainerProps {
  type: string;
}

export default function CanvasContainer({ type }: CanvasContainerProps) {
  const [models, setModels] = useState<React.FC[]>([]);

  const object_list = [
    { name: "twig_foundation_low", thumbnail: "", id: "FL0" },
    { name: "twig_foundation_mid", thumbnail: "", id: "FM0" },
    { name: "twig_foundation_high", thumbnail: "", id: "FH0" },

    { name: "wooden_foundation_low", thumbnail: "", id: "FL1" },
    { name: "wooden_foundation_mid", thumbnail: "", id: "FM1" },
    { name: "wooden_foundation_high", thumbnail: "", id: "FH1" },

    { name: "stone_foundation_low", thumbnail: "", id: "FL2" },
    { name: "stone_foundation_mid", thumbnail: "", id: "FM2", onClick: () => addModel(StoneFoundationMid) },
    { name: "stone_foundation_high", thumbnail: "", id: "FH2", onClick: () => addModel(StoneFoundationHigh) },

    { name: "metal_foundation_low", thumbnail: "", id: "FL3" },
    { name: "metal_foundation_mid", thumbnail: "", id: "FM3" },
    { name: "metal_foundation_high", thumbnail: "", id: "FH3" },

    { name: "armored_foundation_low", thumbnail: "", id: "FL4" },
    { name: "armored_foundation_mid", thumbnail: "", id: "FM4" },
    { name: "armored_foundation_high", thumbnail: "", id: "FH4" },

    { name: "twig_wall", thumbnail: "", id: "W0" },
    { name: "wooden_wall", thumbnail: "", id: "W1" },
    { name: "stone_wall", thumbnail: "", id: "W2" },
    { name: "metal_wall", thumbnail: "", id: "W3" },
    { name: "armored_wall", thumbnail: "", id: "W4" },
  ];

  const addModel = (modelComponent: React.FC) => {
    setModels((prevModels) => [...prevModels, modelComponent]);
  };

  return (
    <>
      <div className="canvas_container">
        <Canvas>
          <Grid cellSize={3} infiniteGrid={true} fadeStrength={5} sectionColor={"white"} />
          <PerspectiveCamera makeDefault fov={90} position={[0, 1, 2]} />
          <CameraControls maxPolarAngle={Math.PI / 2.1} />
          <ambientLight />
          <directionalLight />
          <pointLight position={[10, 10, 10]} />
          {models.map((ModelComponent, index) => (
            <ModelComponent key={index} />
          ))}
        </Canvas>
      </div>
      <div
        className={
          type === "edit"
            ? "objects_container objects_container_displayed"
            : "objects_container objects_container_hidden"
        }
      >
        <div className="object_list">
          {object_list.map((item) => (
            <button key={item.id} className="object" onClick={item.onClick}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
