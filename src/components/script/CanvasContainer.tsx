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

  const [models_coordinates, set_models_coordinates] = useState<{ [id: string]: { x: number; z: number } }>({}); // performance issue 1/3

  const [selected_object_list, set_selected_object_list] = useState<number>(-1);
  const [allow_model_creation, set_allow_model_creation] = useState<boolean>(false);
  const [model_to_create, set_model_to_create] = useState<string>("none");

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
      thumbnail: "",
      id: "FM2",
      onClick: () => {
        //  set_selected_model_id("empty"),
        //   set_generated_id(randomIdGenerator()),
        // addModel(StoneFoundationSquareMid, generated_id);

        set_model_to_create("StoneFoundationSquareMid");
      },
    },

    {
      name: "stone foundation square (high)",
      thumbnail: "",
      id: "FH2",
      onClick: () => {
        //  set_selected_model_id("empty"),
        //   set_generated_id(randomIdGenerator()),
        //   addModel(StoneFoundationSquareHigh, generated_id);
        set_model_to_create("StoneFoundationSquareHigh");
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
      thumbnail: "",
      id: "WH2",
      onClick: () => {
        // set_selected_model_id("empty"),
        // set_generated_id(randomIdGenerator()),
        //   addModel(StoneWallHigh, generated_id);

        set_model_to_create("StoneWallHigh");
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

  function CanvasOverIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    if (page_mode === "edit") {
      mouse_window_click.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse_window_click.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse_window_click, perspectiveCameraControlsRef.current?.camera!);

      const intersects = raycaster.intersectObject(raycasterBoxIntersector.current!);

      if (intersects.length > 0) {
        const { x, z } = intersects[0].point;
        const rounded_x = parseFloat(x.toFixed(0));
        const rounded_z = parseFloat(z.toFixed(0));

        set_mouse_canvas_x_coordinate(rounded_x);
        set_mouse_canvas_z_coordinate(rounded_z);
      }
    }
  }

  function CanvasClickIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    mouse_window_click.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_window_click.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse_window_click, perspectiveCameraControlsRef.current?.camera!);

    const intersects = raycaster.intersectObject(raycasterBoxIntersector.current!);

    if (intersects.length > 0) {
      const { x, z } = intersects[0].point;

      const rounded_x = parseFloat(x.toFixed(0));
      const rounded_z = parseFloat(z.toFixed(0));

      set_models_coordinates((prevCoordinates) => ({
        ...prevCoordinates,
        [generated_id]: { x: rounded_x, z: rounded_z },
      }));
    }
  }

  // function CanvasIntersectionCoordinates(event: { clientX: number; clientY: number }) {
  //   mouse_window_click.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse_window_click.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   raycaster.setFromCamera(mouse_window_click, perspectiveCameraControlsRef.current?.camera!);

  //   const intersects = raycaster.intersectObject(raycasterBoxIntersector.current!);

  //   if (intersects.length > 0) {
  //     const { x, z } = intersects[0].point;

  //     // Round x and z to the closest 0.5
  //     // const rounded_x = Math.round(x * 2) / 2;
  //     //  const rounded_z = Math.round(z * 2) / 2;

  //     const rounded_x = parseFloat(x.toFixed(0));
  //     const rounded_z = parseFloat(z.toFixed(0));

  //     set_mouse_canvas_x_coordinate(rounded_x);
  //     set_mouse_canvas_z_coordinate(rounded_z);

  //     console.log(mouse_canvas_x_coordinate);
  //     console.log(mouse_canvas_z_coordinate);
  //   }
  // }

  function CanvasOnClick() {
    set_selected_model_id("empty");

    if (model_to_create === "StoneFoundationSquareHigh") {
      set_generated_id(randomIdGenerator());
      addModel(StoneFoundationSquareHigh, generated_id);
    }

    if (model_to_create === "StoneFoundationSquareMid") {
      set_generated_id(randomIdGenerator());
      addModel(StoneFoundationSquareMid, generated_id);
    }

    if (model_to_create === "StoneWallHigh") {
      set_generated_id(randomIdGenerator());
      addModel(StoneWallHigh, generated_id);
    }
  }

  return (
    <>
      <div className="canvas_container">
        <Canvas
          onPointerDown={(event) => CanvasPointerDown(event)}
          onPointerUp={(event) => CanvasPointerUp(event)}
          onMouseMove={(event) => CanvasOverIntersectionCoordinates(event)}
          onClick={(event) => {
            if (allow_model_creation) {
              CanvasClickIntersectionCoordinates(event), CanvasOnClick();
            }
          }}
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
          <Box ref={raycasterBoxIntersector} scale={[100, 0.1, 100]} position={[0, -0.5, 0]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>
          {models.map((model) => {
            const { id, component: ModelComponent } = model;
            const modelPosition = models_coordinates[id] || { x: 0, z: 0 }; // performance issue 2/3
            return (
              <PivotControls
                offset={[modelPosition.x, 0, modelPosition.z]}
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
                  position={[modelPosition.x, 0, modelPosition.z]} // performance issue 3/3
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
          {allow_model_creation && (
            <Box position={[mouse_canvas_x_coordinate, 0, mouse_canvas_z_coordinate]} scale={[2, 0.01, 2]}>
              <meshStandardMaterial transparent opacity={1} color={"#59d0ff"} />
            </Box>
          )}
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
            <button
              key={index}
              className={selected_object_list === index ? "object object_selected" : "object object_deselected"}
              onClick={() => {
                if (selected_object_list === index) {
                  set_selected_object_list(-1);
                  set_allow_model_creation(false);
                  set_model_to_create("none");
                } else {
                  set_selected_object_list(index);
                  set_allow_model_creation(true);
                }
                item.onClick?.();
              }}
            >
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
