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

import { Model as TrianglePropSolid } from "../models/TrianglePropSolid.tsx";
import { Model as TrianglePropWireframe } from "../models/TrianglePropWireframe.tsx";
import { Model as ArrowProp } from "../models/ArrowProp.tsx";

import { AudioPlayer } from "./AudioPlayer.tsx";
import build_sound from "../../audio/build_sound.mp3";
import controls_sound from "../../audio/controls_sound.mp3";
import rotation_sound from "../../audio/rotation_sound.mp3";
import buttons_sound from "../../audio/buttons_sound.mp3";

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
import { Model as SleepingBag } from "../models/SleepingBag.tsx";

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
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);
  const performance_mode = useSelector((state: RootState) => state.pageSettings.performance_mode); //prettier-ignore
  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const active_models_state = useSelector((state: RootState) => state.pageSettings.active_models_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore
  const HDR_state = useSelector((state: RootState) => state.pageSettings.HDR_state); //prettier-ignore
  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [models, setModels] = useState<ModelType[]>([]);
  const [modelsData, setModelsData] = useState<{[id: string]: { position: { x: number; z: number; y: number }; rotation: THREE.Euler }}>({}); //prettier-ignore
  const [model_x_position, set_model_x_position] = useState<number>(0);
  const [model_z_position, set_model_z_position] = useState<number>(0);
  const [model_y_position, set_model_y_position] = useState<number>(0);

  const [generated_id, set_generated_id] = useState<string>(randomIdGenerator());
  const [mirror_x_generated_id, set_mirror_x_generated_id] = useState<string>(randomIdGenerator());
  const [mirror_z_generated_id, set_mirror_z_generated_id] = useState<string>(randomIdGenerator());
  const [mirror_xz_generated_id, set_mirror_xz_generated_id] = useState<string>(randomIdGenerator());

  const [model_prop, set_model_prop] = useState<string>("none");

  const [model_foundation_elevation, set_model_foundation_elevation] = useState<number>(0);
  const [default_model_height_position, set_default_model_height_position] = useState<number>(0);
  const [pivot_controls_state, set_pivot_controls_state] = useState<boolean>(false);
  const [pivot_x_axis_state, set_pivot_x_axis_state] = useState<boolean>(false);
  const [pivot_y_axis_state, set_pivot_y_axis_state] = useState<boolean>(false);
  const [pivot_z_axis_state, set_pivot_z_axis_state] = useState<boolean>(false);
  const default_object_rotation = new THREE.Euler(0, 0, 0);
  const [modified_model_rotation, set_modified_model_rotation] = useState<number>(0);
  const [model_x_position_offset, set_model_x_position_offset] = useState<number>(0);
  const [model_z_position_offset, set_model_z_position_offset] = useState<number>(0);

  const [model_x_mirror_x_position, set_model_x_mirror_x_position] = useState<number>(0);
  const [model_x_mirror_z_position, set_model_x_mirror_z_position] = useState<number>(0);

  const [model_z_mirror_x_position, set_model_z_mirror_x_position] = useState<number>(0);
  const [model_z_mirror_z_position, set_model_z_mirror_z_position] = useState<number>(0);

  const [model_xz_mirror_x_position, set_model_xz_mirror_x_position] = useState<number>(0);
  const [model_xz_mirror_z_position, set_model_xz_mirror_z_position] = useState<number>(0);

  const [symmetry_x_enabled, set_symmetry_x_enabled] = useState<boolean>(false);
  const [symmetry_z_enabled, set_symmetry_z_enabled] = useState<boolean>(false);

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
      if (audio) {
        AudioPlayer(build_sound);
      }
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

  // ------------------------- Canvas grid coordinates + models position -------------------------

  // calculating the mouse cursor and invisible grid floor intersection point
  // to create a X+Z coordinates at which models will be placed
  // assign a default, 3x mirrored values for symmetrical objects

  function CanvasMouseOverIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    const currentTimestamp = Date.now();
    const canvas_mouse_drag_time_since_last_execution = currentTimestamp - canvas_mouse_over_last_execution_time;

    if (
      page_mode === "edit" &&
      camera_type === "camera_3d" &&
      model_creation_state &&
      canvas_mouse_drag_time_since_last_execution >= 30
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
        set_model_x_position(mouse_canvas_x_coordinate);
        set_model_z_position(mouse_canvas_z_coordinate);
        set_model_y_position(default_model_height_position + model_foundation_elevation);

        set_model_x_mirror_x_position(-mouse_canvas_x_coordinate + model_x_position_offset);
        set_model_x_mirror_z_position(mouse_canvas_z_coordinate + model_x_position_offset);

        set_model_z_mirror_x_position(mouse_canvas_x_coordinate + model_x_position_offset);
        set_model_z_mirror_z_position(-mouse_canvas_z_coordinate + model_x_position_offset);

        set_model_xz_mirror_x_position(-mouse_canvas_x_coordinate + model_x_position_offset);
        set_model_xz_mirror_z_position(-mouse_canvas_z_coordinate + model_x_position_offset);
      }
    } else return;
  }

  // --------------------------------------------------

  function AddCanvasModel() {
    const modelTypeMap = {
      // Stone models
      StoneFoundationSquareHigh: StoneFoundationSquareHigh,
      StoneFoundationSquareMid: StoneFoundationSquareMid,
      StoneFoundationSquareLow: StoneFoundationSquareLow,
      StoneFoundationTriangleHigh: StoneFoundationTriangleHigh,
      StoneFoundationTriangleMid: StoneFoundationTriangleMid,
      StoneFoundationTriangleLow: StoneFoundationTriangleLow,
      StoneWallHigh: StoneWallHigh,
      StoneWallMid: StoneWallMid,
      StoneWallLow: StoneWallLow,
      StoneDoorway: StoneDoorway,
      StoneWallFrame: StoneWallFrame,
      StoneWindow: StoneWindow,
      StoneStairsLShape: StoneStairsLShape,
      StoneStairsUShape: StoneStairsUShape,
      StoneFloorSquare: StoneFloorSquare,
      StoneFloorTriangle: StoneFloorTriangle,
      StoneFloorFrameSquare: StoneFloorFrameSquare,
      StoneFloorFrameTriangle: StoneFloorFrameTriangle,
      StoneRoofSquare: StoneRoofSquare,
      StoneRoofTriangle: StoneRoofTriangle,

      // Metal models
      MetalFoundationSquareHigh: MetalFoundationSquareHigh,
      MetalFoundationSquareMid: MetalFoundationSquareMid,
      MetalFoundationSquareLow: MetalFoundationSquareLow,
      MetalFoundationTriangleHigh: MetalFoundationTriangleHigh,
      MetalFoundationTriangleMid: MetalFoundationTriangleMid,
      MetalFoundationTriangleLow: MetalFoundationTriangleLow,
      MetalWallHigh: MetalWallHigh,
      MetalWallMid: MetalWallMid,
      MetalWallLow: MetalWallLow,
      MetalDoorway: MetalDoorway,
      MetalWallFrame: MetalWallFrame,
      MetalWindow: MetalWindow,
      MetalStairsLShape: MetalStairsLShape,
      MetalStairsUShape: MetalStairsUShape,
      MetalFloorSquare: MetalFloorSquare,
      MetalFloorTriangle: MetalFloorTriangle,
      MetalFloorFrameSquare: MetalFloorFrameSquare,
      MetalFloorFrameTriangle: MetalFloorFrameTriangle,
      MetalRoofSquare: MetalRoofSquare,
      MetalRoofTriangle: MetalRoofTriangle,
      MetalDoor: MetalDoor,
      GarageDoor: GarageDoor,

      // Windows
      MetalVerticalEmbrasure: MetalVerticalEmbrasure,
      StrengthenedGlassWindow: StrenghtenedGlassWindow,

      // Miscs
      ToolCupboard: ToolCupboard,
      WoodStorageBox: WoodStorageBox,
      LargeWoodBox: LargeWoodBox,
      Furnace: Furnace,
      WorkbenchT3: WorkbenchT3,
      SleepingBag: SleepingBag,
    };

    if (page_mode === "edit" && camera_type === "camera_3d" && model_creation_state) {
      const modelClass = modelTypeMap[model_type_to_create as keyof typeof modelTypeMap];

      if (modelClass) {
        setModelsData((prevTransforms) => ({
          ...prevTransforms,
          [generated_id]: {
            position: {
              x: model_x_position + model_x_position_offset,
              z: model_z_position + model_z_position_offset,
              y: model_y_position,
            },
            rotation: new THREE.Euler(0, modified_model_rotation, 0, "XYZ"),
          },
        }));

        set_generated_id(randomIdGenerator());
        addModel(modelClass, generated_id, default_object_rotation);

        /////////////

        if (symmetry_x_enabled) {
          setTimeout(() => {
            setModelsData((prevTransforms) => ({
              ...prevTransforms,
              [mirror_x_generated_id]: {
                position: {
                  x: model_x_mirror_x_position,
                  z: model_x_mirror_z_position,
                  y: model_y_position,
                },
                rotation: new THREE.Euler(0, modified_model_rotation, 0, "XYZ"),
              },
            }));

            set_mirror_x_generated_id(randomIdGenerator());
            addModel(modelClass, mirror_x_generated_id, default_object_rotation);
          }, 50);
        }

        if (symmetry_z_enabled) {
          setTimeout(() => {
            setModelsData((prevTransforms) => ({
              ...prevTransforms,
              [mirror_z_generated_id]: {
                position: {
                  x: model_z_mirror_x_position,
                  z: model_z_mirror_z_position,
                  y: model_y_position,
                },
                rotation: new THREE.Euler(0, modified_model_rotation, 0, "XYZ"),
              },
            }));

            set_mirror_z_generated_id(randomIdGenerator());
            addModel(modelClass, mirror_z_generated_id, default_object_rotation);
          }, 100);
        }

        if (symmetry_x_enabled && symmetry_z_enabled) {
          setTimeout(() => {
            setModelsData((prevTransforms) => ({
              ...prevTransforms,
              [mirror_xz_generated_id]: {
                position: {
                  x: model_xz_mirror_x_position,
                  z: model_xz_mirror_z_position,
                  y: model_y_position,
                },
                rotation: new THREE.Euler(0, modified_model_rotation, 0, "XYZ"),
              },
            }));

            set_mirror_xz_generated_id(randomIdGenerator());
            addModel(modelClass, mirror_xz_generated_id, default_object_rotation);
          }, 150);
        }
      }
    }
  }

  function CaptureMouseCanvasDrag(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const currentTimestamp = Date.now();
    const canvas_mouse_drag_time_since_last_execution = currentTimestamp - canvas_mouse_drag_last_execution_time;

    canvas_mouse_drag_last_execution_time = currentTimestamp;

    if (event.buttons === 1 && canvas_mouse_drag_time_since_last_execution >= 30) {
      set_prevent_actions_after_canvas_drag("canvas_drag");
    }
  }

  const RotateSelectedObject = (objectId: string, direction: string) => {
    setModelsData((prevTransforms) => {
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
    setModelsData((prevTransforms) => {
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
    setModelsData((prevTransforms) => {
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
    setModelsData((prevTransforms) => {
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
    const new_default_model_height_position = default_model_height_position + value;

    if (new_default_model_height_position >= 0) {
      set_default_model_height_position(new_default_model_height_position);

      if (audio) {
        AudioPlayer(buttons_sound);
      }
    }
  }

  function HandlePivotStateSwitch() {
    set_pivot_controls_state(!pivot_controls_state);
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandlePivotXAxisStateSwitch() {
    if (pivot_controls_state) {
      set_pivot_x_axis_state(!pivot_x_axis_state);
      if (audio) {
        AudioPlayer(buttons_sound);
      }
    }
  }

  function HandlePivotYAxisStateSwitch() {
    if (pivot_controls_state) {
      set_pivot_y_axis_state(!pivot_y_axis_state);
      if (audio) {
        AudioPlayer(buttons_sound);
      }
    }
  }

  function HandlePivotZAxisStateSwitch() {
    if (pivot_controls_state) {
      set_pivot_z_axis_state(!pivot_z_axis_state);
      if (audio) {
        AudioPlayer(buttons_sound);
      }
    }
  }

  function ChangeDefaultModelRotationRight() {
    const newRotation = modified_model_rotation - object_rotation_degree * (Math.PI / 180);
    set_modified_model_rotation(newRotation);
  }

  function ChangeDefaultModelRotationLeft() {
    const newRotation = modified_model_rotation + object_rotation_degree * (Math.PI / 180);
    set_modified_model_rotation(newRotation);
  }

  // ------------------------- Prebuild Base -------------------------
  // Adding a prebuild base to the canvas

  function CreatePrebuildBase() {
    const rotation_30deg = THREE.MathUtils.degToRad(30);
    const rotation_60deg = THREE.MathUtils.degToRad(60);
    const rotation_120deg = THREE.MathUtils.degToRad(120);
    const rotation_150deg = THREE.MathUtils.degToRad(150);
    const rotation_210deg = THREE.MathUtils.degToRad(210);
    const rotation_240deg = THREE.MathUtils.degToRad(240);
    const rotation_300deg = THREE.MathUtils.degToRad(300);
    const rotation_330deg = THREE.MathUtils.degToRad(330);

    const prebuildObjects = [
      { name: "T1", position: { x: -1, z: 1, y: 0 }, rotation: 0, model: StoneFoundationSquareMid },
      { name: "T2", position: { x: 1, z: 1, y: 0 }, rotation: 0, model: StoneFoundationSquareMid },
      { name: "T3", position: { x: -1, z: 3, y: 0 }, rotation: 0, model: StoneFoundationSquareMid },
      { name: "T4", position: { x: 1, z: 3, y: 0 }, rotation: 0, model: StoneFoundationSquareMid },
      { name: "T5", position: { x: 1, z: 4, y: 0 }, rotation: 0, model: StoneFoundationTriangleMid },
      { name: "T6", position: { x: -1, z: 4, y: 0 }, rotation: 0, model: StoneFoundationTriangleMid },
      { name: "T7", position: { x: 0, z: 5.725, y: 0 }, rotation: (Math.PI / 2) * 2, model: StoneFoundationTriangleMid}, //prettier-ignore
      { name: "T8", position: { x: 0, z: -1.725, y: 0 }, rotation: 0, model: StoneFoundationTriangleMid },
      { name: "T9", position: { x: -1, z: 0, y: 0 }, rotation: (Math.PI / 2) * 2, model: StoneFoundationTriangleMid },
      { name: "T10", position: { x: 1, z: 0, y: 0 }, rotation: (Math.PI / 2) * 2, model: StoneFoundationTriangleMid },
      { name: "T11", position: { x: 2, z: 3, y: 0 }, rotation: Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T12", position: { x: 2, z: 1, y: 0 }, rotation: Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T13", position: { x: 3.725, z: 2, y: 0 }, rotation: -Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T14", position: { x: -2, z: 1, y: 0 }, rotation: -Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T15", position: { x: -2, z: 1, y: 0 }, rotation: -Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T16", position: { x: -2, z: 3, y: 0 }, rotation: -Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T17", position: { x: -3.725, z: 2, y: 0 }, rotation: Math.PI / 2, model: StoneFoundationTriangleMid },
      { name: "T18", position: { x: -2, z: 1, y: 1 }, rotation: Math.PI / 2, model: StoneWallHigh },
      { name: "T19", position: { x: -2, z: 3, y: 1 }, rotation: Math.PI / 2, model: StoneWallHigh },
      { name: "T20", position: { x: 1, z: 4, y: 1 }, rotation: Math.PI, model: StoneWallHigh },
      { name: "T21", position: { x: -1, z: 4, y: 1 }, rotation: Math.PI, model: StoneDoorway },
      { name: "T22", position: { x: 2, z: 3, y: 1 }, rotation: -Math.PI / 2, model: StoneWallHigh },
      { name: "T23", position: { x: 2, z: 1, y: 1 }, rotation: -Math.PI / 2, model: StoneWallHigh },
      { name: "T24", position: { x: -1, z: 0, y: 1 }, rotation: Math.PI * 2, model: StoneWallHigh },
      { name: "T25", position: { x: 1, z: 0, y: 1 }, rotation: Math.PI * 2, model: StoneWallHigh },
      { name: "T26", position: { x: -1, z: 2, y: 1 }, rotation: Math.PI, model: StoneWallFrame },
      { name: "T27", position: { x: 1, z: 2, y: 1 }, rotation: Math.PI, model: StoneWallFrame },
      { name: "T28", position: { x: 0, z: 1, y: 1 }, rotation: Math.PI / 2, model: StoneWallHigh },
      { name: "T29", position: { x: 0, z: 3, y: 1 }, rotation: Math.PI / 2, model: StoneWallFrame },
      { name: "T30", position: { x: 0, z: 3, y: 1 }, rotation: -Math.PI / 2, model: GarageDoor },
      { name: "T31", position: { x: -1.5, z: 4.85, y: 1 }, rotation: rotation_120deg, model: StoneWallHigh },
      { name: "T32", position: { x: -0.55, z: 4.85, y: 1 }, rotation: rotation_240deg, model: StoneDoorway },
      { name: "T33", position: { x: 0, z: 5.725, y: 1 }, rotation: Math.PI, model: StoneWindow },
      { name: "T34", position: { x: 1.5, z: 4.85, y: 1 }, rotation: rotation_240deg, model: StoneDoorway },
      { name: "T35", position: { x: 1.5, z: 4.85, y: 1 }, rotation: rotation_240deg, model: MetalDoor },
      { name: "T36", position: { x: -0.55, z: 4.85, y: 1 }, rotation: rotation_240deg, model: MetalDoor },
      { name: "T37", position: { x: -1, z: 4, y: 1 }, rotation: Math.PI, model: MetalDoor },
      { name: "T38", position: { x: -1, z: 2, y: 1 }, rotation: Math.PI, model: GarageDoor },
      { name: "T39", position: { x: 1, z: 2, y: 1 }, rotation: Math.PI * 2, model: GarageDoor },
      { name: "T40", position: { x: -1.5, z: -0.85, y: 1 }, rotation: rotation_60deg, model: StoneWallHigh },
      { name: "T41", position: { x: 1.5, z: -0.85, y: 1 }, rotation: rotation_300deg, model: StoneWallHigh },
      { name: "T42", position: { x: 0.55, z: -0.85, y: 1 }, rotation: rotation_60deg, model: StoneWallHigh },
      { name: "T43", position: { x: -0.55, z: -0.85, y: 1 }, rotation: rotation_300deg, model: StoneWallHigh },
      { name: "T44", position: { x: 0, z: -1.725, y: 1 }, rotation: Math.PI * 2, model: StoneWallHigh },
      { name: "T45", position: { x: 3.725, z: 2, y: 1 }, rotation: -Math.PI / 2, model: StoneWallHigh },
      { name: "T46", position: { x: 2.825, z: 2.5, y: 1 }, rotation: rotation_330deg, model: StoneWallHigh },
      { name: "T47", position: { x: 2.825, z: 0.5, y: 1 }, rotation: rotation_330deg, model: StoneWallHigh },
      { name: "T48", position: { x: 2.825, z: 3.5, y: 1 }, rotation: rotation_210deg, model: StoneWallHigh },
      { name: "T49", position: { x: 2.825, z: 1.5, y: 1 }, rotation: rotation_210deg, model: StoneWallHigh },
      { name: "T50", position: { x: -2.85, z: 0.5, y: 1 }, rotation: rotation_30deg, model: StoneWallHigh },
      { name: "T51", position: { x: -2.85, z: 2.5, y: 1 }, rotation: rotation_30deg, model: StoneWallHigh },
      { name: "T52", position: { x: -2.85, z: 3.5, y: 1 }, rotation: rotation_150deg, model: StoneWallHigh },
      { name: "T53", position: { x: -2.85, z: 1.5, y: 1 }, rotation: rotation_150deg, model: StoneWallHigh },
      { name: "T54", position: { x: -3.725, z: 2, y: 1 }, rotation: Math.PI / 2, model: StoneWallHigh },
      { name: "T55", position: { x: 0.35, z: 1.3, y: 1.05 }, rotation: Math.PI / 2, model: LargeWoodBox },
      { name: "T56", position: { x: 0.4, z: 0.35, y: 1.05 }, rotation: Math.PI * 2, model: ToolCupboard },
      { name: "T57", position: { x: 1.4, z: 0.4, y: 1.05 }, rotation: Math.PI, model: LargeWoodBox },
      { name: "T58", position: { x: 1.35, z: 1.675, y: 1.05 }, rotation: Math.PI, model: LargeWoodBox },
      { name: "T59", position: { x: 1.6, z: 2.4, y: 1.05 }, rotation: -Math.PI / 2, model: Furnace },
      { name: "T60", position: { x: 1.6, z: 3.1, y: 1.05 }, rotation: -Math.PI / 2, model: Furnace },
      { name: "T61", position: { x: 1.6, z: 3.7, y: 1.05 }, rotation: -Math.PI / 2, model: WoodStorageBox },
      { name: "T62", position: { x: -1.25, z: 0.325, y: 1.05 }, rotation: Math.PI / 2, model: WoodStorageBox },
      { name: "T64", position: { x: -0.275, z: 0.325, y: 1.05 }, rotation: Math.PI / 2, model: WoodStorageBox },
      { name: "T65", position: { x: 0, z: 5.725, y: 1 }, rotation: Math.PI * 2, model: StrenghtenedGlassWindow },
      { name: "T66", position: { x: -1.25, z: 0.35, y: 1 }, rotation: Math.PI * 2, model: WorkbenchT3 },
      { name: "T67", position: { x: 2, z: 1, y: 3 }, rotation: Math.PI / 2, model: StoneFloorTriangle },
      { name: "T68", position: { x: 2, z: 3, y: 3 }, rotation: Math.PI / 2, model: StoneFloorTriangle },
      { name: "T69", position: { x: 3.725, z: 2, y: 3 }, rotation: -Math.PI / 2, model: StoneFloorTriangle },
      { name: "T70", position: { x: -2, z: 1, y: 3 }, rotation: -Math.PI / 2, model: StoneFloorTriangle },
      { name: "T71", position: { x: -2, z: 3, y: 3 }, rotation: -Math.PI / 2, model: StoneFloorTriangle },
      { name: "T72", position: { x: -3.725, z: 2, y: 3 }, rotation: Math.PI / 2, model: StoneFloorTriangle },
      { name: "T73", position: { x: 0, z: -1.7, y: 3 }, rotation: Math.PI * 2, model: StoneFloorTriangle },
      { name: "T74", position: { x: 1, z: 0, y: 3 }, rotation: Math.PI, model: StoneFloorTriangle },
      { name: "T75", position: { x: -1, z: 0, y: 3 }, rotation: Math.PI, model: StoneFloorTriangle },
    ];

    for (const { name, position, rotation, model } of prebuildObjects) {
      setModelsData((prevTransforms) => ({
        ...prevTransforms,
        [name]: { position, rotation: new THREE.Euler(0, rotation, 0, "XYZ") },
      }));

      addPrebuild(model, name, new THREE.Euler(0, rotation, 0));
    }
  }

  // ------------------------- -------------------------

  function IsOffsetActive() {
    if (model_x_position_offset) return true;
    else if (model_z_position_offset) return true;
  }

  function ChangeXSymmetryState() {
    set_symmetry_x_enabled(!symmetry_x_enabled);
    set_model_x_position_offset(0);
    set_model_z_position_offset(0);
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function ChangeZSymmetryState() {
    set_symmetry_z_enabled(!symmetry_z_enabled);
    set_model_x_position_offset(0);
    set_model_z_position_offset(0);
    if (audio) {
      AudioPlayer(buttons_sound);
    }
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
      if (audio && selected_model_id !== "empty") {
        AudioPlayer(controls_sound);
      }
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
          if (audio) {
            AudioPlayer(rotation_sound);
          }
        } else if (keyboard_input === "E") {
          RotateSelectedObject(selected_model_id, "left");
          if (audio) {
            AudioPlayer(rotation_sound);
          }
        } else if (keyboard_input === "SPACE") {
          moveSelectedObjectY(+1);
        } else if (keyboard_input === "CTRL") {
          moveSelectedObjectY(-1);
        }
      }
    } else if (page_mode === "edit" && model_creation_state) {
      if (audio && selected_model_id !== "empty") {
        AudioPlayer(rotation_sound);
      }
      if (keyboard_input === "Q") {
        ChangeDefaultModelRotationLeft();
        RotateSelectedObject(selected_model_id, "left");
      } else if (keyboard_input === "E") {
        ChangeDefaultModelRotationRight();
        RotateSelectedObject(selected_model_id, "right");
      } else if (keyboard_input === "W" && !symmetry_x_enabled && !symmetry_z_enabled) {
        if (audio) {
          AudioPlayer(controls_sound);
        }
        if (camera_3d_direction === "north") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        }
      } else if (keyboard_input === "S" && !symmetry_x_enabled && !symmetry_z_enabled) {
        if (audio) {
          AudioPlayer(controls_sound);
        }
        if (camera_3d_direction === "north") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        }
      } else if (keyboard_input === "A" && !symmetry_x_enabled && !symmetry_z_enabled) {
        if (audio) {
          AudioPlayer(controls_sound);
        }
        if (camera_3d_direction === "north") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        }
      } else if (keyboard_input === "D" && !symmetry_x_enabled && !symmetry_z_enabled) {
        if (audio) {
          AudioPlayer(controls_sound);
        }
        if (camera_3d_direction === "north") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        }
      }
    }
  }, [key_press_trigger]);

  useEffect(() => {
    if (page_mode === "edit" && !model_creation_state) {
      if (audio && selected_model_id !== "empty") {
        AudioPlayer(controls_sound);
      }
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
      model_type_to_create === "WorkbenchT3" ||
      model_type_to_create === "SleepingBag"
    ) {
      set_model_prop("storage_prop");
    }
  }, [model_type_to_create]);

  useEffect(() => {
    if (!prebuild_created.current) {
      CreatePrebuildBase();
      prebuild_created.current = true;
    }
  }, []);

  useEffect(() => {
    dispatch(set_selected_model_id("empty"));
  }, [model_creation_state]);

  useEffect(() => {
    set_modified_model_rotation(0);
  }, [object_rotation_degree]);

  useEffect(() => {
    set_model_x_position_offset(0);
    set_model_z_position_offset(0);
  }, [selected_object_list]);

  return (
    <>
      {page_mode === "edit" && (
        <>
          <div className="pivot_controls_container_description">
            pivot controls {pivot_controls_state ? "(enabled)" : "(disabled)"}
          </div>
          <div className="pivot_controls_container">
            <button className="pivot_controls_button pivot_controls_left" onClick={HandlePivotStateSwitch}>
              <FontAwesomeIcon
                icon={faUpDownLeftRight}
                size="xl"
                style={{ color: !pivot_controls_state ? "#bbbbbb" : "#ffd5b3" }}
              />
            </button>
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

          <div className="object_mirror_container_description">symmetry:</div>
          <div className="object_mirror_container">
            <button
              className={
                symmetry_x_enabled
                  ? "mirror_button mirror_button_left symmetry_button_enabled"
                  : "mirror_button mirror_button_left"
              }
              onClick={() => ChangeXSymmetryState()}
            >
              X
            </button>

            <button
              className={
                symmetry_z_enabled
                  ? "mirror_button mirror_button_right symmetry_button_enabled"
                  : "mirror_button mirror_button_right"
              }
              onClick={() => ChangeZSymmetryState()}
            >
              Z
            </button>
          </div>

          {model_creation_state && (
            <div className="offset_container_main">
              <div className="offset_container_sub offset_container_x">X offset: {model_x_position_offset}</div>
              <div className="offset_container_sub offset_container_y">Z offset: {-model_z_position_offset}</div>
            </div>
          )}
        </>
      )}

      <div className="canvas_container">
        <Canvas
          onPointerDown={(event) => CanvasPointerDown(event)}
          onPointerUp={(event) => CanvasPointerUp(event)}
          onMouseMove={(event) => {
            CanvasMouseOverIntersectionCoordinates(event), CaptureMouseCanvasDrag(event);
          }}
          onClick={() => {
            AddCanvasModel();
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
            const modelTransform = modelsData[id] || {
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
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position / 2 + 0.0425,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
                    scale={[2, default_model_height_position + 0.08, 2]}
                  >
                    <meshStandardMaterial
                      color={"#ffa463"}
                      emissive={"rgb(255, 206, 166)"}
                      emissiveIntensity={bloom_state ? 3 : 0}
                    />
                  </Box>

                  {symmetry_x_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.0425,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, default_model_height_position + 0.08, 2]}
                    >
                      <meshStandardMaterial
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                      />
                    </Box>
                  )}

                  {symmetry_z_enabled && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.0425,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, default_model_height_position + 0.08, 2]}
                    >
                      <meshStandardMaterial
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                      />
                    </Box>
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.0425,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, default_model_height_position + 0.08, 2]}
                    >
                      <meshStandardMaterial
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                      />
                    </Box>
                  )}

                  {IsOffsetActive() && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate,
                        default_model_height_position / 2 + 0.0425,
                        mouse_canvas_z_coordinate,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, default_model_height_position + 0.08, 2]}
                    >
                      <meshStandardMaterial
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                        opacity={0.2}
                        wireframe={true}
                      />
                    </Box>
                  )}
                </>
              )}
              {model_prop === "triangle_foundation_prop" && (
                <>
                  <TrianglePropSolid
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position / 100,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
                    scale={[1, default_model_height_position * 100 + 10, 1]}
                  ></TrianglePropSolid>

                  {symmetry_x_enabled && (
                    <TrianglePropSolid
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 100,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[1, default_model_height_position * 100 + 10, 1]}
                    ></TrianglePropSolid>
                  )}

                  {symmetry_z_enabled && (
                    <TrianglePropSolid
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 100,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[1, default_model_height_position * 100 + 10, 1]}
                    ></TrianglePropSolid>
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <TrianglePropSolid
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 100,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[1, default_model_height_position * 100 + 10, 1]}
                    ></TrianglePropSolid>
                  )}

                  {IsOffsetActive() && (
                    <TrianglePropWireframe
                      position={[
                        mouse_canvas_x_coordinate,
                        default_model_height_position / 100,
                        mouse_canvas_z_coordinate,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[1, default_model_height_position * 100 + 10, 1]}
                    ></TrianglePropWireframe>
                  )}
                </>
              )}
              {model_prop === "wall_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
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

                  {symmetry_x_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {symmetry_z_enabled && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {IsOffsetActive() && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, default_model_height_position + 0.08, 0.1]}
                    >
                      <meshStandardMaterial
                        transparent
                        opacity={1}
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                        wireframe={true}
                      />
                    </Box>
                  )}

                  <ArrowProp
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
                    scale={[2, 12, 1]}
                  ></ArrowProp>

                  {symmetry_x_enabled && (
                    <ArrowProp
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}

                  {symmetry_z_enabled && (
                    <ArrowProp
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <ArrowProp
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}
                </>
              )}
              {model_prop === "door_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
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

                  {symmetry_x_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {symmetry_z_enabled && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {IsOffsetActive() && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[1, default_model_height_position + 0.08, 0.1]}
                    >
                      <meshStandardMaterial
                        transparent
                        opacity={1}
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                        wireframe={true}
                      />
                    </Box>
                  )}

                  <ArrowProp
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
                    scale={[2, 12, 1]}
                  ></ArrowProp>

                  {symmetry_x_enabled && (
                    <ArrowProp
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}

                  {symmetry_z_enabled && (
                    <ArrowProp
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <ArrowProp
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}
                </>
              )}

              {model_prop === "storage_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
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

                  {symmetry_x_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {symmetry_z_enabled && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {symmetry_x_enabled && symmetry_z_enabled && (
                    <Box
                      position={[
                        -mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position / 2 + 0.04,
                        -mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
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
                  )}

                  {IsOffsetActive() && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[1.25, default_model_height_position + 0.08, 0.75]}
                    >
                      <meshStandardMaterial
                        transparent
                        opacity={1}
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                        wireframe={true}
                      />
                    </Box>
                  )}

                  {model_type_to_create !== "SleepingBag" && (
                    <ArrowProp
                      position={[
                        mouse_canvas_x_coordinate + model_x_position_offset,
                        default_model_height_position,
                        mouse_canvas_z_coordinate + model_z_position_offset,
                      ]}
                      rotation={[0, modified_model_rotation + Math.PI, 0]}
                      scale={[2, 12, 1]}
                    ></ArrowProp>
                  )}
                </>
              )}
              {model_prop === "tool_cupboard_prop" && (
                <>
                  <Box
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position / 2 + 0.04,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation, 0]}
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

                  {IsOffsetActive() && (
                    <Box
                      position={[
                        mouse_canvas_x_coordinate,
                        default_model_height_position / 2 + 0.04,
                        mouse_canvas_z_coordinate,
                      ]}
                      rotation={[0, modified_model_rotation, 0]}
                      scale={[0.75, default_model_height_position + 0.08, 0.75]}
                    >
                      <meshStandardMaterial
                        transparent
                        opacity={1}
                        color={"#ffa463"}
                        emissive={"rgb(255, 206, 166)"}
                        emissiveIntensity={bloom_state ? 3 : 0}
                        wireframe={true}
                      />
                    </Box>
                  )}

                  <ArrowProp
                    position={[
                      mouse_canvas_x_coordinate + model_x_position_offset,
                      default_model_height_position,
                      mouse_canvas_z_coordinate + model_z_position_offset,
                    ]}
                    rotation={[0, modified_model_rotation + Math.PI, 0]}
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
