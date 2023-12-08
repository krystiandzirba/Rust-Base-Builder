import React, { useRef, useState } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { PerspectiveCamera, CameraControls, Grid, PivotControls } from "@react-three/drei";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";

import { Model as StoneFoundationMid } from "../models/StoneFoundationMid.tsx";
import { Model as StoneFoundationHigh } from "../models/StoneFoundationHigh.tsx";
import { Model as StoneWallHigh } from "../models/StoneWallHigh.tsx";

interface CanvasModelsListProps {
  models: React.FC[];
}

const CanvasModelsList: React.FC<CanvasModelsListProps> = ({ models }) => {
  return (
    <div className="canvas_models_list">
      <h3>active models:</h3>
      <ul>
        {models.map((ModelComponent, index) => (
          <li key={index}>
            name: {ModelComponent.displayName || ModelComponent.name} index: {index}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CanvasContainer() {
  const page_mode = useSelector((state: RootState) => state.PageMode.page_mode);
  const transform_model_axis = useSelector((state: RootState) => state.TransformAxis.transform_model_axis);

  const [camera_pan, set_camera_pan] = useState(true);
  const [models, setModels] = useState<React.FC[]>([]);
  const [selected_model_index, set_selected_model_index] = useState<number | null>(null);

  const [model_hover_index, set_model_hover_index] = useState<number>(-1);

  const object_list = [
    // { name: "twig_foundation_low", thumbnail: "", id: "FL0" },
    // { name: "twig_foundation_mid", thumbnail: "", id: "FM0" },
    // { name: "twig_foundation_high", thumbnail: "", id: "FH0" },

    // { name: "wooden_foundation_low", thumbnail: "", id: "FL1" },
    // { name: "wooden_foundation_mid", thumbnail: "", id: "FM1" },
    // { name: "wooden_foundation_high", thumbnail: "", id: "FH1" },

    // { name: "stone_foundation_low", thumbnail: "", id: "FL2" },
    //prettier-ignore
    { name: "stone_foundation_mid", build_cost: "", upkeep_cost: "", thumbnail: "", id: "FM2", onClick: () => {
      set_selected_model_index(-1),
      addModel(StoneFoundationMid)
    }},
    //prettier-ignore
    { name: "stone_foundation_high", build_cost: "", upkeep_cost: "",  thumbnail: "", id: "FH2", onClick: () => {
      set_selected_model_index(-1),
      addModel(StoneFoundationHigh)
    }},

    // { name: "metal_foundation_low", thumbnail: "", id: "FL3" },
    // { name: "metal_foundation_mid", thumbnail: "", id: "FM3" },
    // { name: "metal_foundation_high", thumbnail: "", id: "FH3" },

    // { name: "armored_foundation_low", thumbnail: "", id: "FL4" },
    // { name: "armored_foundation_mid", thumbnail: "", id: "FM4" },
    // { name: "armored_foundation_high", thumbnail: "", id: "FH4" },

    // { name: "twig_wall", thumbnail: "", id: "W0" },
    // { name: "wooden_wall", thumbnail: "", id: "W1" },
    // { name: "stone_wall", thumbnail: "", id: "W2" },
    // { name: "metal_wall", thumbnail: "", id: "W3" },
    // { name: "armored_wall", thumbnail: "", id: "W4" },

    {
      name: "stone_wall_high",
      thumbnail: "",
      id: "WH2",
      onClick: () => {
        set_selected_model_index(-1), addModel(StoneWallHigh);
      },
    },
  ];

  const addModel = (modelComponent: React.FC) => {
    setModels((prevModels) => [...prevModels, modelComponent]);
  };

  function PivotDragStart(index: number) {
    if (page_mode === "edit") {
      set_selected_model_index(index);
      set_camera_pan(false);
    }
  }

  function PivotDragEnd() {
    if (page_mode === "edit") {
      set_camera_pan(true);
      set_selected_model_index(-1);
    }
  }

  function MeshPointerOver(index: number) {
    if (page_mode === "edit") {
      set_model_hover_index(index), console.log("over", model_hover_index);
    }
  }

  function MeshPointerOut(index: number) {
    if (page_mode === "edit") {
      set_model_hover_index(index), console.log("out", model_hover_index);
    }
  }

  function MeshOnClick(index: number) {
    if (page_mode === "edit") {
      console.log(transform_model_axis, "eeeeeee");
      set_selected_model_index(index);
      console.log(index, "clicked");
    }
  }

  function MeshOnMissed() {
    if (page_mode === "edit") {
      set_selected_model_index(-1);
    }
  }

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
                // autoTransform={selected_model_index === index ? true : false}
                key={index}
                scale={selected_model_index === index ? 3 : 0}
                lineWidth={0}
                rotation={[0, 0, 0]}
                depthTest={false}
                activeAxes={transform_model_axis === "XYZ" ? [true, true, true] : [true, false, true]}
                axisColors={["orange", "yellow", "orange"]}
                onDragStart={() => PivotDragStart(index)}
                onDragEnd={() => PivotDragEnd()}
              >
                <mesh
                  key={index}
                  onPointerOver={() => MeshPointerOver(index)}
                  onPointerOut={() => MeshPointerOut(index)}
                  onClick={() => MeshOnClick(index)}
                  onPointerMissed={() => MeshOnMissed()}
                  // scale={selected_model_index === index ? [1.1, 1.1, 1.1] : [1, 1, 1]}
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
          page_mode === "edit"
            ? "objects_container objects_container_displayed"
            : "objects_container objects_container_hidden"
        }
      >
        <div className="object_list">
          {object_list.map((item) => (
            <button key={item.id} className="object" onClick={item.onClick ?? (() => {})}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <CanvasModelsList models={models} />
    </>
  );
}
