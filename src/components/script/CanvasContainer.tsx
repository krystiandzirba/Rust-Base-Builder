import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrthographicCamera,
  CameraControls,
  PivotControls,
  Box,
  Environment,
} from "@react-three/drei";
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

import { Model as TriangleProp } from "../models/TriangleProp.tsx";
import { Model as ArrowProp } from "../models/ArrowProp.tsx";

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
import { Model as StoneRoofSquare } from "../models/StoneRoofSquare.tsx";
import { Model as StoneRoofTriangle } from "../models/StoneRoofTriangle.tsx";

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
import { Model as MetalRoofSquare } from "../models/MetalRoofSquare.tsx";
import { Model as MetalRoofTriangle } from "../models/MetalRoofTriangle.tsx";

import { Model as MetalDoor } from "../models/MetalDoor.tsx";
import { Model as GarageDoor } from "../models/GarageDoor.tsx";

import { Model as MetalVerticalEmbrasure } from "../models/MetalVerticalEmbrasure.tsx";
import { Model as StrenghtenedGlassWindow } from "../models/StrenghtenedGlassWindow.tsx";

import { Model as ToolCupboard } from "../models/ToolCupboard.tsx";
import { Model as WoodStorageBox } from "../models/WoodStorageBox.tsx";
import { Model as LargeWoodBox } from "../models/LargeWoodBox.tsx";
import { Model as Furnace } from "../models/Furnace.tsx";
import { Model as WorkbenchT3 } from "../models/WorkbenchT3.tsx";

import CanvasGrids from "./CanvasGrids.tsx";
import CanvasLights from "./CanvasLights.tsx";
import PerformanceStats from "./PerformanceStats.tsx";
import Postprocessing from "./Postprocessing.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

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
  const camera_type = useSelector((state: RootState) => state.camerasSettings.camera_type);
  const camera_3d_direction = useSelector((state: RootState) => state.camerasSettings.camera_3d_direction);
  const camera_3d_reset = useSelector((state: RootState) => state.camerasSettings.camera_3d_reset);
  const camera_2d_position = useSelector((state: RootState) => state.camerasSettings.camera_2d_position);
  const camera_2d_direction = useSelector((state: RootState) => state.camerasSettings.camera_2d_direction);
  const cursor_type = useSelector((state: RootState) => state.cursorType.cursor_type);
  const model_type_to_create = useSelector((state: RootState) => state.modelsData.model_type_to_create);
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state);
  const keyboard_input = useSelector((state: RootState) => state.controlsInput.keyboard_input);
  const object_distance_multiplier = useSelector((state: RootState) => state.controlsInput.object_distance_multiplier);
  const key_press_trigger = useSelector((state: RootState) => state.controlsInput.key_press_trigger);
  const button_input = useSelector((state: RootState) => state.controlsInput.button_input);
  const button_trigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const object_rotation_degree = useSelector((state: RootState) => state.controlsInput.object_rotation_degree);
  const delete_object_mode = useSelector((state: RootState) => state.controlsInput.delete_object_mode);
  const delete_object_trigger = useSelector((state: RootState) => state.controlsInput.delete_object_trigger);
  const selected_model_id = useSelector((state: RootState) => state.modelsData.selected_model_id);
  const performance_mode = useSelector((state: RootState) => state.pageSettings.performance_mode); //prettier-ignore
  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const active_models_state = useSelector((state: RootState) => state.pageSettings.active_models_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore
  const HDR_state = useSelector((state: RootState) => state.pageSettings.HDR_state); //prettier-ignore
  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore

  const [models, setModels] = useState<ModelType[]>([]);
  const [modelsTransforms, setModelsTransforms] = useState<{[id: string]: { position: { x: number; z: number; y: number }; rotation: THREE.Euler }}>({}); //prettier-ignore
  const [generated_id, set_generated_id] = useState<string>(randomIdGenerator());
  const [model_prop, set_model_prop] = useState<string>("none");

  const default_object_rotation = new THREE.Euler(0, 0, 0);
  const [model_foundation_elevation, set_model_foundation_elevation] = useState<number>(0);
  const [default_model_height_position, set_default_model_height_position] = useState<number>(0);
  const [pivot_controls_state, set_pivot_controls_state] = useState<boolean>(false);
  const [pivot_x_axis_state, set_pivot_x_axis_state] = useState<boolean>(false);
  const [pivot_y_axis_state, set_pivot_y_axis_state] = useState<boolean>(false);
  const [pivot_z_axis_state, set_pivot_z_axis_state] = useState<boolean>(false);
  const [default_model_rotation, set_default_model_rotation] = useState<number>(0);

  const mouse_window_click = new THREE.Vector2();
  const [mouse_canvas_x_coordinate, set_mouse_canvas_x_coordinate] = useState<number>(0);
  const [mouse_canvas_z_coordinate, set_mouse_canvas_z_coordinate] = useState<number>(0);

  const [camera_rotation, set_camera_rotation] = useState(true);
  const perspectiveCameraControlsRef = useRef<CameraControls>(null);
  const raycasterBoxIntersector = useRef(null);
  const raycaster = new THREE.Raycaster();

  const [prevent_actions_after_canvas_drag, set_prevent_actions_after_canvas_drag] = useState<string>("default");
  let canvas_mouse_over_last_execution_time = 0;
  let canvas_mouse_drag_last_execution_time = 0;

  const prebuild_created = useRef(false);

  const addModel = (modelComponent: React.FC, id: string, rotation: THREE.Euler) => {
    if (prevent_actions_after_canvas_drag === "allow") {
      setModels((prevModels) => [...prevModels, { id, component: modelComponent, rotation }]);
    }
  };

  const addPrebuild = (modelComponent: React.FC, id: string, rotation: THREE.Euler) => {
    setModels((prevModels) => [...prevModels, { id, component: modelComponent, rotation }]);
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

  function MeshOnClick(selected_object_id: string) {
    if (page_mode === "edit" && !model_creation_state) {
      dispatch(set_selected_model_id(selected_object_id));
      dispatch(set_object_selected(true));
      dispatch(set_cursor_type("grab"));
    }
  }

  function MeshOnMissed() {
    if (page_mode === "edit" && !model_creation_state) {
      dispatch(set_selected_model_id("empty"));
      dispatch(set_object_selected(false));
      dispatch(set_cursor_type("default"));
    }
  }

  const PerspectiveCameraReset = () => {
    if (perspectiveCameraControlsRef.current) {
      perspectiveCameraControlsRef.current.reset(true);
    }
  };

  function CanvasPointerDown(event: any) {
    if (page_mode === "edit" && model_creation_state) {
      set_prevent_actions_after_canvas_drag("mouse_down");
      if (event.button === 0) {
        dispatch(set_cursor_type("crosshair"));
      } else if (event.button === 2) {
        dispatch(set_cursor_type("move"));
      }
    }
  }

  function CanvasPointerUp(event: any) {
    if (page_mode === "edit" && model_creation_state) {
      if (prevent_actions_after_canvas_drag === "mouse_down") {
        set_prevent_actions_after_canvas_drag("allow");
      } else set_prevent_actions_after_canvas_drag("deny");

      if (event.button === 0) {
        dispatch(set_cursor_type("default"));
      } else if (event.button === 2) {
        dispatch(set_cursor_type("default"));
      }
    }
  }

  function CanvasMouseOverIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    const currentTimestamp = Date.now();
    const time_since_last_execution = currentTimestamp - canvas_mouse_over_last_execution_time;

    if (
      page_mode === "edit" &&
      camera_type === "camera_3d" &&
      model_creation_state &&
      time_since_last_execution >= 30
    ) {
      canvas_mouse_over_last_execution_time = currentTimestamp;

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
    } else return;
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
            position: { x: rounded_x, z: rounded_z, y: default_model_height_position + model_foundation_elevation },
            rotation: new THREE.Euler(0, default_model_rotation, 0, "XYZ"),
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
      } else if (model_type_to_create === "StoneFoundationSquareMid") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationSquareMid, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFoundationSquareLow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationSquareLow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFoundationTriangleHigh") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationTriangleHigh, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFoundationTriangleMid") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationTriangleMid, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFoundationTriangleLow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFoundationTriangleLow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneWallHigh") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallHigh, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneWallMid") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallMid, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneWallLow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallLow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneDoorway") {
        set_generated_id(randomIdGenerator());
        addModel(StoneDoorway, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneWallFrame") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWallFrame, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneWindow") {
        set_generated_id(randomIdGenerator());
        addModel(StoneWindow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneStairsLShape") {
        set_generated_id(randomIdGenerator());
        addModel(StoneStairsLShape, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneStairsUShape") {
        set_generated_id(randomIdGenerator());
        addModel(StoneStairsUShape, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFloorSquare") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorSquare, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFloorTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorTriangle, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFloorFrameSquare") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorFrameSquare, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneFloorFrameTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(StoneFloorFrameTriangle, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneRoofSquare") {
        set_generated_id(randomIdGenerator());
        addModel(StoneRoofSquare, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StoneRoofTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(StoneRoofTriangle, generated_id, default_object_rotation);
      }

      // metal
      else if (model_type_to_create === "MetalFoundationSquareHigh") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationSquareHigh, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFoundationSquareMid") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationSquareMid, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFoundationSquareLow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationSquareLow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFoundationTriangleHigh") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationTriangleHigh, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFoundationTriangleMid") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationTriangleMid, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFoundationTriangleLow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFoundationTriangleLow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalWallHigh") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallHigh, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalWallMid") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallMid, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalWallLow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallLow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalDoorway") {
        set_generated_id(randomIdGenerator());
        addModel(MetalDoorway, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalWallFrame") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWallFrame, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalWindow") {
        set_generated_id(randomIdGenerator());
        addModel(MetalWindow, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalStairsLShape") {
        set_generated_id(randomIdGenerator());
        addModel(MetalStairsLShape, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalStairsUShape") {
        set_generated_id(randomIdGenerator());
        addModel(MetalStairsUShape, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFloorSquare") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorSquare, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFloorTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorTriangle, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFloorFrameSquare") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorFrameSquare, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalFloorFrameTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(MetalFloorFrameTriangle, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalRoofSquare") {
        set_generated_id(randomIdGenerator());
        addModel(MetalRoofSquare, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalRoofTriangle") {
        set_generated_id(randomIdGenerator());
        addModel(MetalRoofTriangle, generated_id, default_object_rotation);
      } else if (model_type_to_create === "MetalDoor") {
        set_generated_id(randomIdGenerator());
        addModel(MetalDoor, generated_id, default_object_rotation);
      } else if (model_type_to_create === "GarageDoor") {
        set_generated_id(randomIdGenerator());
        addModel(GarageDoor, generated_id, default_object_rotation);
      }

      // windows
      else if (model_type_to_create === "MetalVerticalEmbrasure") {
        set_generated_id(randomIdGenerator());
        addModel(MetalVerticalEmbrasure, generated_id, default_object_rotation);
      } else if (model_type_to_create === "StrenghtenedGlassWindow") {
        set_generated_id(randomIdGenerator());
        addModel(StrenghtenedGlassWindow, generated_id, default_object_rotation);
      }

      //miscs
      else if (model_type_to_create === "ToolCupboard") {
        set_generated_id(randomIdGenerator());
        addModel(ToolCupboard, generated_id, default_object_rotation);
      } else if (model_type_to_create === "WoodStorageBox") {
        set_generated_id(randomIdGenerator());
        addModel(WoodStorageBox, generated_id, default_object_rotation);
      } else if (model_type_to_create === "LargeWoodBox") {
        set_generated_id(randomIdGenerator());
        addModel(LargeWoodBox, generated_id, default_object_rotation);
      } else if (model_type_to_create === "Furnace") {
        set_generated_id(randomIdGenerator());
        addModel(Furnace, generated_id, default_object_rotation);
      } else if (model_type_to_create === "WorkbenchT3") {
        set_generated_id(randomIdGenerator());
        addModel(WorkbenchT3, generated_id, default_object_rotation);
      }
    }
  }

  function CaptureMouseCanvasDrag(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const currentTimestamp = Date.now();
    const time_since_last_execution = currentTimestamp - canvas_mouse_drag_last_execution_time;

    canvas_mouse_drag_last_execution_time = currentTimestamp;

    if (event.buttons === 1 && time_since_last_execution >= 30) {
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

  function ChangeModelElevationValue(value: number) {
    set_default_model_height_position(default_model_height_position + value);
  }

  function HandlePivotStateSwitch() {
    set_pivot_controls_state(!pivot_controls_state);
  }

  function HandlePivotXAxisStateSwitch() {
    if (pivot_controls_state) {
      set_pivot_x_axis_state(!pivot_x_axis_state);
    }
  }

  function HandlePivotYAxisStateSwitch() {
    if (pivot_controls_state) {
      set_pivot_y_axis_state(!pivot_y_axis_state);
    }
  }

  function HandlePivotZAxisStateSwitch() {
    if (pivot_controls_state) {
      set_pivot_z_axis_state(!pivot_z_axis_state);
    }
  }

  function ChangeDefaultModelRotationRight() {
    const newRotation = default_model_rotation - object_rotation_degree * (Math.PI / 180);
    set_default_model_rotation(newRotation);
  }

  function ChangeDefaultModelRotationLeft() {
    const newRotation = default_model_rotation + object_rotation_degree * (Math.PI / 180);
    set_default_model_rotation(newRotation);
  }

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
    if (page_mode === "edit" && !model_creation_state) {
      {
        if (keyboard_input === "W") {
          if (camera_3d_direction === "north") {
            moveSelectedObjectZ(-1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObjectZ(+1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObjectX(+1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObjectX(-1);
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObjectY(+1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectZ(-1);
          }
        } else if (keyboard_input === "A") {
          if (camera_3d_direction === "north") {
            moveSelectedObjectX(-1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObjectX(+1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObjectZ(-1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObjectZ(+1);
          } else if (camera_2d_direction === "left") {
            moveSelectedObjectZ(-1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObjectZ(+1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObjectX(-1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObjectX(+1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectX(-1);
          }
        } else if (keyboard_input === "S") {
          if (camera_3d_direction === "north") {
            moveSelectedObjectZ(+1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObjectZ(-1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObjectX(-1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObjectX(+1);
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObjectY(-1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectZ(+1);
          }
        } else if (keyboard_input === "D") {
          if (camera_3d_direction === "north") {
            moveSelectedObjectX(+1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObjectX(-1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObjectZ(+1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObjectZ(-1);
          } else if (camera_2d_direction === "left") {
            moveSelectedObjectZ(+1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObjectZ(-1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObjectX(+1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObjectX(-1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectX(+1);
          }
        } else if (keyboard_input === "Q") {
          RotateSelectedObject(selected_model_id, "right");
        } else if (keyboard_input === "E") {
          RotateSelectedObject(selected_model_id, "left");
        } else if (keyboard_input === "SPACE") {
          moveSelectedObjectY(+1);
        } else if (keyboard_input === "CTRL") {
          moveSelectedObjectY(-1);
        }
      }
    } else if (page_mode === "edit" && model_creation_state) {
      if (keyboard_input === "Q") {
        ChangeDefaultModelRotationLeft();
        RotateSelectedObject(selected_model_id, "left");
      } else if (keyboard_input === "E") {
        ChangeDefaultModelRotationRight();
        RotateSelectedObject(selected_model_id, "right");
      }
    }
  }, [key_press_trigger]);

  useEffect(() => {
    if (page_mode === "edit" && !model_creation_state) {
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
          } else if (camera_2d_direction === "left") {
            moveSelectedObjectZ(-1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObjectZ(+1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObjectX(-1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObjectX(+1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectX(-1);
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
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObjectY(+1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectZ(-1);
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
          } else if (camera_2d_direction === "left") {
            moveSelectedObjectZ(+1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObjectZ(-1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObjectX(+1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObjectX(-1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectX(+1);
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
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObjectY(-1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObjectZ(+1);
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
      set_model_foundation_elevation(0);
    } else {
      set_model_foundation_elevation(0.05);
    }
  }, [model_type_to_create]);

  useEffect(() => {
    if (
      model_type_to_create === "StoneFoundationSquareHigh" ||
      model_type_to_create === "StoneFoundationSquareMid" ||
      model_type_to_create === "StoneFoundationSquareLow" ||
      model_type_to_create === "MetalFoundationSquareHigh" ||
      model_type_to_create === "MetalFoundationSquareMid" ||
      model_type_to_create === "MetalFoundationSquareLow" ||
      model_type_to_create === "StoneFloorSquare" ||
      model_type_to_create === "StoneFloorFrameSquare" ||
      model_type_to_create === "MetalFloorSquare" ||
      model_type_to_create === "MetalFloorFrameSquare" ||
      model_type_to_create === "StoneStairsLShape" ||
      model_type_to_create === "StoneStairsUShape" ||
      model_type_to_create === "MetalStairsLShape" ||
      model_type_to_create === "MetalStairsUShape"
    ) {
      set_model_prop("square_foundation_prop");
    } else if (
      model_type_to_create === "StoneFoundationTriangleHigh" ||
      model_type_to_create === "StoneFoundationTriangleMid" ||
      model_type_to_create === "StoneFoundationTriangleLow" ||
      model_type_to_create === "MetalFoundationTriangleHigh" ||
      model_type_to_create === "MetalFoundationTriangleMid" ||
      model_type_to_create === "MetalFoundationTriangleLow" ||
      model_type_to_create === "StoneFloorTriangle" ||
      model_type_to_create === "StoneFloorFrameTriangle" ||
      model_type_to_create === "MetalFloorTriangle" ||
      model_type_to_create === "MetalFloorFrameTriangle"
    ) {
      set_model_prop("triangle_foundation_prop");
    } else if (
      model_type_to_create === "StoneWallHigh" ||
      model_type_to_create === "StoneWallMid" ||
      model_type_to_create === "StoneWallLow" ||
      model_type_to_create === "StoneDoorway" ||
      model_type_to_create === "StoneWindow" ||
      model_type_to_create === "StoneRoofSquare" ||
      model_type_to_create === "StoneRoofTriangle" ||
      model_type_to_create === "MetalWallHigh" ||
      model_type_to_create === "MetalWallMid" ||
      model_type_to_create === "MetalWallLow" ||
      model_type_to_create === "MetalDoorway" ||
      model_type_to_create === "MetalWindow" ||
      model_type_to_create === "StoneWallFrame" ||
      model_type_to_create === "MetalWallFrame" ||
      model_type_to_create === "MetalRoofSquare" ||
      model_type_to_create === "MetalRoofTriangle" ||
      model_type_to_create === "GarageDoor" ||
      model_type_to_create === "MetalVerticalEmbrasure" ||
      model_type_to_create === "StrenghtenedGlassWindow"
    ) {
      set_model_prop("wall_prop");
    } else if (model_type_to_create === "MetalDoor") {
      set_model_prop("door_prop");
    } else if (model_type_to_create === "ToolCupboard" || model_type_to_create === "Furnace") {
      set_model_prop("tool_cupboard_prop");
    } else if (
      model_type_to_create === "WoodStorageBox" ||
      model_type_to_create === "LargeWoodBox" ||
      model_type_to_create === "WorkbenchT3"
    ) {
      set_model_prop("storage_prop");
    }
  }, [model_type_to_create]);

  function CreatePrebuildBase() {
    const rotation_30deg = THREE.MathUtils.degToRad(30);
    const rotation_60deg = THREE.MathUtils.degToRad(60);
    const rotation_120deg = THREE.MathUtils.degToRad(120);
    const rotation_150deg = THREE.MathUtils.degToRad(150);
    const rotation_210deg = THREE.MathUtils.degToRad(210);
    const rotation_240deg = THREE.MathUtils.degToRad(240);
    const rotation_300deg = THREE.MathUtils.degToRad(300);
    const rotation_330deg = THREE.MathUtils.degToRad(330);

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T1"]: {
        position: { x: -1, z: 1, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));

    addPrebuild(StoneFoundationSquareMid, "T1", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T2"]: {
        position: { x: 1, z: 1, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationSquareMid, "T2", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T3"]: {
        position: { x: -1, z: 3, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationSquareMid, "T3", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T4"]: {
        position: { x: 1, z: 3, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationSquareMid, "T4", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T5"]: {
        position: { x: 1, z: 4, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T5", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T6"]: {
        position: { x: -1, z: 4, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T6", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T7"]: {
        position: { x: 0, z: 5.725, y: 0 },
        rotation: new THREE.Euler(0, (Math.PI / 2) * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T7", new THREE.Euler(0, (Math.PI / 2) * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T8"]: {
        position: { x: 0, z: -1.725, y: 0 },
        rotation: new THREE.Euler(0, 0, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T8", new THREE.Euler(0, 0, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T9"]: {
        position: { x: -1, z: 0, y: 0 },
        rotation: new THREE.Euler(0, (Math.PI / 2) * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T9", new THREE.Euler(0, (Math.PI / 2) * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T10"]: {
        position: { x: 1, z: 0, y: 0 },
        rotation: new THREE.Euler(0, (Math.PI / 2) * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T10", new THREE.Euler(0, (Math.PI / 2) * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T11"]: {
        position: { x: 2, z: 3, y: 0 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T11", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T12"]: {
        position: { x: 2, z: 1, y: 0 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T12", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T13"]: {
        position: { x: 3.725, z: 2, y: 0 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T13", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T14"]: {
        position: { x: -2, z: 1, y: 0 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T14", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T15"]: {
        position: { x: -2, z: 1, y: 0 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T15", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T16"]: {
        position: { x: -2, z: 3, y: 0 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T16", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T17"]: {
        position: { x: -3.725, z: 2, y: 0 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFoundationTriangleMid, "T17", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T18"]: {
        position: { x: -2, z: 1, y: 1 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T18", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T19"]: {
        position: { x: -2, z: 3, y: 1 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T19", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T20"]: {
        position: { x: 1, z: 4, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T20", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T21"]: {
        position: { x: -1, z: 4, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneDoorway, "T21", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T22"]: {
        position: { x: 2, z: 3, y: 1 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T22", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T23"]: {
        position: { x: 2, z: 1, y: 1 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T23", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T24"]: {
        position: { x: -1, z: 0, y: 1 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T24", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T25"]: {
        position: { x: 1, z: 0, y: 1 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T25", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T26"]: {
        position: { x: -1, z: 2, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallFrame, "T26", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T27"]: {
        position: { x: 1, z: 2, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallFrame, "T27", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T28"]: {
        position: { x: 0, z: 1, y: 1 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T28", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T29"]: {
        position: { x: 0, z: 3, y: 1 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallFrame, "T29", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T30"]: {
        position: { x: 0, z: 3, y: 1 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(GarageDoor, "T30", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T31"]: {
        position: { x: -1.5, z: 4.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_120deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T31", new THREE.Euler(0, rotation_120deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T32"]: {
        position: { x: -0.55, z: 4.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_240deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneDoorway, "T32", new THREE.Euler(0, rotation_240deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T33"]: {
        position: { x: 0, z: 5.725, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWindow, "T33", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T34"]: {
        position: { x: 1.5, z: 4.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_240deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneDoorway, "T34", new THREE.Euler(0, rotation_240deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T35"]: {
        position: { x: 1.5, z: 4.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_240deg, 0, "XYZ"),
      },
    }));
    addPrebuild(MetalDoor, "T35", new THREE.Euler(0, rotation_240deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T36"]: {
        position: { x: -0.55, z: 4.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_240deg, 0, "XYZ"),
      },
    }));
    addPrebuild(MetalDoor, "T36", new THREE.Euler(0, rotation_240deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T37"]: {
        position: { x: -1, z: 4, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(MetalDoor, "T37", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T38"]: {
        position: { x: -1, z: 2, y: 1 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(GarageDoor, "T38", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T39"]: {
        position: { x: 1, z: 2, y: 1 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(GarageDoor, "T39", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T40"]: {
        position: { x: -1.5, z: -0.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_60deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T40", new THREE.Euler(0, rotation_60deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T41"]: {
        position: { x: 1.5, z: -0.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_300deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T41", new THREE.Euler(0, rotation_300deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T42"]: {
        position: { x: 0.55, z: -0.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_60deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T42", new THREE.Euler(0, rotation_60deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T43"]: {
        position: { x: -0.55, z: -0.85, y: 1 },
        rotation: new THREE.Euler(0, rotation_300deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T43", new THREE.Euler(0, rotation_300deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T44"]: {
        position: { x: 0, z: -1.725, y: 1 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T44", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T45"]: {
        position: { x: 3.725, z: 2, y: 1 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T45", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T46"]: {
        position: { x: 2.825, z: 2.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_330deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T46", new THREE.Euler(0, rotation_330deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T47"]: {
        position: { x: 2.825, z: 0.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_330deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T47", new THREE.Euler(0, rotation_330deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T48"]: {
        position: { x: 2.825, z: 3.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_210deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T48", new THREE.Euler(0, rotation_210deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T49"]: {
        position: { x: 2.825, z: 1.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_210deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T49", new THREE.Euler(0, rotation_210deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T50"]: {
        position: { x: -2.85, z: 0.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_30deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T50", new THREE.Euler(0, rotation_30deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T51"]: {
        position: { x: -2.85, z: 2.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_30deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T51", new THREE.Euler(0, rotation_30deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T52"]: {
        position: { x: -2.85, z: 3.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_150deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T52", new THREE.Euler(0, rotation_150deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T53"]: {
        position: { x: -2.85, z: 1.5, y: 1 },
        rotation: new THREE.Euler(0, rotation_150deg, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T53", new THREE.Euler(0, rotation_150deg, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T54"]: {
        position: { x: -3.725, z: 2, y: 1 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneWallHigh, "T54", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T55"]: {
        position: { x: 0.35, z: 1.3, y: 1.05 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(LargeWoodBox, "T55", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T56"]: {
        position: { x: 0.4, z: 0.35, y: 1.05 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(ToolCupboard, "T56", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T57"]: {
        position: { x: 1.4, z: 0.4, y: 1.05 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(LargeWoodBox, "T57", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T58"]: {
        position: { x: 1.35, z: 1.675, y: 1.05 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(LargeWoodBox, "T58", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T59"]: {
        position: { x: 1.6, z: 2.4, y: 1.05 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(Furnace, "T59", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T60"]: {
        position: { x: 1.6, z: 3.1, y: 1.05 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(Furnace, "T60", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T61"]: {
        position: { x: 1.6, z: 3.7, y: 1.05 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(WoodStorageBox, "T61", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T62"]: {
        position: { x: -1.25, z: 0.325, y: 1.05 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(WoodStorageBox, "T62", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T64"]: {
        position: { x: -0.275, z: 0.325, y: 1.05 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(WoodStorageBox, "T64", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T65"]: {
        position: { x: 0, z: 5.725, y: 1 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StrenghtenedGlassWindow, "T65", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T66"]: {
        position: { x: -1.25, z: 0.35, y: 1 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(WorkbenchT3, "T66", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T67"]: {
        position: { x: 2, z: 1, y: 3 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T67", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T68"]: {
        position: { x: 2, z: 3, y: 3 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T68", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T69"]: {
        position: { x: 3.725, z: 2, y: 3 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T69", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T70"]: {
        position: { x: -2, z: 1, y: 3 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T70", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T71"]: {
        position: { x: -2, z: 3, y: 3 },
        rotation: new THREE.Euler(0, -Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T71", new THREE.Euler(0, -Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T72"]: {
        position: { x: -3.725, z: 2, y: 3 },
        rotation: new THREE.Euler(0, Math.PI / 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T72", new THREE.Euler(0, Math.PI / 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T73"]: {
        position: { x: 0, z: -1.7, y: 3 },
        rotation: new THREE.Euler(0, Math.PI * 2, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T73", new THREE.Euler(0, Math.PI * 2, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T74"]: {
        position: { x: 1, z: 0, y: 3 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T74", new THREE.Euler(0, Math.PI, 0));

    ///

    setModelsTransforms((prevTransforms) => ({
      ...prevTransforms,
      ["T75"]: {
        position: { x: -1, z: 0, y: 3 },
        rotation: new THREE.Euler(0, Math.PI, 0, "XYZ"),
      },
    }));
    addPrebuild(StoneFloorTriangle, "T75", new THREE.Euler(0, Math.PI, 0));
  }

  useEffect(() => {
    if (!prebuild_created.current) {
      CreatePrebuildBase();
      prebuild_created.current = true;
    }
  }, []);

  useEffect(() => {
    dispatch(set_selected_model_id(""));
  }, [model_creation_state]);

  return (
    <>
      {page_mode === "edit" && (
        <>
          <div className="pivot_controls_container_description">
            pivot controls {pivot_controls_state ? "(enabled)" : "(disabled)"}
          </div>
          <div className="pivot_controls_container">
            <div className="pivot_controls_button pivot_controls_left" onClick={HandlePivotStateSwitch}>
              <FontAwesomeIcon
                icon={faUpDownLeftRight}
                size="xl"
                style={{ color: !pivot_controls_state ? "#bbbbbb" : "#ffd5b3" }}
              />
            </div>
            <button
              className={
                !pivot_controls_state
                  ? "pivot_controls_button"
                  : pivot_x_axis_state
                  ? "pivot_controls_button pivot_controls_button_enabled"
                  : "pivot_controls_button pivot_controls_button_active"
              }
              onClick={HandlePivotXAxisStateSwitch}
            >
              X
            </button>
            <button
              className={
                !pivot_controls_state
                  ? "pivot_controls_button"
                  : pivot_y_axis_state
                  ? "pivot_controls_button pivot_controls_button_enabled"
                  : "pivot_controls_button pivot_controls_button_active"
              }
              onClick={HandlePivotYAxisStateSwitch}
            >
              Y
            </button>
            <button
              className={
                !pivot_controls_state
                  ? "pivot_controls_button pivot_controls_right"
                  : pivot_z_axis_state
                  ? "pivot_controls_button pivot_controls_button_enabled pivot_controls_right"
                  : "pivot_controls_button pivot_controls_button_active pivot_controls_right"
              }
              onClick={HandlePivotZAxisStateSwitch}
            >
              Z
            </button>
          </div>
        </>
      )}

      {page_mode === "edit" && (
        <>
          <div className="object_elevation_container_description">build on height level:</div>
          <div className="object_elevation_container">
            <button className="elevation_button elevation_button_left" onClick={() => ChangeModelElevationValue(-1)}>
              <FontAwesomeIcon icon={faMinus} size="1x" style={{ color: "black" }} />
            </button>
            <div className="elevation_input_field">{default_model_height_position / 2}</div>

            <button className="elevation_button elevation_button_right" onClick={() => ChangeModelElevationValue(+1)}>
              <FontAwesomeIcon icon={faPlus} size="1x" style={{ color: "black" }} />
            </button>
          </div>
        </>
      )}
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
          <CanvasLights />
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
                visible={selected_model_id === id && page_mode === "edit" ? true : false}
                key={id}
                scale={selected_model_id === id && pivot_controls_state && pivot_controls_state ? 3 : 0}
                lineWidth={0}
                depthTest={false}
                activeAxes={[pivot_x_axis_state, pivot_y_axis_state, pivot_z_axis_state]}
                axisColors={["orange", "yellow", "orange"]}
                onDragStart={() => PivotDragStart(id)}
                onDragEnd={() => PivotDragEnd()}
              >
                <mesh
                  position={[modelTransform.position.x, modelTransform.position.y, modelTransform.position.z]}
                  rotation={modelTransform.rotation}
                  key={id}
                  onClick={(e) => {
                    e.stopPropagation(), MeshOnClick(id);
                  }}
                  onPointerMissed={() => MeshOnMissed()}
                >
                  <ModelComponent />
                </mesh>
              </PivotControls>
            );
          })}
          {page_mode === "edit" && model_creation_state && (
            <>
              {model_prop === "square_foundation_prop" && (
                <Box
                  position={[
                    mouse_canvas_x_coordinate,
                    default_model_height_position / 2 + 0.0425,
                    mouse_canvas_z_coordinate,
                  ]}
                  scale={[2, default_model_height_position + 0.08, 2]}
                >
                  <meshStandardMaterial
                    color={"#ffa463"}
                    emissive={"rgb(255, 206, 166)"}
                    emissiveIntensity={bloom_state ? 3 : 0}
                  />
                </Box>
              )}
              {model_prop === "triangle_foundation_prop" && (
                <>
                  <TriangleProp
                    position={[
                      mouse_canvas_x_coordinate,
                      default_model_height_position / 100,
                      mouse_canvas_z_coordinate,
                    ]}
                    rotation={[0, default_model_rotation, 0]}
                    scale={[1, default_model_height_position * 100 + 10, 1]}
                  ></TriangleProp>
                </>
              )}
              {model_prop === "wall_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate,
                    ]}
                    rotation={[0, default_model_rotation, 0]}
                    scale={[2, default_model_height_position + 0.08, 0.1]}
                  >
                    <meshStandardMaterial
                      transparent
                      opacity={1}
                      color={"#ffa463"}
                      emissive={"rgb(255, 206, 166)"}
                      emissiveIntensity={bloom_state ? 3 : 0}
                    />
                  </Box>
                  <ArrowProp
                    position={[mouse_canvas_x_coordinate, default_model_height_position, mouse_canvas_z_coordinate]}
                    rotation={[0, default_model_rotation, 0]}
                    scale={[2, 12, 1]}
                  ></ArrowProp>
                </>
              )}
              {model_prop === "door_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate,
                    ]}
                    rotation={[0, default_model_rotation, 0]}
                    scale={[1, default_model_height_position + 0.08, 0.1]}
                  >
                    <meshStandardMaterial
                      transparent
                      opacity={1}
                      color={"#ffa463"}
                      emissive={"rgb(255, 206, 166)"}
                      emissiveIntensity={bloom_state ? 3 : 0}
                    />
                  </Box>
                  <ArrowProp
                    position={[mouse_canvas_x_coordinate, default_model_height_position, mouse_canvas_z_coordinate]}
                    rotation={[0, default_model_rotation, 0]}
                    scale={[2, 12, 1]}
                  ></ArrowProp>
                </>
              )}

              {model_prop === "storage_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate,
                    ]}
                    scale={[1.25, default_model_height_position + 0.08, 0.75]}
                  >
                    <meshStandardMaterial
                      transparent
                      opacity={1}
                      color={"#ffa463"}
                      emissive={"rgb(255, 206, 166)"}
                      emissiveIntensity={bloom_state ? 3 : 0}
                    />
                  </Box>
                  <ArrowProp
                    position={[mouse_canvas_x_coordinate, default_model_height_position, mouse_canvas_z_coordinate]}
                    rotation={[0, default_model_rotation + Math.PI, 0]}
                    scale={[2, 12, 1]}
                  ></ArrowProp>
                </>
              )}
              {model_prop === "tool_cupboard_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate,
                    ]}
                    scale={[0.75, default_model_height_position + 0.08, 0.75]}
                  >
                    <meshStandardMaterial
                      transparent
                      opacity={1}
                      color={"#ffa463"}
                      emissive={"rgb(255, 206, 166)"}
                      emissiveIntensity={bloom_state ? 3 : 0}
                    />
                  </Box>
                  <ArrowProp
                    position={[mouse_canvas_x_coordinate, default_model_height_position, mouse_canvas_z_coordinate]}
                    rotation={[0, default_model_rotation + Math.PI, 0]}
                    scale={[2, 12, 1]}
                  ></ArrowProp>
                </>
              )}
            </>
          )}
          {!performance_mode && <Postprocessing />}
          {HDR_state && <Environment files="./hdr/HDR2k.hdr" background blur={0} />}
        </Canvas>
      </div>
      {active_models_state && <CanvasModelsList models={models} />}
    </>
  );
}
