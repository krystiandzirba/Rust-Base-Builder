import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {PerspectiveCamera, OrthographicCamera, CameraControls, PivotControls, Box} from "@react-three/drei"; //prettier-ignore
import * as THREE from "three";

import { RootState, set_delete_object_mouse_trigger } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { set_cursor_type, set_canvas_models_array, set_object_selected, set_selected_model_id, set_camera_3d_direction, set_delete_object_mode, set_object_distance_multiplier, set_allow_canvas_interaction_after_first_load} from "../../Store.tsx"; //prettier-ignore

import { useAudioPlayer } from "./AudioPlayer.tsx";

import { Model as StoneFoundationSquareHigh } from "./../models/stone/StoneFoundationSquareHigh.tsx";
import { Model as StoneFoundationSquareMid } from "./../models/stone/StoneFoundationSquareMid.tsx";
import { Model as StoneFoundationSquareLow } from "./../models/stone/StoneFoundationSquareLow.tsx";
import { Model as StoneFoundationTriangleHigh } from "./../models/stone/StoneFoundationTriangleHigh.tsx";
import { Model as StoneFoundationTriangleMid } from "./../models/stone/StoneFoundationTriangleMid.tsx";
import { Model as StoneFoundationTriangleLow } from "./../models/stone/StoneFoundationTriangleLow.tsx";
import { Model as StoneWallHigh } from "./../models/stone/StoneWallHigh.tsx";
import { Model as StoneWallLow } from "./../models/stone/StoneWallLow.tsx";
import { Model as StoneWallMid } from "./../models/stone/StoneWallMid.tsx";
import { Model as StoneDoorway } from "./../models/stone/StoneDoorway.tsx";
import { Model as StoneWindow } from "./../models/stone/StoneWindow.tsx";
import { Model as StoneWallFrame } from "./../models/stone/StoneWallFrame.tsx";
import { Model as StoneStairsLShape } from "./../models/stone/StoneStairsLShape.tsx";
import { Model as StoneStairsUShape } from "./../models/stone/StoneStairsUShape.tsx";
import { Model as StoneFloorSquare } from "./../models/stone/StoneFloorSquare.tsx";
import { Model as StoneFloorTriangle } from "./../models/stone/StoneFloorTriangle.tsx";
import { Model as StoneFloorFrameSquare } from "./../models/stone/StoneFloorFrameSquare.tsx";
import { Model as StoneFloorFrameTriangle } from "./../models/stone/StoneFloorFrameTriangle.tsx";
import { Model as StoneRoofSquare } from "./../models/stone/StoneRoofSquare.tsx";
import { Model as StoneRoofTriangle } from "./../models/stone/StoneRoofTriangle.tsx";
import { Model as StoneRoofWallRight } from "./../models/stone/StoneRoofWallRight.tsx";
import { Model as StoneRoofWallLeft } from "./../models/stone/StoneRoofWallLeft.tsx";

import { Model as MetalFoundationSquareHigh } from "./../models/metal/MetalFoundationSquareHigh.tsx";
import { Model as MetalFoundationSquareMid } from "./../models/metal/MetalFoundationSquareMid.tsx";
import { Model as MetalFoundationSquareLow } from "./../models/metal/MetalFoundationSquareLow.tsx";
import { Model as MetalFoundationTriangleHigh } from "./../models/metal/MetalFoundationTriangleHigh.tsx";
import { Model as MetalFoundationTriangleMid } from "./../models/metal/MetalFoundationTriangleMid.tsx";
import { Model as MetalFoundationTriangleLow } from "./../models/metal/MetalFoundationTriangleLow.tsx";
import { Model as MetalWallHigh } from "./../models/metal/MetalWallHigh.tsx";
import { Model as MetalWallMid } from "./../models/metal/MetalWallMid.tsx";
import { Model as MetalWallLow } from "./../models/metal/MetalWallLow.tsx";
import { Model as MetalDoorway } from "./../models/metal/MetalDoorway.tsx";
import { Model as MetalWindow } from "./../models/metal/MetalWindow.tsx";
import { Model as MetalWallFrame } from "./../models/metal/MetalWallFrame.tsx";
import { Model as MetalStairsLShape } from "./../models/metal/MetalStairsLShape.tsx";
import { Model as MetalStairsUShape } from "./../models/metal/MetalStairsUShape.tsx";
import { Model as MetalFloorSquare } from "./../models/metal/MetalFloorSquare.tsx";
import { Model as MetalFloorTriangle } from "./../models/metal/MetalFloorTriangle.tsx";
import { Model as MetalFloorFrameSquare } from "./../models/metal/MetalFloorFrameSquare.tsx";
import { Model as MetalFloorFrameTriangle } from "./../models/metal/MetalFloorFrameTriangle.tsx";
import { Model as MetalRoofSquare } from "./../models/metal/MetalRoofSquare.tsx";
import { Model as MetalRoofTriangle } from "./../models/metal/MetalRoofTriangle.tsx";
import { Model as MetalRoofWallRight } from "./../models/metal/MetalRoofWallRight.tsx";
import { Model as MetalRoofWallLeft } from "./../models/metal/MetalRoofWallLeft.tsx";

import { Model as ArmoredFoundationSquareHigh } from "./../models/armored/ArmoredFoundationSquareHigh.tsx";
import { Model as ArmoredFoundationSquareMid } from "./../models/armored/ArmoredFoundationSquareMid.tsx";
import { Model as ArmoredFoundationSquareLow } from "./../models/armored/ArmoredFoundationSquareLow.tsx";
import { Model as ArmoredFoundationTriangleHigh } from "./../models/armored/ArmoredFoundationTriangleHigh.tsx";
import { Model as ArmoredFoundationTriangleMid } from "./../models/armored/ArmoredFoundationTriangleMid.tsx";
import { Model as ArmoredFoundationTriangleLow } from "./../models/armored/ArmoredFoundationTriangleLow.tsx";
import { Model as ArmoredWallHigh } from "./../models/armored/ArmoredWallHigh.tsx";
import { Model as ArmoredWallMid } from "./../models/armored/ArmoredWallMid.tsx";
import { Model as ArmoredWallLow } from "./../models/armored/ArmoredWallLow.tsx";
import { Model as ArmoredDoorway } from "./../models/armored/ArmoredDoorway.tsx";
import { Model as ArmoredWindow } from "./../models/armored/ArmoredWindow.tsx";
import { Model as ArmoredWallFrame } from "./../models/armored/ArmoredWallFrame.tsx";
import { Model as ArmoredStairsLShape } from "./../models/armored/ArmoredStairsLShape.tsx";
import { Model as ArmoredStairsUShape } from "./../models/armored/ArmoredStairsUShape.tsx";
import { Model as ArmoredFloorSquare } from "./../models/armored/ArmoredFloorSquare.tsx";
import { Model as ArmoredFloorTriangle } from "./../models/armored/ArmoredFloorTriangle.tsx";
import { Model as ArmoredFloorFrameSquare } from "./../models/armored/ArmoredFloorFrameSquare.tsx";
import { Model as ArmoredFloorFrameTriangle } from "./../models/armored/ArmoredFloorFrameTriangle.tsx";
import { Model as ArmoredRoofSquare } from "./../models/armored/ArmoredRoofSquare.tsx";
import { Model as ArmoredRoofTriangle } from "./../models/armored/ArmoredRoofTriangle.tsx";
import { Model as ArmoredRoofWallRight } from "./../models/armored/ArmoredRoofWallRight.tsx";
import { Model as ArmoredRoofWallLeft } from "./../models/armored/ArmoredRoofWallLeft.tsx";

import { Model as MetalDoor } from "./../models/doors/MetalDoor.tsx";
import { Model as GarageDoor } from "./../models/doors/GarageDoor.tsx";

import { Model as MetalVerticalEmbrasure } from "./../models/windows/MetalVerticalEmbrasure.tsx";
import { Model as StrenghtenedGlassWindow } from "./../models/windows/StrenghtenedGlassWindow.tsx";

import { Model as ToolCupboard } from "./../models/misc/ToolCupboard.tsx";
import { Model as WoodStorageBox } from "./../models/misc/WoodStorageBox.tsx";
import { Model as LargeWoodBox } from "./../models/misc/LargeWoodBox.tsx";
import { Model as Furnace } from "./../models/misc/Furnace.tsx";
import { Model as WorkbenchT3 } from "./../models/misc/WorkbenchT3.tsx";
import { Model as SleepingBag } from "./../models/misc/SleepingBag.tsx";

import { GhostModel as GhostModel } from "./GhostModels.tsx";

import CanvasGrids from "./CanvasGrids.tsx";
import CanvasLights from "./CanvasLights.tsx";
import PerformanceStats from "./PerformanceStats.tsx";
import Postprocessing from "./Postprocessing.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faUpDownLeftRight, faFloppyDisk, faTrashCan, faEraser, faDumpster} from "@fortawesome/free-solid-svg-icons"; //prettier-ignore

//Info ctrl+f ➜ [search] to jump between sections
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component Main component for the React Three Fiber (R3F) canvas, where all 3D models are imported and positioned based on user input.
//Component Includes functionality to initialize a pre-built base upon page load and allows for the addition or removal of selected or all present objects.
//Component Each generated object is assigned a random ID and its transform settings ID.
//Component A raycaster is implemented to detect the 2D mouse position relative to the window coordinates and canvas grid intersections,
//Component providing a point where user can place the objects.
//Component Pivot controls enable users to manipulate an object's position through mouse drag options.
//Component Symmetry (X+Z), placing objects with a mirroring on specifc (or both) axis, with 0,0,0 center point.
//Component Capturing the keyboard input to serve as a transformation tool for objects, allowing users to adjust position, rotation, offset, etc., using WASD or ARROW keys.
//Component Model elevation feature enables users to adjust the height level of placed objects.
//Component Model props - a specific ghost model that is visible on the canvas grid, it acts as a visualization where the mouse cursor is and where any object will be placed.
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function CanvasContainer() {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const camera_type = useSelector((state: RootState) => state.camerasSettings.camera_type);
  const camera_3d_direction = useSelector((state: RootState) => state.camerasSettings.camera_3d_direction);
  const camera_3d_reset = useSelector((state: RootState) => state.camerasSettings.camera_3d_reset);
  const camera_2d_position = useSelector((state: RootState) => state.camerasSettings.camera_2d_position);
  const camera_2d_direction = useSelector((state: RootState) => state.camerasSettings.camera_2d_direction);
  const cursor_type = useSelector((state: RootState) => state.cursorType.cursor_type);
  const model_type_to_create = useSelector((state: RootState) => state.modelsData.model_type_to_create);
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state);
  const create_prebuilt_base_state = useSelector((state: RootState) => state.modelsData.create_prebuilt_base_state);
  const object_distance_multiplier = useSelector((state: RootState) => state.controlsInput.object_distance_multiplier);
  const button_input = useSelector((state: RootState) => state.controlsInput.button_input);
  const button_trigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const object_rotation_degree = useSelector((state: RootState) => state.controlsInput.object_rotation_degree);
  const model_upgrade_trigger = useSelector((state: RootState) => state.modelsData.model_upgrade_trigger); //prettier-ignore
  const model_downgrade_trigger = useSelector((state: RootState) => state.modelsData.model_downgrade_trigger); //prettier-ignore
  const model_tier_change = useSelector((state: RootState) => state.modelsData.model_tier_change); //prettier-ignore
  const delete_object_mode = useSelector((state: RootState) => state.controlsInput.delete_object_mode);
  const delete_object_mouse_trigger = useSelector((state: RootState) => state.controlsInput.delete_object_mouse_trigger); //prettier-ignore
  const selected_model_id = useSelector((state: RootState) => state.modelsData.selected_model_id);
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);
  const performance_mode = useSelector((state: RootState) => state.pageSettings.performance_mode); //prettier-ignore
  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore
  const prebuilt_base_objects_set = useSelector((state: RootState) => state.modelsData.prebuilt_base_objects_set); //prettier-ignore

  type models_data_type = {id: string; component: React.FC; rotation: THREE.Euler}; //prettier-ignore
  const [models, set_models] = useState<models_data_type[]>([]);
  const [modelsData, set_models_data] = useState<{[id: string]: { model: string, position: { x: number; z: number; y: number }; rotation: THREE.Euler }}>(() => {const storedData = localStorage.getItem('modelsData'); return storedData ? JSON.parse(storedData) : {}}); //prettier-ignore
  const [generated_id, set_generated_id] = useState<string>(randomIdGenerator());

  const [mouse_canvas_x_coordinate, set_mouse_canvas_x_coordinate] = useState<number>(0);
  const [mouse_canvas_z_coordinate, set_mouse_canvas_z_coordinate] = useState<number>(0);
  const [model_y_position, set_model_y_position] = useState<number>(0);

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

  const [camera_rotation, set_camera_rotation] = useState(true);
  const perspectiveCameraControlsRef = useRef<CameraControls>(null);
  const raycasterBottomIntersector = useRef(null);
  const raycasterFrontIntersector = useRef(null);
  const raycasterRightIntersector = useRef(null);
  const raycasterBackIntersector = useRef(null);
  const raycasterLeftIntersector = useRef(null);
  const raycaster = new THREE.Raycaster();

  const [prevent_actions_after_canvas_drag, set_prevent_actions_after_canvas_drag] = useState<string>("default");
  let canvas_mouse_over_last_execution_time = 0;
  let canvas_mouse_drag_last_execution_time = 0;

  const [keyboard_key, set_keyboard_key] = useState<string>("");
  const [key_press_trigger, set_key_press_trigger] = useState<number>(0);
  const [delete_object_trigger, set_delete_object_trigger] = useState<number>(0);
  const [canvas_model_eraser, set_canvas_model_eraser] = useState<string>("off");
  const [display_remove_all_models_question, set_display_remove_all_models_question] = useState<boolean>(false);
  const [display_remove_saved_data_question, set_display_remove_saved_data_question] = useState<boolean>(false);

  const hasModelsDataChanged = useRef(false);

  const object_north_direction = THREE.MathUtils.degToRad(0);
  const object_south_direction = THREE.MathUtils.degToRad(180);
  const object_east_direction = THREE.MathUtils.degToRad(270);
  const object_west_direction = THREE.MathUtils.degToRad(90);

  const object_north_east_1_direction = THREE.MathUtils.degToRad(300);
  const object_north_east_2_direction = THREE.MathUtils.degToRad(315);
  const object_north_east_3_direction = THREE.MathUtils.degToRad(330);

  const object_north_west_1_direction = THREE.MathUtils.degToRad(30);
  const object_north_west_2_direction = THREE.MathUtils.degToRad(45);
  const object_north_west_3_direction = THREE.MathUtils.degToRad(60);

  const object_south_east_1_direction = THREE.MathUtils.degToRad(210);
  const object_south_east_2_direction = THREE.MathUtils.degToRad(225);
  const object_south_east_3_direction = THREE.MathUtils.degToRad(240);

  const object_south_west_1_direction = THREE.MathUtils.degToRad(120);
  const object_south_west_2_direction = THREE.MathUtils.degToRad(135);
  const object_south_west_3_direction = THREE.MathUtils.degToRad(150);

  const model_type_map = {
    // -------------------------  Stone -------------------------

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
    StoneWindow: StoneWindow,
    StoneWallFrame: StoneWallFrame,
    StoneStairsLShape: StoneStairsLShape,
    StoneStairsUShape: StoneStairsUShape,
    StoneFloorSquare: StoneFloorSquare,
    StoneFloorTriangle: StoneFloorTriangle,
    StoneFloorFrameSquare: StoneFloorFrameSquare,
    StoneFloorFrameTriangle: StoneFloorFrameTriangle,
    StoneRoofSquare: StoneRoofSquare,
    StoneRoofTriangle: StoneRoofTriangle,
    StoneRoofWallRight: StoneRoofWallRight,
    StoneRoofWallLeft: StoneRoofWallLeft,

    // -------------------------  Metal -------------------------

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
    MetalWindow: MetalWindow,
    MetalWallFrame: MetalWallFrame,
    MetalStairsLShape: MetalStairsLShape,
    MetalStairsUShape: MetalStairsUShape,
    MetalFloorSquare: MetalFloorSquare,
    MetalFloorTriangle: MetalFloorTriangle,
    MetalFloorFrameSquare: MetalFloorFrameSquare,
    MetalFloorFrameTriangle: MetalFloorFrameTriangle,
    MetalRoofSquare: MetalRoofSquare,
    MetalRoofTriangle: MetalRoofTriangle,
    MetalRoofWallRight: MetalRoofWallRight,
    MetalRoofWallLeft: MetalRoofWallLeft,

    // -------------------------  Armored -------------------------

    ArmoredFoundationSquareHigh: ArmoredFoundationSquareHigh,
    ArmoredFoundationSquareMid: ArmoredFoundationSquareMid,
    ArmoredFoundationSquareLow: ArmoredFoundationSquareLow,
    ArmoredFoundationTriangleHigh: ArmoredFoundationTriangleHigh,
    ArmoredFoundationTriangleMid: ArmoredFoundationTriangleMid,
    ArmoredFoundationTriangleLow: ArmoredFoundationTriangleLow,
    ArmoredWallHigh: ArmoredWallHigh,
    ArmoredWallMid: ArmoredWallMid,
    ArmoredWallLow: ArmoredWallLow,
    ArmoredDoorway: ArmoredDoorway,
    ArmoredWindow: ArmoredWindow,
    ArmoredWallFrame: ArmoredWallFrame,
    ArmoredStairsLShape: ArmoredStairsLShape,
    ArmoredStairsUShape: ArmoredStairsUShape,
    ArmoredFloorSquare: ArmoredFloorSquare,
    ArmoredFloorTriangle: ArmoredFloorTriangle,
    ArmoredFloorFrameSquare: ArmoredFloorFrameSquare,
    ArmoredFloorFrameTriangle: ArmoredFloorFrameTriangle,
    ArmoredRoofSquare: ArmoredRoofSquare,
    ArmoredRoofTriangle: ArmoredRoofTriangle,
    ArmoredRoofWallRight: ArmoredRoofWallRight,
    ArmoredRoofWallLeft: ArmoredRoofWallLeft,

    // -------------------------  Doors -------------------------

    MetalDoor: MetalDoor,
    GarageDoor: GarageDoor,

    // -------------------------  Windows -------------------------

    MetalVerticalEmbrasure: MetalVerticalEmbrasure,
    StrenghtenedGlassWindow: StrenghtenedGlassWindow,

    // -------------------------  Miscs -------------------------

    ToolCupboard: ToolCupboard,
    WoodStorageBox: WoodStorageBox,
    LargeWoodBox: LargeWoodBox,
    Furnace: Furnace,
    WorkbenchT3: WorkbenchT3,
    SleepingBag: SleepingBag,
  };

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Canvas (1.Interaction / 2.Data) ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] canvas, interaction, data, canvas click, canvas pointer, mouse drag, pivot drag, local storage, symmetry

  //SubSection ───────────────────────── ↓ Canvas 1.Interaction ↓ ─────────────────────────
  //% calculating the mouse cursor position (X+Y window position) and invisible grid floor intersection point
  //% to create a X+Z canvas coordinates at which models will be placed on mouse click
  //% assign a default, 3x mirrored values for symmetrical objects

  //% prevent the canvas pointer action if drag accured (avoid accidental model click on mouse drag)

  function CanvasMouseOverIntersectionCoordinates(event: { clientX: number; clientY: number }) {
    const currentTimestamp = Date.now();
    const canvas_mouse_drag_time_since_last_execution = currentTimestamp - canvas_mouse_over_last_execution_time;

    //prettier-ignore
    if (page_mode === "edit" && camera_type === "camera_3d" && model_creation_state && canvas_mouse_drag_time_since_last_execution >= 30) {
      canvas_mouse_over_last_execution_time = currentTimestamp;

      mouse_window_click.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse_window_click.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const camera = perspectiveCameraControlsRef.current?.camera;

      if (camera) {
        raycaster.setFromCamera(mouse_window_click, camera);
      } else {
        console.error("Camera is null or undefined");
      }

      const intersects = raycaster.intersectObject(raycasterBottomIntersector.current!);

      if (intersects.length > 0) {
        const { x, z } = intersects[0].point;
        const rounded_x = parseFloat(x.toFixed(0));
        const rounded_z = parseFloat(z.toFixed(0));

        //!lag when many objects are present, requires rewriting

        set_mouse_canvas_x_coordinate(rounded_x);
        set_mouse_canvas_z_coordinate(rounded_z);
        set_model_y_position(default_model_height_position + model_foundation_elevation);

        set_model_x_mirror_x_position(-mouse_canvas_x_coordinate);
        set_model_x_mirror_z_position(mouse_canvas_z_coordinate);

        set_model_z_mirror_x_position(mouse_canvas_x_coordinate);
        set_model_z_mirror_z_position(-mouse_canvas_z_coordinate);

        set_model_xz_mirror_x_position(-mouse_canvas_x_coordinate);
        set_model_xz_mirror_z_position(-mouse_canvas_z_coordinate);
      }
    } else return;
  }

  function CanvasOnClick() {
    if (create_prebuilt_base_state) {
      addPrebuiltBase(prebuilt_base_objects_set);
    } else {
      AddCanvasModel();
    }

    if (canvas_model_eraser === "on") {
      RemoveSelectedModel(selected_model_id);
      removeModelsDataObjectInfo(selected_model_id);
      dispatch(set_selected_model_id("empty"));
      dispatch(set_delete_object_mode("none"));
      dispatch(set_object_selected(false));
      playSound("delete_sound");
    }
  }

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

  function CaptureMouseCanvasDrag(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const currentTimestamp = Date.now();
    const canvas_mouse_drag_time_since_last_execution = currentTimestamp - canvas_mouse_drag_last_execution_time;

    canvas_mouse_drag_last_execution_time = currentTimestamp;

    if (event.buttons === 1 && canvas_mouse_drag_time_since_last_execution >= 30) {
      set_prevent_actions_after_canvas_drag("canvas_drag");
    }
  }

  //SubSection ───────────────────────── ↓ Canvas 2.Data ↓ ─────────────────────────
  //% store the data located in the modelsData into a local storage / remove the stored data

  function SaveCurrentBaseToLocalStorage() {
    localStorage.removeItem("modelsData");
    localStorage.setItem("modelsData", JSON.stringify(modelsData));
  }

  function DeleteCurrentBaseFromLocalStorage() {
    localStorage.removeItem("modelsData");
  }

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Models (1.Creation / 2.Interaction / 3.Data) ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] add model, delete model, upgrade model, downgrade model, add prebuilt,

  //SubSection ───────────────────────── ↓ Models 1.Creation ↓ ─────────────────────────
  //% function that adds a models to the canvas on the previously calculated intersection point (Canvas Interaction section)
  //% if symmetry is enabled, additional models are added to the specifc axis
  //% adding a hardcoded prebuilt bases to the canvas

  const AddModel = (modelComponent: React.FC, id: string, rotation: THREE.Euler) => {
    set_models((prevModels) => [...prevModels, { id, component: modelComponent, rotation }]);
  };

  function AddCanvasModel() {
    if (page_mode === "edit" && camera_type === "camera_3d" && model_creation_state) {
      const modelClass = model_type_map[model_type_to_create as keyof typeof model_type_map];

      if (modelClass && prevent_actions_after_canvas_drag === "allow") {
        const addModelData = (id: string, x: number, z: number, y: number) => {
          set_models_data((prevTransforms) => ({
            ...prevTransforms,
            [id]: {position: { x, z, y }, rotation: new THREE.Euler(0, modified_model_rotation, 0, "XYZ"), model: model_type_to_create}, //prettier-ignore
          }));
          AddModel(modelClass, id, default_object_rotation);
        };

        addModelData(randomIdGenerator(), mouse_canvas_x_coordinate + model_x_position_offset, mouse_canvas_z_coordinate + model_z_position_offset, model_y_position); //prettier-ignore

        if (symmetry_x_enabled) {
          addModelData(randomIdGenerator(), model_x_mirror_x_position, model_x_mirror_z_position, model_y_position);
        }

        if (symmetry_z_enabled) {
          addModelData(randomIdGenerator(), model_z_mirror_x_position, model_z_mirror_z_position, model_y_position);
        }

        if (symmetry_x_enabled && symmetry_z_enabled) {
          addModelData(randomIdGenerator(), model_xz_mirror_x_position, model_xz_mirror_z_position, model_y_position);
        }
        playSound("build_sound");
      }
    }
  }

  function cloneObjects(obj: { [x: string]: any }) {
    return JSON.parse(JSON.stringify(obj));
  }

  function addPrebuiltBase(modelsData: { [x: string]: any }) {
    if (prevent_actions_after_canvas_drag === "allow") {
      modelsData = cloneObjects(modelsData);

      let prebuild_delay = 0;

      Object.keys(modelsData).forEach((id) => {
        const recreated_model = modelsData[id];
        const new_id = randomIdGenerator();

        setTimeout(() => {
          const newModel = {
            position: {x: recreated_model.position.x + mouse_canvas_x_coordinate, z: recreated_model.position.z + mouse_canvas_z_coordinate, y: recreated_model.position.y}, //prettier-ignore
            rotation: new THREE.Euler(recreated_model.rotation._x, recreated_model.rotation._y, recreated_model.rotation._z), //prettier-ignore
            model: recreated_model.model,
          };

          set_models_data((prevModelsData) => ({
            ...prevModelsData,
            [new_id]: newModel,
          }));

          set_models_data((prevModelsData) => {
            const updatedModelsData = { ...prevModelsData };
            delete updatedModelsData[id];
            return updatedModelsData;
          });

          const { model, rotation } = newModel;
          const corresponding_model = model_type_map[model as keyof typeof model_type_map];
          AddModel(corresponding_model, new_id, new THREE.Euler(rotation.x, rotation.y, rotation.z));

          playSound("build_sound");
        }, prebuild_delay);

        prebuild_delay += 70;
      });
    }
  }

  function recreateSavedBase(modelsData: { [x: string]: any }) {
    let prebuild_delay = 0;

    let current_loop_iteration = 0;
    const data_length = Object.keys(modelsData).length;

    Object.keys(modelsData).forEach((id) => {
      const recreated_model = modelsData[id];
      const new_id = randomIdGenerator();

      setTimeout(() => {
        modelsData[new_id] = {
          position: {x: recreated_model.position.x, z: recreated_model.position.z, y: recreated_model.position.y}, //prettier-ignore
          rotation: new THREE.Euler(recreated_model.rotation._x, recreated_model.rotation._y, recreated_model.rotation._z), //prettier-ignore
          model: recreated_model.model,
        };

        delete modelsData[id];

        set_models_data({});
        set_models_data(modelsData);

        current_loop_iteration += 1;

        if (current_loop_iteration === data_length) {
          dispatch(set_allow_canvas_interaction_after_first_load(true));
        }

        const { model, rotation } = modelsData[new_id];
        const corresponding_model = model_type_map[model as keyof typeof model_type_map];
        AddModel(corresponding_model, new_id, new THREE.Euler(rotation._x, rotation._y, rotation._z));
      }, prebuild_delay);

      prebuild_delay += 25;
    });
  }

  //SubSection ───────────────────────── ↓ Models 2.Interaction ↓ ─────────────────────────

  function MeshOnClick(selected_object_id: string) {
    if (page_mode === "edit" && !model_creation_state) {
      dispatch(set_selected_model_id(selected_object_id));
      dispatch(set_object_selected(true));
      dispatch(set_cursor_type("grab"));
    }
  }

  function MeshOnMissed() {
    if (page_mode === "edit" && !model_creation_state) {
      const bottom_intersects = raycaster.intersectObject(raycasterBottomIntersector.current!);
      const front_intersects = raycaster.intersectObject(raycasterFrontIntersector.current!);
      const right_intersects = raycaster.intersectObject(raycasterRightIntersector.current!);
      const back_intersects = raycaster.intersectObject(raycasterBackIntersector.current!);
      const left_intersects = raycaster.intersectObject(raycasterLeftIntersector.current!);

      if (
        bottom_intersects.length > 0 ||
        front_intersects.length > 0 ||
        right_intersects.length > 0 ||
        back_intersects.length > 0 ||
        left_intersects.length > 0
      ) {
        dispatch(set_selected_model_id("empty"));
        dispatch(set_object_selected(false));
        dispatch(set_cursor_type("default"));
      }
    }
  }

  const moveSelectedObject = (axis: "x" | "y" | "z", direction: number) => {
    set_models_data((prevTransforms) => {
      const updatedModelTransforms = { ...prevTransforms };

      if (selected_model_id !== "empty" && updatedModelTransforms[selected_model_id]) {
        const newPosition = { ...updatedModelTransforms[selected_model_id].position };

        newPosition[axis] += direction * object_distance_multiplier;

        updatedModelTransforms[selected_model_id] = {
          ...updatedModelTransforms[selected_model_id],
          position: newPosition,
        };
      }

      return updatedModelTransforms;
    });
  };

  const RotateSelectedObject = (objectId: string, direction: string) => {
    set_models_data((prevTransforms) => {
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

  function UpdateSelectedModelTier(selected_model_id: string) {
    const modelData = modelsData[selected_model_id];

    if (modelData) {
      let { model, position, rotation } = modelData;

      if (model_tier_change === "upgrade") {
        if (model.includes("Metal")) {
          model = model.replace(/Metal/g, "Armored");
        } else if (model.includes("Stone")) {
          model = model.replace(/Stone/gi, "Metal");
        } else return;
      } else if (model_tier_change === "downgrade") {
        if (model.includes("Metal")) {
          model = model.replace(/Metal/gi, "Stone");
        } else if (model.includes("Armored")) {
          model = model.replace(/Armored/g, "Metal");
        } else return;
      }

      const modelClass = model_type_map[model as keyof typeof model_type_map];

      set_models_data((prevTransforms) => ({
        ...prevTransforms,
        [generated_id]: {
          position: {x: position.x, z: position.z, y: position.y}, //prettier-ignore
          rotation: new THREE.Euler(0, rotation.y, 0, "XYZ"),
          model: model,
        },
      }));
      playSound("build_sound");

      set_generated_id(randomIdGenerator());
      AddModel(modelClass, generated_id, default_object_rotation);
    } else {
      console.log(`No model found with ID: ${selected_model_id}`);
    }
  }

  const RemoveSelectedModel = (id: string) => {
    set_models((prevModels) => prevModels.filter((model) => model.id !== id));
    dispatch(set_cursor_type("default"));
  };

  const RemoveAllModels = () => {
    set_models([]);
    dispatch(set_cursor_type("default"));
  };

  function PivotDrag(type: "start" | "end", index: string) {
    if (page_mode === "edit") {
      if (type === "start") {
        dispatch(set_selected_model_id(index));
        dispatch(set_object_selected(true));
        set_camera_rotation(false);
        dispatch(set_cursor_type("grab"));
      } else if (type === "end") {
        set_camera_rotation(true);
        dispatch(set_selected_model_id("empty"));
        dispatch(set_object_selected(false));
      }
    }
  }

  function DeleteAllObjects() {
    dispatch(set_delete_object_mode("delete_all_object"));
    dispatch(set_delete_object_mouse_trigger(delete_object_mouse_trigger + 1));
  }

  useEffect(() => {
    dispatch(set_canvas_models_array(storeCanvasModelsNames(models)));
  }, [models]);

  useEffect(() => {
    set_prevent_actions_after_canvas_drag("allow");
    RemoveSelectedModel(selected_model_id);
    removeModelsDataObjectInfo(selected_model_id);
    UpdateSelectedModelTier(selected_model_id);
  }, [model_upgrade_trigger, model_downgrade_trigger]);

  //SubSection ───────────────────────── ↓ Models 3.Data ↓ ─────────────────────────

  function randomIdGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random_id = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      random_id += characters[randomIndex];
    }
    return random_id;
  }

  function ChangeModelElevationValue(value: number) {
    const new_default_model_height_position = default_model_height_position + value;

    if (new_default_model_height_position >= 0) {
      set_default_model_height_position(new_default_model_height_position);
      playSound("buttons_sound");
    }
  }

  const removeModelsDataObjectInfo = (id: string) => {
    const updatedModelsData = { ...modelsData };
    if (updatedModelsData[id]) {
      delete updatedModelsData[id];
      set_models_data(updatedModelsData);
    }
  };

  function storeCanvasModelsNames(models: any[]) {
    return models.map((model) => model.component.displayName);
  }

  function HandlePivotStateSwitch() {
    set_pivot_controls_state(!pivot_controls_state);
    playSound("buttons_sound");
  }

  function HandlePivotAxisStateSwitch(pivot: boolean, set_pivot: any) {
    if (pivot_controls_state) {
      set_pivot(!pivot);
      playSound("buttons_sound");
    }
  }

  function ChangeXSymmetryState() {
    set_symmetry_x_enabled(!symmetry_x_enabled);
    set_model_x_position_offset(0);
    set_model_z_position_offset(0);
    playSound("buttons_sound");
  }

  function ChangeZSymmetryState() {
    set_symmetry_z_enabled(!symmetry_z_enabled);
    set_model_x_position_offset(0);
    set_model_z_position_offset(0);
    playSound("buttons_sound");
  }

  function IsOffsetActive(): boolean {
    return !!(model_x_position_offset || model_z_position_offset);
  }

  function ChangeDefaultModelRotation(direction: string) {
    const rotationFactor = direction === "right" ? -1 : 1;
    const newRotation = modified_model_rotation + rotationFactor * object_rotation_degree * (Math.PI / 180);
    set_modified_model_rotation(newRotation);
  }

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

  //prettier-ignore
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
        //
        "MetalFoundationSquareHigh",
        "MetalFoundationSquareMid",
        "MetalFoundationSquareLow",
        "MetalFoundationTriangleHigh",
        "MetalFoundationTriangleMid",
        "MetalFoundationTriangleLow",
        //
        "ArmoredFoundationSquareHigh",
        "ArmoredFoundationSquareMid",
        "ArmoredFoundationSquareLow",
        "ArmoredFoundationTriangleHigh",
        "ArmoredFoundationTriangleMid",
        "ArmoredFoundationTriangleLow",
        //
        "PrebuildBaseI",
        "PrebuildBaseII",
        "PrebuildBaseIII",
        "PrebuildBaseIV",
        "PrebuildBaseV",
      ].includes(model_type_to_create)
    ) {
      set_model_foundation_elevation(0);
    } else {
      set_model_foundation_elevation(0.05);
    }
  }, [model_type_to_create]);

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Starter base on page load ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] starter base
  //@ Adding a starter base to the canvas on page load

  function CreateStarterBase() {
    const starter_base_objects = [
      { name: "T1", position: { x: -1, z: 1, y: 0 }, rotation: object_north_direction, model: StoneFoundationSquareMid }, //prettier-ignore
      { name: "T2", position: { x: 1, z: 1, y: 0 }, rotation: object_north_direction, model: StoneFoundationSquareMid }, //prettier-ignore
      { name: "T3", position: { x: -1, z: 3, y: 0 }, rotation: object_north_direction, model: StoneFoundationSquareMid }, //prettier-ignore
      { name: "T4", position: { x: 1, z: 3, y: 0 }, rotation: object_north_direction, model: StoneFoundationSquareMid }, //prettier-ignore
      { name: "T5", position: { x: 1, z: 4, y: 0 }, rotation: object_north_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T6", position: { x: -1, z: 4, y: 0 }, rotation: object_north_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T7", position: { x: 0, z: 5.725, y: 0 }, rotation: object_south_direction, model: StoneFoundationTriangleMid}, //prettier-ignore
      { name: "T8", position: { x: 0, z: -1.725, y: 0 }, rotation: object_north_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T9", position: { x: -1, z: 0, y: 0 }, rotation: object_south_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T10", position: { x: 1, z: 0, y: 0 }, rotation: object_south_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T11", position: { x: 2, z: 3, y: 0 }, rotation: object_west_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T12", position: { x: 2, z: 1, y: 0 }, rotation: object_west_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T13", position: { x: 3.725, z: 2, y: 0 }, rotation: object_east_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T15", position: { x: -2, z: 1, y: 0 }, rotation: object_east_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T16", position: { x: -2, z: 3, y: 0 }, rotation: object_east_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T17", position: { x: -3.725, z: 2, y: 0 }, rotation: object_west_direction, model: StoneFoundationTriangleMid }, //prettier-ignore
      { name: "T18", position: { x: -2, z: 1, y: 1 }, rotation: object_west_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T19", position: { x: -2, z: 3, y: 1 }, rotation: object_west_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T20", position: { x: 1, z: 4, y: 1 }, rotation: object_south_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T21", position: { x: -1, z: 4, y: 1 }, rotation: object_south_direction, model: StoneDoorway }, //prettier-ignore
      { name: "T22", position: { x: 2, z: 3, y: 1 }, rotation: object_east_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T23", position: { x: 2, z: 1, y: 1 }, rotation: object_east_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T24", position: { x: -1, z: 0, y: 1 }, rotation: object_north_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T25", position: { x: 1, z: 0, y: 1 }, rotation: object_north_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T26", position: { x: -1, z: 2, y: 1 }, rotation: object_south_direction, model: StoneWallFrame }, //prettier-ignore
      { name: "T27", position: { x: 1, z: 2, y: 1 }, rotation: object_south_direction, model: StoneWallFrame }, //prettier-ignore
      { name: "T28", position: { x: 0, z: 1, y: 1 }, rotation: object_west_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T29", position: { x: 0, z: 3, y: 1 }, rotation: object_west_direction, model: StoneWallFrame }, //prettier-ignore
      { name: "T30", position: { x: 0, z: 3, y: 1 }, rotation: object_east_direction, model: GarageDoor }, //prettier-ignore
      { name: "T31", position: { x: -1.5, z: 4.85, y: 1 }, rotation: object_south_west_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T32", position: { x: -0.55, z: 4.85, y: 1 }, rotation: object_south_east_3_direction, model: StoneDoorway }, //prettier-ignore
      { name: "T33", position: { x: 0, z: 5.725, y: 1 }, rotation: object_south_direction, model: StoneWindow }, //prettier-ignore
      { name: "T34", position: { x: 1.5, z: 4.85, y: 1 }, rotation: object_south_east_3_direction, model: StoneDoorway }, //prettier-ignore
      { name: "T35", position: { x: 1.5, z: 4.85, y: 1 }, rotation: object_south_east_3_direction, model: MetalDoor }, //prettier-ignore
      { name: "T36", position: { x: -0.55, z: 4.85, y: 1 }, rotation: object_south_east_3_direction, model: MetalDoor }, //prettier-ignore
      { name: "T37", position: { x: -1, z: 4, y: 1 }, rotation: object_south_direction, model: MetalDoor }, //prettier-ignore
      { name: "T38", position: { x: -1, z: 2, y: 1 }, rotation: object_south_direction, model: GarageDoor }, //prettier-ignore
      { name: "T39", position: { x: 1, z: 2, y: 1 }, rotation: object_north_direction, model: GarageDoor }, //prettier-ignore
      { name: "T40", position: { x: -1.5, z: -0.85, y: 1 }, rotation: object_north_west_3_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T41", position: { x: 1.5, z: -0.85, y: 1 }, rotation: object_north_east_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T42", position: { x: 0.55, z: -0.85, y: 1 }, rotation: object_north_west_3_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T43", position: { x: -0.55, z: -0.85, y: 1 }, rotation: object_north_east_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T44", position: { x: 0, z: -1.725, y: 1 }, rotation: object_north_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T45", position: { x: 3.725, z: 2, y: 1 }, rotation: object_east_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T46", position: { x: 2.825, z: 2.5, y: 1 }, rotation: object_north_east_3_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T47", position: { x: 2.825, z: 0.5, y: 1 }, rotation: object_north_east_3_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T48", position: { x: 2.825, z: 3.5, y: 1 }, rotation: object_south_east_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T49", position: { x: 2.825, z: 1.5, y: 1 }, rotation: object_south_east_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T50", position: { x: -2.85, z: 0.5, y: 1 }, rotation: object_north_west_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T51", position: { x: -2.85, z: 2.5, y: 1 }, rotation: object_north_west_1_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T52", position: { x: -2.85, z: 3.5, y: 1 }, rotation: object_south_west_3_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T53", position: { x: -2.85, z: 1.5, y: 1 }, rotation: object_south_west_3_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T54", position: { x: -3.725, z: 2, y: 1 }, rotation: object_west_direction, model: StoneWallHigh }, //prettier-ignore
      { name: "T55", position: { x: 0.35, z: 1.3, y: 1.05 }, rotation: object_west_direction, model: LargeWoodBox }, //prettier-ignore
      { name: "T56", position: { x: 0.4, z: 0.35, y: 1.05 }, rotation: object_north_direction, model: ToolCupboard }, //prettier-ignore
      { name: "T57", position: { x: 1.4, z: 0.4, y: 1.05 }, rotation: object_south_direction, model: LargeWoodBox }, //prettier-ignore
      { name: "T58", position: { x: 1.35, z: 1.675, y: 1.05 }, rotation: object_south_direction, model: LargeWoodBox }, //prettier-ignore
      { name: "T59", position: { x: 1.6, z: 2.4, y: 1.05 }, rotation: object_east_direction, model: Furnace }, //prettier-ignore
      { name: "T60", position: { x: 1.6, z: 3.1, y: 1.05 }, rotation: object_east_direction, model: Furnace }, //prettier-ignore
      { name: "T61", position: { x: 1.6, z: 3.7, y: 1.05 }, rotation: object_east_direction, model: WoodStorageBox }, //prettier-ignore
      { name: "T62", position: { x: -1.25, z: 0.325, y: 1.05 }, rotation: object_west_direction, model: WoodStorageBox }, //prettier-ignore
      { name: "T64", position: { x: -0.275, z: 0.325, y: 1.05 }, rotation: object_west_direction, model: WoodStorageBox }, //prettier-ignore
      { name: "T65", position: { x: 0, z: 5.725, y: 1 }, rotation: object_north_direction, model: StrenghtenedGlassWindow }, //prettier-ignore
      { name: "T66", position: { x: -1.25, z: 0.35, y: 1 }, rotation: object_north_direction, model: WorkbenchT3 }, //prettier-ignore
      { name: "T67", position: { x: 2, z: 1, y: 3 }, rotation: object_west_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T68", position: { x: 2, z: 3, y: 3 }, rotation: object_west_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T69", position: { x: 3.725, z: 2, y: 3 }, rotation: object_east_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T70", position: { x: -2, z: 1, y: 3 }, rotation: object_east_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T71", position: { x: -2, z: 3, y: 3 }, rotation: object_east_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T72", position: { x: -3.725, z: 2, y: 3 }, rotation: object_west_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T73", position: { x: 0, z: -1.7, y: 3 }, rotation: object_north_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T74", position: { x: 1, z: 0, y: 3 }, rotation: object_south_direction, model: StoneFloorTriangle }, //prettier-ignore
      { name: "T75", position: { x: -1, z: 0, y: 3 }, rotation: object_south_direction, model: StoneFloorTriangle }, //prettier-ignore
    ];

    //! rewrite the model to be stored and read as a string, not a 3D model

    let prebuild_delay = 0;

    let current_loop_iteration = 0;
    const data_length = starter_base_objects.length;

    for (const { name, position, rotation, model } of starter_base_objects) {
      setTimeout(() => {
        set_models_data((prevTransforms) => ({
          ...prevTransforms,
          [name]: {
            position: {x: position.x, z: position.z, y: position.y}, //prettier-ignore
            rotation: new THREE.Euler(0, rotation, 0, "XYZ"),
            model: model.displayName,
          },
        }));

        current_loop_iteration += 1;

        if (current_loop_iteration === data_length) {
          dispatch(set_allow_canvas_interaction_after_first_load(true));
        }

        AddModel(model, name, new THREE.Euler(0, rotation, 0));
      }, prebuild_delay);

      prebuild_delay += 35;
    }
  }

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Perspective (3D) + Ortographic (2D) camera ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] perspective camera, ortographic camera, 3d camera, 2d camera
  //@ Camera direction calculator based on the Pi rotation

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

  const PerspectiveCameraReset = () => {
    if (perspectiveCameraControlsRef.current) {
      perspectiveCameraControlsRef.current.reset(true);
    }
  };

  useEffect(() => {
    PerspectiveCameraReset();
  }, [camera_3d_reset]);

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Keyboard Input Catcher + Controls ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] keyboard input, keyboard controls

  //@ Used to catch the currently pressed keyboard key
  //@ move the selected object on the canvas using the WSAD or ARROW keys
  //@ rotate the selected object using the QE keys
  //@ elevate the selected object using the SPACE key
  //@ lower the selected object using the L-CTRL key
  //@ offset the selected object using the WSAD or ARROW keys

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      set_keyboard_key(event.code);
      set_key_press_trigger(key_press_trigger + 1);
    };
    window.addEventListener("keydown", handleKeyDown);

    if (model_creation_state || selected_model_id !== "empty") {
      if ((keyboard_key === "KeyE" || keyboard_key === "KeyQ") && !create_prebuilt_base_state) {
        playSound("rotation_sound");
      } else if (
        (keyboard_key === "KeyW" ||
          keyboard_key === "KeyA" ||
          keyboard_key === "KeyS" ||
          keyboard_key === "KeyD" ||
          keyboard_key === "ArrowUp" ||
          keyboard_key === "ArrowDown" ||
          keyboard_key === "ArrowLeft" ||
          keyboard_key === "ArrowRight") &&
        !create_prebuilt_base_state
      ) {
        playSound("controls_sound");
      }
    }
    if (page_mode === "edit" && !model_creation_state) {
      if (keyboard_key === "ShiftLeft") {
        playSound("buttons_sound");
      } else if (selected_model_id !== "empty" && (keyboard_key === "ControlLeft" || keyboard_key === "Space")) {
        playSound("controls_sound");
      }
    }

    if (page_mode === "edit" && !model_creation_state) {
      {
        if (keyboard_key === "KeyW" || keyboard_key === "ArrowUp") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("z", -1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("z", +1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("x", +1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("x", -1);
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObject("y", +1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("z", -1);
          }
        } else if (keyboard_key === "KeyA" || keyboard_key === "ArrowLeft") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("x", -1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("x", +1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("z", -1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("z", +1);
          } else if (camera_2d_direction === "left") {
            moveSelectedObject("z", -1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObject("z", +1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObject("x", -1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObject("x", +1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("x", -1);
          }
        } else if (keyboard_key === "KeyS" || keyboard_key === "ArrowDown") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("z", +1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("z", -1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("x", -1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("x", +1);
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObject("y", -1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("z", +1);
          }
        } else if (keyboard_key === "KeyD" || keyboard_key === "ArrowRight") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("x", +1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("x", -1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("z", +1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("z", -1);
          } else if (camera_2d_direction === "left") {
            moveSelectedObject("z", +1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObject("z", -1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObject("x", +1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObject("x", -1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("x", +1);
          }
        } else if (keyboard_key === "KeyQ" && !create_prebuilt_base_state) {
          RotateSelectedObject(selected_model_id, "right");
        } else if (keyboard_key === "KeyE" && !create_prebuilt_base_state) {
          RotateSelectedObject(selected_model_id, "left");
        } else if (keyboard_key === "Space") {
          moveSelectedObject("y", +1);
        } else if (keyboard_key === "ControlLeft") {
          moveSelectedObject("y", -1);
        } else if (keyboard_key === "ShiftLeft") {
          if (object_distance_multiplier === 0.125) {
            dispatch(set_object_distance_multiplier(1));
          } else if (object_distance_multiplier === 1) {
            dispatch(set_object_distance_multiplier(5));
          } else if (object_distance_multiplier === 5) {
            dispatch(set_object_distance_multiplier(0.125));
          }
        }
      }
    } else if (page_mode === "edit" && model_creation_state) {
      if (keyboard_key === "KeyQ" && !create_prebuilt_base_state) {
        ChangeDefaultModelRotation("left");
      } else if (keyboard_key === "KeyE" && !create_prebuilt_base_state) {
        ChangeDefaultModelRotation("right");
      } else if (keyboard_key === "KeyW" && !symmetry_x_enabled && !symmetry_z_enabled && !create_prebuilt_base_state) {
        if (camera_3d_direction === "north") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        }
      } else if (keyboard_key === "KeyS" && !symmetry_x_enabled && !symmetry_z_enabled && !create_prebuilt_base_state) {
        if (camera_3d_direction === "north") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        }
      } else if (keyboard_key === "KeyA" && !symmetry_x_enabled && !symmetry_z_enabled && !create_prebuilt_base_state) {
        if (camera_3d_direction === "north") {
          set_model_x_position_offset(model_x_position_offset - 0.125);
        } else if (camera_3d_direction === "south") {
          set_model_x_position_offset(model_x_position_offset + 0.125);
        } else if (camera_3d_direction === "east") {
          set_model_z_position_offset(model_z_position_offset - 0.125);
        } else if (camera_3d_direction === "west") {
          set_model_z_position_offset(model_z_position_offset + 0.125);
        }
      } else if (keyboard_key === "KeyD" && !symmetry_x_enabled && !symmetry_z_enabled && !create_prebuilt_base_state) {
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key_press_trigger, model_creation_state]);

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Mouse + Button Input ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] mouse input, button input

  //@ change the position, rotation and elevation of selected objects using the mouse + controls button click

  useEffect(() => {
    if (page_mode === "edit" && !model_creation_state) {
      if (selected_model_id !== "empty") {
        playSound("controls_sound");
      }
      {
        if (button_input === "move_left") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("x", -1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("x", +1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("z", -1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("z", +1);
          } else if (camera_2d_direction === "left") {
            moveSelectedObject("z", -1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObject("z", +1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObject("x", -1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObject("x", +1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("x", -1);
          }
        } else if (button_input === "move_front") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("z", -1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("z", +1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("x", +1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("x", -1);
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObject("y", +1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("z", -1);
          }
        } else if (button_input === "move_right") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("x", +1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("x", -1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("z", +1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("z", -1);
          } else if (camera_2d_direction === "left") {
            moveSelectedObject("z", +1);
          } else if (camera_2d_direction === "right") {
            moveSelectedObject("z", -1);
          } else if (camera_2d_direction === "front") {
            moveSelectedObject("x", +1);
          } else if (camera_2d_direction === "back") {
            moveSelectedObject("x", -1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("x", +1);
          }
        } else if (button_input === "move_back") {
          if (camera_3d_direction === "north") {
            moveSelectedObject("z", +1);
          } else if (camera_3d_direction === "south") {
            moveSelectedObject("z", -1);
          } else if (camera_3d_direction === "east") {
            moveSelectedObject("x", -1);
          } else if (camera_3d_direction === "west") {
            moveSelectedObject("x", +1);
          } else if (
            camera_2d_direction === "front" ||
            camera_2d_direction === "left" ||
            camera_2d_direction === "right" ||
            camera_2d_direction === "back"
          ) {
            moveSelectedObject("y", -1);
          } else if (camera_2d_direction === "top") {
            moveSelectedObject("z", +1);
          }
        } else if (button_input === "move_up") {
          moveSelectedObject("y", +1);
        } else if (button_input === "move_down") {
          moveSelectedObject("y", -1);
        } else if (button_input === "rotate_left") {
          RotateSelectedObject(selected_model_id, "left");
        } else if (button_input === "rotate_right") {
          RotateSelectedObject(selected_model_id, "right");
        }
      }
    }
  }, [button_trigger]);

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Keyboard + Mouse Delete Input Catcher ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] model delete, backspace, delete input

  //@ it detects any DELETE and BACKSPACE keyboard input and mouse delete input (both bins to delete the selected objects)
  //@ and deletes either the selected or all objects based on the input type

  useEffect(() => {
    const handleDelete = (event: KeyboardEvent) => {
      set_keyboard_key(event.code);
      set_delete_object_trigger(delete_object_trigger + 1);
    };
    window.addEventListener("keydown", handleDelete);

    if (delete_object_mode === "delete_selected_object" || keyboard_key === "Backspace" || keyboard_key === "Delete") {
      if (selected_model_id !== "empty") {
        playSound("delete_sound");
      }
      RemoveSelectedModel(selected_model_id);
      removeModelsDataObjectInfo(selected_model_id);
      dispatch(set_selected_model_id("empty"));
      dispatch(set_delete_object_mode("none"));
      dispatch(set_object_selected(false));
    }
    if (delete_object_mode === "delete_all_object") {
      RemoveAllModels();
      set_models_data({});
      dispatch(set_selected_model_id("empty"));
      dispatch(set_delete_object_mode("none"));
      dispatch(set_object_selected(false));
      playSound("delete_sound");
    }

    return () => {
      window.removeEventListener("keydown", handleDelete);
    };
  }, [delete_object_trigger, delete_object_mouse_trigger]);

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ Execute on page load ↓ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //[search] page load

  useEffect(() => {
    try {
      if (!hasModelsDataChanged.current) {
        try {
          if (Object.keys(modelsData).length !== 0) {
            recreateSavedBase(modelsData);
          } else {
            CreateStarterBase();
          }
          hasModelsDataChanged.current = true;
        } catch (error) {
          console.error("Error in recreateSavedBase or CreateStarterBase:", error);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }, [modelsData]);

  document.body.style.cursor = cursor_type;

  //Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
              onClick={() => HandlePivotAxisStateSwitch(pivot_x_axis_state, set_pivot_x_axis_state)}
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
              onClick={() => HandlePivotAxisStateSwitch(pivot_y_axis_state, set_pivot_y_axis_state)}
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
              onClick={() => HandlePivotAxisStateSwitch(pivot_z_axis_state, set_pivot_z_axis_state)}
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
          onClick={() => {CanvasOnClick()}} //prettier-ignore
          onPointerDown={(event) => {CanvasPointerDown(event)}} //prettier-ignore
          onPointerUp={(event) => CanvasPointerUp(event)}
          onMouseMove={(event) => {CanvasMouseOverIntersectionCoordinates(event), CaptureMouseCanvasDrag(event)}} //prettier-ignore
          onMouseUp={() => Camera3DDirection()}
          onPointerMissed={() => {MeshOnMissed()}} //prettier-ignore
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
              far={150} 
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
          <Box ref={raycasterBottomIntersector} scale={[100, 0.1, 100]} position={[0, -0.5, 0]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>

          <Box ref={raycasterFrontIntersector} scale={[1000, 1000, 0.1]} position={[0, -0.5, -150]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>

          <Box ref={raycasterRightIntersector} scale={[0.1, 1000, 1000]} position={[150, -0.5, 0]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>

          <Box ref={raycasterBackIntersector} scale={[1000, 1000, 0.1]} position={[0, -0.5, 150]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>

          <Box ref={raycasterLeftIntersector} scale={[0.1, 1000, 1000]} position={[-150, -0.5, 0]}>
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
                lineWidth={1}
                depthTest={false}
                activeAxes={[pivot_x_axis_state, pivot_y_axis_state, pivot_z_axis_state]}
                axisColors={["##ffbf5e", "##ffdaa3", "##ffbf5e"]}
                onDragStart={() => PivotDrag("start", id)}
                onDragEnd={() => PivotDrag("end", id)}
                disableScaling={true}
                disableRotations={true}
              >
                <mesh
                  position={[modelTransform.position.x, modelTransform.position.y, modelTransform.position.z]}
                  rotation={modelTransform.rotation}
                  key={id}
                  onClick={(e) => {
                    e.stopPropagation(), MeshOnClick(id);
                  }}
                >
                  <ModelComponent />
                </mesh>
              </PivotControls>
            );
          })}
          {page_mode === "edit" && model_creation_state && (
            <>
              <GhostModel
                model_type={model_type_to_create}
                model_x_position={mouse_canvas_x_coordinate + model_x_position_offset}
                model_y_position={model_y_position}
                model_z_position={mouse_canvas_z_coordinate + model_z_position_offset}
                model_y_rotation={modified_model_rotation}
                symmetry_x_enabled={symmetry_x_enabled}
                symmetry_z_enabled={symmetry_z_enabled}
                model_offset_active={IsOffsetActive() || false}
                model_x_offset_position={mouse_canvas_x_coordinate}
                model_z_offset_position={mouse_canvas_z_coordinate}
                prebuilt_base={create_prebuilt_base_state}
              />
            </>
          )}
          {!performance_mode && <Postprocessing />}
        </Canvas>
      </div>

      <div className="local_storage_container">
        <div className="local_storage_button_container">
          <button
            className="local_storage_button"
            onClick={() => {
              SaveCurrentBaseToLocalStorage();
              playSound("menu_sound");
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} style={{ width: "95%", height: "95%" }} />
          </button>
          <span className="local_storage_button_text">save</span>
        </div>

        <div className="local_storage_button_container">
          <button
            className="local_storage_button"
            onClick={() => {
              set_display_remove_saved_data_question(true);
              playSound("menu_sound");
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} style={{ width: "90%", height: "80%" }} />
          </button>
          <span className="local_storage_button_text">delete</span>
        </div>
      </div>

      {page_mode === "edit" && (
        <div className="delete_canvas_models_main_container">
          <div className="erase_canvas_models_button_container">
            <button
              className="erase_canvas_models_button"
              onClick={() => {
                if (canvas_model_eraser === "off") {set_canvas_model_eraser("on")} else set_canvas_model_eraser("off") //prettier-ignore
                playSound("menu_sound");
              }}
            >
              {/*prettier-ignore */}
              <FontAwesomeIcon icon={faEraser} style={{ width: "80%", height: "80%", color: canvas_model_eraser === "on" ? "#ffd5b3" : "#bbbbbb"}} />
            </button>
            <span className="erase_canvas_models_button_description">model eraser ({canvas_model_eraser})</span>
          </div>

          <div className="delete_all_canvas_models_button_container">
            <button
              className="delete_all_canvas_models_button"
              onClick={() => {set_display_remove_all_models_question(true); playSound("menu_sound")}} //prettier-ignore
            >
              <FontAwesomeIcon icon={faDumpster} style={{ width: "80%", height: "80%" }} />
            </button>
            <span className="delete_all_canvas_models_button_description">delete all models</span>
          </div>
        </div>
      )}

      {display_remove_all_models_question && (
        <div className="delete_all_models_question_main_container">
          {/*prettier-ignore*/}
          <div className="delete_all_models_question_description">are you sure you want to delete all the objects?</div>
          {/*prettier-ignore*/}
          <div className="delete_all_models_answer_container">
            <div onClick={() => {DeleteAllObjects(), set_display_remove_all_models_question(false)}} className="delete_all_models_answer_button">yes</div>
            <div onClick={() => {set_display_remove_all_models_question(false); playSound("menu_sound")}} className="delete_all_models_answer_button">no</div>
          </div>
        </div>
      )}

      {display_remove_saved_data_question && (
        <div className="delete_saved_data_question_main_container">
          {/*prettier-ignore*/}
          <div className="delete_saved_data_question_description">are you sure you want to delete the saved data? This process is irreversible.</div>
          {/*prettier-ignore*/}
          <div className="delete_saved_data_answer_container">
            <div onClick={() => {set_display_remove_saved_data_question(false); DeleteCurrentBaseFromLocalStorage(); playSound("menu_sound");}} 
              className="delete_saved_data_answer_button">yes</div>
            <div onClick={() => {set_display_remove_saved_data_question(false); playSound("menu_sound")}} className="delete_saved_data_answer_button">no</div>
          </div>
        </div>
      )}

      {/* <button
        className="test_button"
        onClick={() => {}}
      ></button> */}
    </>
  );
}
