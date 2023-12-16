import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrthographicCamera, CameraControls, PivotControls, Box } from "@react-three/drei";
import * as THREE from "three";

import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { set_cursor_type } from "../../Store.tsx";
import { set_canvas_models_array } from "../../Store.tsx";

import { Model as StoneFoundationSquareMid } from "../models/StoneFoundationSquareMid.tsx";
import { Model as StoneFoundationSquareHigh } from "../models/StoneFoundationSquareHigh.tsx";
import { Model as StoneWallHigh } from "../models/StoneWallHigh.tsx";

import CanvasGrids from "./CanvasGrids.tsx";

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
            name: {ModelComponent.displayName} id: {id} in: {index}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CanvasContainer() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const transform_model_axis = useSelector((state: RootState) => state.transformAxis.transform_model_axis);
  const camera_type = useSelector((state: RootState) => state.cameraType.camera_type);
  // prettier-ignore
  const ortographic_camera_position = useSelector((state: RootState) => state.ortographicCameraPosition.ortographic_camera_position);
  // prettier-ignore
  const perspective_camera_reset = useSelector((state: RootState) => state.perspectiveCameraReset.perspective_camera_reset);
  const cursor_type = useSelector((state: RootState) => state.cursorType.cursor_type);

  const perspectiveCameraControlsRef = useRef<CameraControls>(null);
  const raycasterBoxIntersector = useRef(null);

  const [camera_rotation, set_camera_rotation] = useState(true);

  const [models, setModels] = useState<ModelType[]>([]);
  const [selected_model_id, set_selected_model_id] = useState<string>("empty");
  const [model_hover_id, set_model_hover_id] = useState<string>("empty");
  const [generated_id, set_generated_id] = useState<string>(randomIdGenerator());

  const [mouse_canvas_x_coordinate, set_mouse_canvas_x_coordinate] = useState<number>(0);
  const [mouse_canvas_z_coordinate, set_mouse_canvas_z_coordinate] = useState<number>(0);

  const raycaster = new THREE.Raycaster();
  const mouse_window_click = new THREE.Vector2();

  const object_list = [
    // { name: "twig_foundation_low", thumbnail: "", id: "FL0" },
    // { name: "twig_foundation_mid", thumbnail: "", id: "FM0" },
    // { name: "twig_foundation_high", thumbnail: "", id: "FH0" },

    // { name: "wooden_foundation_low", thumbnail: "", id: "FL1" },
    // { name: "wooden_foundation_mid", thumbnail: "", id: "FM1" },
    // { name: "wooden_foundation_high", thumbnail: "", id: "FH1" },

    // { name: "stone_foundation_low", thumbnail: "", id: "FL2" },

    {
      name: "stone foundation square (mid)",
      build_cost: "300STONE",
      upkeep_cost: "30STONE",
      thumbnail: "",
      id: "FM2",
      onClick: () => {
        set_selected_model_id("empty"),
          set_generated_id(randomIdGenerator()),
          addModel(StoneFoundationSquareMid, generated_id);
      },
    },

    {
      name: "stone foundation square (high)",
      build_cost: "300STONE",
      upkeep_cost: "30STONE",
      thumbnail: "",
      id: "FH2",
      onClick: () => {
        set_selected_model_id("empty"),
          set_generated_id(randomIdGenerator()),
          addModel(StoneFoundationSquareHigh, generated_id);
      },
    },

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
      name: "stone wall (high)",
      build_cost: "300STONE",
      upkeep_cost: "30STONE",
      thumbnail: "",
      id: "WH2",
      onClick: () => {
        set_selected_model_id("empty"), set_generated_id(randomIdGenerator()), addModel(StoneWallHigh, generated_id);
      },
    },

    {
      name: "test",

      onClick: () => {
        {
        }
      },
    },
  ];

  function randomIdGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random_id = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      random_id += characters[randomIndex];
    }
    return random_id;
  }

  const addModel = (modelComponent: React.FC, id: string) => {
    setModels((prevModels) => [...prevModels, { id, component: modelComponent }]);
  };

  const RemoveSelectedModel = (id: string) => {
    setModels((prevModels) => prevModels.filter((model) => model.id !== id));
    dispatch(set_cursor_type("default"));
  };

  const RemoveAllModels = () => {
    setModels([]);
    dispatch(set_cursor_type("default"));
  };

  function PivotDragStart(index: string) {
    if (page_mode === "edit") {
      set_selected_model_id(index);
      set_camera_rotation(false);
      dispatch(set_cursor_type("grab"));
    }
  }

  function PivotDragEnd() {
    if (page_mode === "edit") {
      set_camera_rotation(true);
      set_selected_model_id("empty");
    }
  }

  const MeshPointerOver = (selected_object_id: string) => {
    if (page_mode === "edit") {
      set_model_hover_id(selected_object_id);
      console.log("meshover", model_hover_id);
    }
  };

  const MeshPointerOut = (selected_object_id: string) => {
    if (page_mode === "edit") {
      set_model_hover_id(selected_object_id);
      console.log("meshout", model_hover_id);
    }
  };

  function MeshOnClick(selected_object_id: string) {
    if (page_mode === "edit") {
      set_selected_model_id(selected_object_id);
      console.log("meshclick", selected_object_id);
    }
  }

  function MeshOnMissed(selected_object_id: string) {
    if (page_mode === "edit") {
      set_selected_model_id(selected_object_id);
      console.log("meshmiss", selected_object_id);
    }
  }

  const PerspectiveCameraReset = () => {
    if (perspectiveCameraControlsRef.current) {
      perspectiveCameraControlsRef.current.reset(true);
    }
  };

  function CanvasPointerDown(event: any) {
    if (event.button === 0) {
      dispatch(set_cursor_type("crosshair"));
    } else if (event.button === 2) {
      dispatch(set_cursor_type("move"));
    }
  }

  function CanvasPointerUp(event: any) {
    if (event.button === 0) {
      dispatch(set_cursor_type("default"));
    } else if (event.button === 2) {
      dispatch(set_cursor_type("default"));
    }
  }

  function storeCanvasModelsNames(models: any[]) {
    return models.map((model) => model.component.displayName);
  }

  document.body.style.cursor = cursor_type;

  useEffect(() => {
    PerspectiveCameraReset();
  }, [perspective_camera_reset]);

  useEffect(() => {
    {
      dispatch(set_canvas_models_array(storeCanvasModelsNames(models)));
    }
  }, [models]);

  function CanvasIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    mouse_window_click.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_window_click.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse_window_click, perspectiveCameraControlsRef.current?.camera!);

    const intersects = raycaster.intersectObject(raycasterBoxIntersector.current!);

    if (intersects.length > 0) {
      const { x, z } = intersects[0].point;

      // Round x and z to the closest 0.5
      // const rounded_x = Math.round(x * 2) / 2;
      //  const rounded_z = Math.round(z * 2) / 2;

      const rounded_x = parseFloat(x.toFixed(0));
      const rounded_z = parseFloat(z.toFixed(0));

      set_mouse_canvas_x_coordinate(rounded_x);
      set_mouse_canvas_z_coordinate(rounded_z);

      console.log(mouse_canvas_x_coordinate);
      console.log(mouse_canvas_z_coordinate);
    }
  }

  return (
    <>
      <div className="canvas_container">
        <Canvas
          onPointerDown={(event) => CanvasPointerDown(event)}
          onPointerUp={(event) => CanvasPointerUp(event)}
          onMouseMove={(event) => CanvasIntersectionCoordinates(event)}
        >
          <ambientLight />
          <directionalLight />
          <pointLight position={[10, 10, 10]} />
          <CanvasGrids />

          {camera_type === "3D_PerspectiveCamera" && (
            <>
              {/* prettier-ignore */}
              <PerspectiveCamera 
              makeDefault 
              fov={90} 
              position={[0, 15, 15]} 
              near={0.1} 
              far={100} 
              />

              <CameraControls
                ref={perspectiveCameraControlsRef}
                maxPolarAngle={Math.PI / 2.1}
                enabled={camera_rotation}
                mouseButtons={{ left: 1, right: 2, middle: 0, wheel: 8 }}
              />
            </>
          )}
          {camera_type === "2D_OrtographicCamera" && (
            <>
              <OrthographicCamera
                key={ortographic_camera_position.join(",")}
                makeDefault
                zoom={25}
                position={ortographic_camera_position as [number, number, number]}
                near={0.1}
                far={100}
              />
              <CameraControls enabled={camera_rotation} mouseButtons={{ left: 2, right: 2, middle: 0, wheel: 16 }} />
            </>
          )}
          <Box ref={raycasterBoxIntersector} scale={[105, 0.1, 105]} position={[0, -0.5, 0]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>
          {models.map((model) => {
            const { id, component: ModelComponent } = model;
            return (
              <PivotControls
                visible={selected_model_id === id && page_mode === "edit" ? true : false}
                key={id}
                scale={selected_model_id === id ? 3 : 0}
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
                  onPointerMissed={() => MeshOnMissed("empty")}
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
      {page_mode === "edit" && (
        <button
          className="remove_selected_model"
          onClick={() => {
            RemoveSelectedModel(selected_model_id), set_selected_model_id("empty");
          }}
        >
          remove selected model
        </button>
      )}
      {page_mode === "edit" && (
        <button
          className="remove_all_models"
          onClick={() => {
            RemoveAllModels(), set_selected_model_id("empty");
          }}
        >
          remove all models
        </button>
      )}
    </>
  );
}
