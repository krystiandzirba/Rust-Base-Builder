import React, { useRef, useState } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { PerspectiveCamera, CameraControls, Grid, PivotControls } from "@react-three/drei";

import { Model as StoneFoundationMid } from "../models/StoneFoundationMid.tsx";
import { Model as StoneFoundationHigh } from "../models/StoneFoundationHigh.tsx";

interface CanvasContainerProps {
  type: string;
}

export default function CanvasContainer({ type }: CanvasContainerProps) {
  const [pivot_control, set_pivot_control] = useState(false);
  const [camera_pan, set_camera_pan] = useState(true);
  const [models, setModels] = useState<React.FC[]>([]);
  const [selected_model_index, set_selected_model_index] = useState<number | null>(null);

  const object_list = [
    { name: "twig_foundation_low", thumbnail: "", id: "FL0" },
    { name: "twig_foundation_mid", thumbnail: "", id: "FM0" },
    { name: "twig_foundation_high", thumbnail: "", id: "FH0" },

    { name: "wooden_foundation_low", thumbnail: "", id: "FL1" },
    { name: "wooden_foundation_mid", thumbnail: "", id: "FM1" },
    { name: "wooden_foundation_high", thumbnail: "", id: "FH1" },

    { name: "stone_foundation_low", thumbnail: "", id: "FL2" },
    //prettier-ignore
    { name: "stone_foundation_mid", thumbnail: "", id: "FM2", onClick: () => [set_selected_model_index(-1),  addModel(StoneFoundationMid)],},
    //prettier-ignore
    { name: "stone_foundation_high", thumbnail: "", id: "FH2", onClick: () => [set_selected_model_index(-1),  addModel(StoneFoundationHigh)],},

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

  const handleModelClick = (index: number) => {
    set_selected_model_index(index);
    set_pivot_control(true);
    console.log("object clicked", index, pivot_control);
  };

  return (
    <>
      <div className="canvas_container">
        <Canvas>
          <Grid cellSize={3} infiniteGrid={true} fadeStrength={5} sectionColor={"white"} />
          <PerspectiveCamera makeDefault fov={90} position={[0, 4, 4]} />

          {!camera_pan ? null : <CameraControls maxPolarAngle={Math.PI / 2.1} />}

          <ambientLight />
          <directionalLight />
          <pointLight position={[10, 10, 10]} />
          {models.map((ModelComponent, index) => {
            return (
              <PivotControls
                visible={selected_model_index === index ? true : false}
                autoTransform={selected_model_index === index ? true : false}
                key={index}
                scale={3}
                depthTest={false}
                activeAxes={[true, false, true]}
                hoveredColor={"Red"}
                onDragStart={() => set_camera_pan(false)}
                onDragEnd={() => set_camera_pan(true)}
              >
                <mesh
                  key={index}
                  onClick={() => handleModelClick(index)}
                  // scale={selected_model_index === index ? [1.2, 1.2, 1.2] : [1, 1, 1]}
                >
                  <ModelComponent />
                </mesh>
              </PivotControls>
            );
          })}
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
            <button key={item.id} className="object" onClick={() => item.onClick && item.onClick()}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
