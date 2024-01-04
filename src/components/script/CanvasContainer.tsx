import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrthographicCamera, CameraControls, PivotControls, Box } from "@react-three/drei";
import * as THREE from "three";

import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import {
  set_cursor_type,
  set_canvas_models_array,
  set_object_selected,
  set_selected_model_id,
  set_camera_3d_direction,
} from "../../Store.tsx";

import { Model as StoneFoundationSquareHigh } from "../models/StoneFoundationSquareHigh.tsx";
import { Model as StoneFoundationSquareMid } from "../models/StoneFoundationSquareMid.tsx";
import { Model as StoneFoundationSquareLow } from "../models/StoneFoundationSquareLow.tsx";
import { Model as StoneFoundationTriangleHigh } from "../models/StoneFoundationTriangleHigh.tsx";
import { Model as StoneFoundationTriangleMid } from "../models/StoneFoundationTriangleMid.tsx";
import { Model as StoneFoundationTriangleLow } from "../models/StoneFoundationTriangleLow.tsx";
import { Model as StoneWallHigh } from "../models/StoneWallHigh.tsx";
import { Model as StoneWallLow } from "../models/StoneWallLow.tsx";
import { Model as StoneWallMid } from "../models/StoneWallMid.tsx";
import { Model as StoneDoorway } from "../models/StoneDoorway.tsx";
import { Model as StoneWallFrame } from "../models/StoneWallFrame.tsx";
import { Model as StoneWindow } from "../models/StoneWindow.tsx";
import { Model as StoneStairsLShape } from "../models/StoneStairsLShape.tsx";
import { Model as StoneStairsUShape } from "../models/StoneStairsUShape.tsx";
import { Model as StoneFloorSquare } from "../models/StoneFloorSquare.tsx";
import { Model as StoneFloorTriangle } from "../models/StoneFloorTriangle.tsx";
import { Model as StoneFloorFrameSquare } from "../models/StoneFloorFrameSquare.tsx";
import { Model as StoneFloorFrameTriangle } from "../models/StoneFloorFrameTriangle.tsx";

import { Model as MetalFoundationSquareHigh } from "../models/MetalFoundationSquareHigh.tsx";
import { Model as MetalFoundationSquareMid } from "../models/MetalFoundationSquareMid.tsx";
import { Model as MetalFoundationSquareLow } from "../models/MetalFoundationSquareLow.tsx";
import { Model as MetalFoundationTriangleHigh } from "../models/MetalFoundationTriangleHigh.tsx";
import { Model as MetalFoundationTriangleMid } from "../models/MetalFoundationTriangleMid.tsx";
import { Model as MetalFoundationTriangleLow } from "../models/MetalFoundationTriangleLow.tsx";
import { Model as MetalWallHigh } from "../models/MetalWallHigh.tsx";
import { Model as MetalWallMid } from "../models/MetalWallMid.tsx";
import { Model as MetalWallLow } from "../models/MetalWallLow.tsx";
import { Model as MetalDoorway } from "../models/MetalDoorway.tsx";
import { Model as MetalWallFrame } from "../models/MetalWallFrame.tsx";
import { Model as MetalWindow } from "../models/MetalWindow.tsx";
import { Model as MetalStairsLShape } from "../models/MetalStairsLShape.tsx";
import { Model as MetalStairsUShape } from "../models/MetalStairsUShape.tsx";
import { Model as MetalFloorSquare } from "../models/MetalFloorSquare.tsx";
import { Model as MetalFloorTriangle } from "../models/MetalFloorTriangle.tsx";
import { Model as MetalFloorFrameSquare } from "../models/MetalFloorFrameSquare.tsx";
import { Model as MetalFloorFrameTriangle } from "../models/MetalFloorFrameTriangle.tsx";
import { Model as MetalDoor } from "../models/MetalDoor.tsx";
import { Model as GarageDoor } from "../models/GarageDoor.tsx";

import { Model as WoodStorageBox } from "../models/WoodStorageBox.tsx";
import { Model as LargeWoodBox } from "../models/LargeWoodBox.tsx";
import { Model as ToolCupboard } from "../models/ToolCupboard.tsx";

import CanvasGrids from "./CanvasGrids.tsx";
import PerformanceStats from "./PerformanceStats.tsx";
interface CanvasModelsListProps {
  models: ModelType[];
}

type ModelType = {
  id: string;
  component: React.FC;
  rotation: THREE.Euler;
};

const CanvasModelsList: React.FC<CanvasModelsListProps> = ({ models }) => {
  return (
    <>
      <div className="canvas_models_list_title">active models:</div>
      <div className="canvas_models_list_container">
        <div>
          {models.map(({ id, component: ModelComponent }, index) => (
            <div key={id} className="canvas_model_list_element">
              {ModelComponent.displayName} id: {id} in: {index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default function CanvasContainer() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const model_pivot_axis = useSelector((state: RootState) => state.modelPivotAxis.model_pivot_axis);
  const camera_type = useSelector((state: RootState) => state.cameraType.camera_type);
  const camera_2d_position = useSelector((state: RootState) => state.camera2D.camera_2d_position);
  const camera_3d_reset = useSelector((state: RootState) => state.camera3D.camera_3d_reset);
  const cursor_type = useSelector((state: RootState) => state.cursorType.cursor_type);
  const model_type_to_create = useSelector((state: RootState) => state.modelTypeToCreate.model_type_to_create);
  const model_creation_state = useSelector((state: RootState) => state.modelTypeToCreate.model_creation_state);
  const keyboard_input = useSelector((state: RootState) => state.controlsInput.keyboard_input);
  const object_distance_multiplier = useSelector((state: RootState) => state.controlsInput.object_distance_multiplier);
  const key_press_trigger = useSelector((state: RootState) => state.controlsInput.key_press_trigger);
  const button_input = useSelector((state: RootState) => state.controlsInput.button_input);
  const button_trigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const object_rotation_degree = useSelector((state: RootState) => state.controlsInput.object_rotation_degree);
  const delete_object_mode = useSelector((state: RootState) => state.controlsInput.delete_object_mode);
  const delete_object_trigger = useSelector((state: RootState) => state.controlsInput.delete_object_trigger);
  const selected_model_id = useSelector((state: RootState) => state.modelsData.selected_model_id);
  const camera_3d_direction = useSelector((state: RootState) => state.camera3D.camera_3d_direction);

  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const active_models_state = useSelector((state: RootState) => state.pageSettings.active_models_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore

  const [camera_rotation, set_camera_rotation] = useState(true);
  const [mouse_canvas_x_coordinate, set_mouse_canvas_x_coordinate] = useState<number>(0);
  const [mouse_canvas_z_coordinate, set_mouse_canvas_z_coordinate] = useState<number>(0);

  const perspectiveCameraControlsRef = useRef<CameraControls>(null);
  const raycasterBoxIntersector = useRef(null);

  const raycaster = new THREE.Raycaster();
  const mouse_window_click = new THREE.Vector2();

  const [models, setModels] = useState<ModelType[]>([]);
  const [model_hover_id, set_model_hover_id] = useState<string>("empty");
  const [generated_id, set_generated_id] = useState<string>(randomIdGenerator());

  const [modelsTransforms, setModelsTransforms] = useState<{
    [id: string]: { position: { x: number; z: number; y: number }; rotation: THREE.Euler };
  }>({});

  const default_object_rotation = new THREE.Euler(0, 0, 0);

  const [prevent_actions_after_canvas_drag, set_prevent_actions_after_canvas_drag] = useState<string>("default");
  const [default_model_hight_position, set_default_model_hight_position] = useState<number>(0);

  //  const [camera_3d_direction, set_camera_3d_direction] = useState<string>("north");

  const addModel = (modelComponent: React.FC, id: string, rotation: THREE.Euler) => {
    if (prevent_actions_after_canvas_drag === "allow") {
      setModels((prevModels) => [...prevModels, { id, component: modelComponent, rotation }]);
    }
  };

  const RemoveSelectedModel = (id: string) => {
    setModels((prevModels) => prevModels.filter((model) => model.id !== id));
    dispatch(set_cursor_type("default"));
  };

  const RemoveAllModels = () => {
    setModels([]);
    dispatch(set_cursor_type("default"));
  };

  function storeCanvasModelsNames(models: any[]) {
    return models.map((model) => model.component.displayName);
  }

  function randomIdGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random_id = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      random_id += characters[randomIndex];
    }
    return random_id;
  }

  function PivotDragStart(index: string) {
    if (page_mode === "edit") {
      dispatch(set_selected_model_id(index));
      dispatch(set_object_selected(true));
      set_camera_rotation(false);
      dispatch(set_cursor_type("grab"));
    }
  }

  function PivotDragEnd() {
    if (page_mode === "edit") {
      set_camera_rotation(true);
      dispatch(set_selected_model_id("empty"));
      dispatch(set_object_selected(false));
    }
  }

  const MeshPointerOver = (selected_object_id: string) => {
    if (page_mode === "edit") {
      set_model_hover_id(selected_object_id);
      //  console.log("meshover", model_hover_id);
    }
  };

  const MeshPointerOut = (selected_object_id: string) => {
    if (page_mode === "edit") {
      set_model_hover_id(selected_object_id);
      // console.log("meshout", model_hover_id);
    }
  };

  function MeshOnClick(selected_object_id: string) {
    if (page_mode === "edit") {
      dispatch(set_selected_model_id(selected_object_id));
      dispatch(set_object_selected(true));
      // console.log("meshclick", selected_object_id);
    }
  }

  function MeshOnMissed() {
    if (page_mode === "edit") {
      dispatch(set_selected_model_id("empty"));
      dispatch(set_object_selected(false));
      // console.log("meshmiss");
    }
  }

  const PerspectiveCameraReset = () => {
    if (perspectiveCameraControlsRef.current) {
      perspectiveCameraControlsRef.current.reset(true);
    }
  };

  function CanvasPointerDown(event: any) {
    set_prevent_actions_after_canvas_drag("mouse_down");
    if (event.button === 0) {
      dispatch(set_cursor_type("crosshair"));
    } else if (event.button === 2) {
      dispatch(set_cursor_type("move"));
    }
  }

  function CanvasPointerUp(event: any) {
    if (prevent_actions_after_canvas_drag === "mouse_down") {
      set_prevent_actions_after_canvas_drag("allow");
    } else set_prevent_actions_after_canvas_drag("deny");

    if (event.button === 0) {
      dispatch(set_cursor_type("default"));
    } else if (event.button === 2) {
      dispatch(set_cursor_type("default"));
    }
  }

  function CanvasMouseOverIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    if (page_mode === "edit" && camera_type === "camera_3d") {
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

  function CanvasMouseClickIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    if (page_mode === "edit" && camera_type === "camera_3d" && model_creation_state) {
      mouse_window_click.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse_window_click.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse_window_click, perspectiveCameraControlsRef.current?.camera!);

      const intersects = raycaster.intersectObject(raycasterBoxIntersector.current!);

      if (intersects.length > 0) {
        const { x, z } = intersects[0].point;

        const rounded_x = parseFloat(x.toFixed(0));
        const rounded_z = parseFloat(z.toFixed(0));

        setModelsTransforms((prevTransforms) => ({
          ...prevTransforms,
          [generated_id]: {
            position: { x: rounded_x, z: rounded_z, y: default_model_hight_position },
            rotation: new THREE.Euler(0, 0, 0),
          },
        }));
      }
    }
  }

  function CanvasOnClick() {
    if (page_mode === "edit" && camera_type === "camera_3d" && model_creation_state) {
      if (model_type_to_create === "StoneFoundationSquareHigh") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationSquareHigh, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFoundationSquareMid") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationSquareMid, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFoundationSquareLow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationSquareLow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFoundationTriangleHigh") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationTriangleHigh, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFoundationTriangleMid") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationTriangleMid, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFoundationTriangleLow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationTriangleLow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneWallHigh") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallHigh, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneWallMid") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallMid, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneWallLow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallLow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneDoorway") {
        set_generated_id(randomIdGenerator());
        addModel(StoneDoorway, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneWallFrame") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallFrame, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneWindow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWindow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneStairsLShape") {
        set_generated_id(randomIdGenerator());
        addModel(StoneStairsLShape, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneStairsUShape") {
        set_generated_id(randomIdGenerator());
        addModel(StoneStairsUShape, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFloorSquare") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorSquare, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFloorTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorTriangle, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFloorFrameSquare") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorFrameSquare, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "StoneFloorFrameTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorFrameTriangle, generated_id, default_object_rotation);
      }

      // metal

      if (model_type_to_create === "MetalFoundationSquareHigh") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationSquareHigh, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFoundationSquareMid") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationSquareMid, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFoundationSquareLow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationSquareLow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFoundationTriangleHigh") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationTriangleHigh, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFoundationTriangleMid") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationTriangleMid, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFoundationTriangleLow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationTriangleLow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalWallHigh") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallHigh, generated_id, default_object_rotation);
      }
      if (model_type_to_create === "MetalWallMid") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallMid, generated_id, default_object_rotation);
      }
      if (model_type_to_create === "MetalWallLow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallLow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalDoorway") {
        set_generated_id(randomIdGenerator());
        addModel(MetalDoorway, generated_id, default_object_rotation);
      }
      if (model_type_to_create === "MetalWallFrame") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallFrame, generated_id, default_object_rotation);
      }
      if (model_type_to_create === "MetalWindow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWindow, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalStairsLShape") {
        set_generated_id(randomIdGenerator());
        addModel(MetalStairsLShape, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalStairsUShape") {
        set_generated_id(randomIdGenerator());
        addModel(MetalStairsUShape, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFloorSquare") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorSquare, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFloorTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorTriangle, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFloorFrameSquare") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorFrameSquare, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalFloorFrameTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorFrameTriangle, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "MetalDoor") {
        set_generated_id(randomIdGenerator());
        addModel(MetalDoor, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "GarageDoor") {
        set_generated_id(randomIdGenerator());
        addModel(GarageDoor, generated_id, default_object_rotation);
      }

      //miscs

      if (model_type_to_create === "ToolCupboard") {
        set_generated_id(randomIdGenerator());
        addModel(ToolCupboard, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "WoodStorageBox") {
        set_generated_id(randomIdGenerator());
        addModel(WoodStorageBox, generated_id, default_object_rotation);
      }

      if (model_type_to_create === "LargeWoodBox") {
        set_generated_id(randomIdGenerator());
        addModel(LargeWoodBox, generated_id, default_object_rotation);
      }
    }
  }

  function CaptureMouseCanvasDrag(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.buttons === 1) {
      set_prevent_actions_after_canvas_drag("canvas_drag");
    }
  }

  const RotateSelectedObject = (objectId: string, direction: string) => {
    setModelsTransforms((prevTransforms) => {
      const updatedModelTransforms = { ...prevTransforms };

      const rotationDirection = direction === "left" ? -1 : 1;

      if (updatedModelTransforms[objectId]) {
        const newRotation = updatedModelTransforms[objectId].rotation.clone();

        newRotation.y += THREE.MathUtils.degToRad(object_rotation_degree * rotationDirection);

        updatedModelTransforms[objectId] = {
          ...updatedModelTransforms[objectId],
          rotation: newRotation,
        };
      }

      return updatedModelTransforms;
    });
  };

  const moveSelectedObjectX = (direction: number) => {
    setModelsTransforms((prevTransforms) => {
      const updatedModelTransforms = { ...prevTransforms };

      if (selected_model_id !== "empty" && updatedModelTransforms[selected_model_id]) {
        const newPosition = { ...updatedModelTransforms[selected_model_id].position };

        newPosition.x += direction * object_distance_multiplier;

        updatedModelTransforms[selected_model_id] = {
          ...updatedModelTransforms[selected_model_id],
          position: newPosition,
        };
      }

      return updatedModelTransforms;
    });
  };

  const moveSelectedObjectZ = (direction: number) => {
    setModelsTransforms((prevTransforms) => {
      const updatedModelTransforms = { ...prevTransforms };

      if (selected_model_id !== "empty" && updatedModelTransforms[selected_model_id]) {
        const newPosition = { ...updatedModelTransforms[selected_model_id].position };

        newPosition.z += direction * object_distance_multiplier;

        updatedModelTransforms[selected_model_id] = {
          ...updatedModelTransforms[selected_model_id],
          position: newPosition,
        };
      }

      return updatedModelTransforms;
    });
  };

  const moveSelectedObjectY = (direction: number) => {
    setModelsTransforms((prevTransforms) => {
      const updatedModelTransforms = { ...prevTransforms };

      if (selected_model_id !== "empty" && updatedModelTransforms[selected_model_id]) {
        const newPosition = { ...updatedModelTransforms[selected_model_id].position };

        newPosition.y += direction * object_distance_multiplier;

        updatedModelTransforms[selected_model_id] = {
          ...updatedModelTransforms[selected_model_id],
          position: newPosition,
        };
      }

      return updatedModelTransforms;
    });
  };

  document.body.style.cursor = cursor_type;

  useEffect(() => {
    PerspectiveCameraReset();
  }, [camera_3d_reset]);

  useEffect(() => {
    {
      dispatch(set_canvas_models_array(storeCanvasModelsNames(models)));
    }
  }, [models]);

  useEffect(() => {
    {
      if (keyboard_input === "Q") {
        RotateSelectedObject(selected_model_id, "left");
      }
      if (keyboard_input === "E") {
        RotateSelectedObject(selected_model_id, "right");
      }
      if (keyboard_input === "W") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectZ(-1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectZ(+1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectX(+1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectX(-1);
        }
      }
      if (keyboard_input === "A") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectX(-1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectX(+1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectZ(-1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectZ(+1);
        }
      }
      if (keyboard_input === "S") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectZ(+1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectZ(-1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectX(-1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectX(+1);
        }
      }
      if (keyboard_input === "D") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectX(+1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectX(-1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectZ(+1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectZ(-1);
        }
      }

      if (keyboard_input === "SPACE") {
        moveSelectedObjectY(+1);
      }

      if (keyboard_input === "CTRL") {
        moveSelectedObjectY(-1);
      }
    }
  }, [key_press_trigger]);

  useEffect(() => {
    {
      if (button_input === "move_left") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectX(-1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectX(+1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectZ(-1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectZ(+1);
        }
      } else if (button_input === "move_front") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectZ(-1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectZ(+1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectX(+1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectX(-1);
        }
      } else if (button_input === "move_right") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectX(+1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectX(-1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectZ(+1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectZ(-1);
        }
      } else if (button_input === "move_back") {
        if (camera_3d_direction === "north") {
          moveSelectedObjectZ(+1);
        } else if (camera_3d_direction === "south") {
          moveSelectedObjectZ(-1);
        } else if (camera_3d_direction === "east") {
          moveSelectedObjectX(-1);
        } else if (camera_3d_direction === "west") {
          moveSelectedObjectX(+1);
        }
      } else if (button_input === "move_up") {
        moveSelectedObjectY(+1);
      } else if (button_input === "move_down") {
        moveSelectedObjectY(-1);
      } else if (button_input === "rotate_left") {
        RotateSelectedObject(selected_model_id, "left");
      } else if (button_input === "rotate_right") {
        RotateSelectedObject(selected_model_id, "right");
      }
    }
  }, [button_trigger]);

  useEffect(() => {
    {
      if (delete_object_mode === "delete_selected_object") {
        RemoveSelectedModel(selected_model_id);
      } else if (keyboard_input === "DELETE") {
        RemoveSelectedModel(selected_model_id);
      } else if (delete_object_mode === "delete_all_object") {
        RemoveAllModels();
      }

      dispatch(set_selected_model_id("empty"));
      dispatch(set_object_selected(false));
    }
  }, [delete_object_trigger]);

  useEffect(() => {
    if (
      model_type_to_create &&
      [
        "StoneFoundationSquareHigh",
        "StoneFoundationSquareMid",
        "StoneFoundationSquareLow",
        "StoneFoundationTriangleHigh",
        "StoneFoundationTriangleMid",
        "StoneFoundationTriangleLow",
        "MetalFoundationSquareHigh",
        "MetalFoundationSquareMid",
        "MetalFoundationSquareLow",
        "MetalFoundationTriangleHigh",
        "MetalFoundationTriangleMid",
        "MetalFoundationTriangleLow",
      ].includes(model_type_to_create)
    ) {
      set_default_model_hight_position(0);
    } else {
      set_default_model_hight_position(0.05);
    }
  }, [model_type_to_create]);

  const Camera3DDirection = () => {
    if (perspectiveCameraControlsRef.current) {
      const { camera } = perspectiveCameraControlsRef.current;

      if (camera && camera.rotation) {
        const camera_rotation = camera.rotation.toArray();

        if (typeof camera_rotation[2] === "number") {
          if (camera_rotation[2] > -0.4 && camera_rotation[2] < 0.45) {
            dispatch(set_camera_3d_direction("north"));
          } else if (
            (camera_rotation[2] > 2.65 && camera_rotation[2] < 3.14) ||
            (camera_rotation[2] < -2.65 && camera_rotation[2] > -3.14)
          ) {
            dispatch(set_camera_3d_direction("south"));
          } else if (camera_rotation[2] < -0.4 && camera_rotation[2] > -2.65) {
            dispatch(set_camera_3d_direction("east"));
          } else if (camera_rotation[2] < 2.65 && camera_rotation[2] > 0.45) {
            dispatch(set_camera_3d_direction("west"));
          }
        }
      }
    }
  };

  return (
    <>
      <div className="canvas_container">
        <Canvas
          onPointerDown={(event) => CanvasPointerDown(event)}
          onPointerUp={(event) => CanvasPointerUp(event)}
          onMouseMove={(event) => {
            CanvasMouseOverIntersectionCoordinates(event), CaptureMouseCanvasDrag(event);
          }}
          onClick={(event) => {
            CanvasMouseClickIntersectionCoordinates(event), CanvasOnClick();
          }}
          onMouseUp={() => Camera3DDirection()}
        >
          {performance_monitor_state && <PerformanceStats />}
          <ambientLight />
          <ambientLight />
          <directionalLight />
          <pointLight position={[10, 10, 10]} />
          <CanvasGrids />

          {camera_type === "camera_3d" && (
            <>
              {/* prettier-ignore */}
              <PerspectiveCamera 
              makeDefault 
              fov={camera_fov} 
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
          {camera_type === "camera_2d" && (
            <>
              <OrthographicCamera
                key={camera_2d_position.join(",")}
                makeDefault
                zoom={25}
                position={camera_2d_position as [number, number, number]}
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
            const modelTransform = modelsTransforms[id] || {
              position: { x: 0, z: 0, y: 0 },
              rotation: new THREE.Euler(0, 0, 0),
            };
            return (
              <PivotControls
                offset={[modelTransform.position.x, modelTransform.position.y, modelTransform.position.z]}
                rotation={modelTransform.rotation.toArray().map(Number) as [number, number, number]}
                visible={selected_model_id === id && page_mode === "edit" ? true : false}
                key={id}
                scale={selected_model_id === id ? 3 : 0}
                lineWidth={0}
                depthTest={false}
                activeAxes={model_pivot_axis === "XYZ" ? [true, true, true] : [true, false, true]}
                axisColors={["orange", "yellow", "orange"]}
                onDragStart={() => PivotDragStart(id)}
                onDragEnd={() => PivotDragEnd()}
              >
                <mesh
                  position={[modelTransform.position.x, modelTransform.position.y, modelTransform.position.z]}
                  rotation={modelTransform.rotation}
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
          {model_creation_state && page_mode === "edit" && (
            <Box position={[mouse_canvas_x_coordinate, 0, mouse_canvas_z_coordinate]} scale={[2, 0.01, 2]}>
              <meshStandardMaterial transparent opacity={1} color={"rgb(255, 206, 166)"} />
            </Box>
          )}
        </Canvas>
      </div>
      {active_models_state && <CanvasModelsList models={models} />}

      <button
        className="test_button"
        onClick={() => {
          console.log(object_distance_multiplier);
        }}
      ></button>
    </>
  );
}
