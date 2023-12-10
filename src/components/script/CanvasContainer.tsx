import React, { useRef, useState } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { PerspectiveCamera, CameraControls, Grid, PivotControls } from "@react-three/drei";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";

import { Model as StoneFoundationMid } from "../models/StoneFoundationMid.tsx";
import { Model as StoneFoundationHigh } from "../models/StoneFoundationHigh.tsx";
import { Model as StoneWallHigh } from "../models/StoneWallHigh.tsx";

interface CanvasModelsListProps {
  models: ModelType[];
}

type ModelType = {
  id: string;
  component: React.FC;
};

const CanvasModelsList: React.FC<CanvasModelsListProps> = ({ models }) => {
  return (
    <div className="canvas_models_list">
      <h3>active models:</h3>
      <ul>
        {models.map(({ id, component: ModelComponent }, index) => (
          <li key={id}>
            name: {ModelComponent.displayName} id: {id} index: {index}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CanvasContainer() {
  const page_mode = useSelector((state: RootState) => state.PageMode.page_mode);
  const transform_model_axis = useSelector((state: RootState) => state.TransformAxis.transform_model_axis);

  const [camera_rotation, set_camera_rotation] = useState(true);
  const [models, setModels] = useState<ModelType[]>([]);
  const [selected_model_index, set_selected_model_index] = useState<string>("empty");

  const [model_hover_index, set_model_hover_index] = useState<string>("empty");

  const [object_id, set_object_id] = useState<string>(randomIdGenerator());

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
      set_selected_model_index("empty"),
      set_object_id(randomIdGenerator()),
      addModel(StoneFoundationMid, object_id)
    }},
    //prettier-ignore
    { name: "stone_foundation_high", build_cost: "", upkeep_cost: "",  thumbnail: "", id: "FH2", onClick: () => {
      
      set_selected_model_index("empty"),
      set_object_id(randomIdGenerator()),
      addModel(StoneFoundationHigh, object_id)
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
      name: "test",
      onClick: () => {
        console.log(models);
      },
    },

    {
      name: "del",
      onClick: () => {
        removeModel("mwB1CnxK8w");
      },
    },

    {
      name: "stone_wall_high",
      thumbnail: "",
      id: "WH2",
      onClick: () => {
        const object_id = randomIdGenerator();
        set_selected_model_index("empty"), set_object_id(randomIdGenerator()), addModel(StoneWallHigh, object_id);
      },
    },
  ];

  const addModel = (modelComponent: React.FC, id: string) => {
    setModels((prevModels) => [...prevModels, { id, component: modelComponent }]);
  };

  // let random_id;

  function randomIdGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random_id = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      random_id += characters[randomIndex];
    }
    return random_id;
  }

  const removeModel = (id: string) => {
    setModels((prevModels) => prevModels.filter((model) => model.id !== id));
  };

  const removeModels = () => {
    setModels([]);
  };

  function PivotDragStart(index: string) {
    if (page_mode === "edit") {
      set_selected_model_index(index);
      set_camera_rotation(false);
    }
  }

  function PivotDragEnd() {
    if (page_mode === "edit") {
      set_camera_rotation(true);
      set_selected_model_index("empty");
    }
  }

  const MeshPointerOver = (index: string) => {
    if (page_mode === "edit") {
      set_model_hover_index(index);
      console.log("over", model_hover_index);
    }
  };

  const MeshPointerOut = (index: string) => {
    if (page_mode === "edit") {
      set_model_hover_index(index);
      console.log("out", model_hover_index);
    }
  };

  function MeshOnClick(selected_object_id: string) {
    if (page_mode === "edit") {
      set_selected_model_index(selected_object_id);
      console.log(selected_object_id, "clicked");
    }
  }

  function MeshOnMissed() {
    if (page_mode === "edit") {
      set_selected_model_index("empty");
    }
  }

  return (
    <>
      <div className="canvas_container">
        <Canvas>
          <Grid cellSize={3} infiniteGrid={true} fadeStrength={5} sectionColor={"white"} />
          <PerspectiveCamera makeDefault fov={90} position={[0, 4, 4]} />

          {!camera_rotation ? null : <CameraControls maxPolarAngle={Math.PI / 2.1} />}

          <ambientLight />
          <directionalLight />
          <pointLight position={[10, 10, 10]} />
          {models.map((model) => {
            const { id, component: ModelComponent } = model;
            return (
              <PivotControls
                visible={selected_model_index === id ? true : false}
                key={id}
                scale={selected_model_index === id ? 3 : 0}
                lineWidth={0}
                rotation={[0, 0, 0]}
                depthTest={false}
                activeAxes={transform_model_axis === "XYZ" ? [true, true, true] : [true, false, true]}
                axisColors={["orange", "yellow", "orange"]}
                onDragStart={() => PivotDragStart(id)}
                onDragEnd={() => PivotDragEnd()}
              >
                <mesh
                  key={id}
                  onPointerOver={() => MeshPointerOver(id)}
                  onPointerOut={() => MeshPointerOut(id)}
                  onClick={() => MeshOnClick(id)}
                  onPointerMissed={() => MeshOnMissed()}
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
          {object_list.map((item, index) => (
            <button key={index} className="object" onClick={item.onClick ?? (() => {})}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <CanvasModelsList models={models} />
      <button className="remove_selected_model" onClick={() => removeModel(model_hover_index)}>
        remove selected model
      </button>
      <button className="remove_all_models" onClick={() => removeModels()}>
        remove all models
      </button>
    </>
  );
}
