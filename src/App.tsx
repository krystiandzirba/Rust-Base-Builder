import { RootState } from "./Store";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry, Loader } from "@react-three/drei";

import Toolbar from "./components/script/Toolbar.tsx";
import Version from "./components/script/Version.tsx";
import CameraType from "./components/script/CameraSwitch.tsx";
import BuildCalculator from "./components/script/BuildCalculator.tsx";
import RaidCalculator from "./components/script/RaidCalculator.tsx";
import CanvasContainer from "./components/script/CanvasContainer.tsx";
import ObjectList from "./components/script/ObjectList.tsx";
import ControlsInput from "./components/script/ModelControlsMouseInput.tsx";
import Hints from "./components/script/Hints.tsx";
import Settings from "./components/script/Settings.tsx";
import StructureVisibilityMode from "./components/script/StructureVisibilityMode.tsx";
import Github from "./components/script/Github.tsx";
import MobileAlert from "./components/script/MobileAlert.tsx";
import PrebuiltBasesDesign from "./components/script/PrebuiltBasesData.tsx";
import HardwareParameters from "./components/script/HardwareParameters.tsx";

import "./components/styles/global.css";
import "./components/styles/toolbar.css";
import "./components/styles/version.css";
import "./components/styles/camera_switch.css";
import "./components/styles/canvas_container.css";
import "./components/styles/raid_calculator.css";
import "./components/styles/build_calculator.css";
import "./components/styles/object_list.css";
import "./components/styles/controls_input.css";
import "./components/styles/hints.css";
import "./components/styles/settings.css";
import "./components/styles/structure_visibility_mode.css";
import "./components/styles/github.css";
import "./components/styles/mobile_alert.css";
import "./components/styles/prebuilt_bases_data.css";
import "./components/styles/transfer_models_data.css";
import "./components/styles/canvas_models_placing_settings.css";

function App() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  const map = useMemo<KeyboardControlsEntry[]>(() => [], []);

  const loaderStyles = {dataStyles: {fontSize: "0.8vw"}} //prettier-ignore

  return (
    <>
      <KeyboardControls map={map}>
        <CanvasContainer />
        {model_transform_controls && <ControlsInput />}
      </KeyboardControls>
      {enable_resource_container && page_mode === "edit" && <BuildCalculator />}
      {enable_resource_container && page_mode === "raid" && <RaidCalculator />}
      <ObjectList />
      <Toolbar />
      {enable_cameras && <CameraType />}
      {enable_hints && <Hints />}
      {enable_structures_visibility && <StructureVisibilityMode />}
      <Settings />
      <MobileAlert />
      <Github />
      <Version />
      <PrebuiltBasesDesign />
      <HardwareParameters />
      <Loader {...loaderStyles} dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} />
      <HardwareParameters />
    </>
  );
}

export default App;

// bug: custom distance unit does not work
// bug: the camera NSEW position, it is incorrectly calculated
// bug: performance monitor(on) -> performance monitor(off) = stuttering
// bug: lighting does not work after displaying the performance monitor
// bug: raid object destructon on mouse click (down) not the click (release/up)
// bug: double model selection during selection of the closest model, when currently selected model is in the mouse position behind

// feature: object copy: "ctrl + C"
// feature: different "save files / base plans"
// feature: add postprocessing model edges instead of direct addon edges, current edges causes heavy performance drop, 2x calls and 4x triangles
// feature: add custom rotation angle and distance unit to transform the object
// feature: add 1st person walking in overview and raid mode
// feature: react three fiber - pointer lock controls (first person camera control) + fps octree
// feature: add current id storage to avoid id duplication
// feature: adaptive resolution for low end pcs and heavy performance loss
// feature: update the building sound, make it different for stone, metal and armored structures, add a explosion to the raid_sound
// feature: add campfire
// feature: while removing the 3d camera, change the 3d camera to orbital controls and cap the max distance, pan/zoom/rotation speed
// feature: add MUI skeleton
// feature: add draco model compression
// feature: changes the textures to be multiplication of 2 (remove 386x386 ...)
// feature: add three.js layers while disabling multiple models at once

// other: create separate component for wasd and mouse input, rework current one, move the remaining controls from the canvas to the new component
// other: make the settings+controls buttons / save_delete buttons encapsulate in the black square boxes like toolbar
// other: make a separate component from symmetry, height level, pivot and distance units buttons
// other: add new keyboard controls description - 2d camera (moving the objects) + creation mode
// other: remake the wall mid uv and lower the texture size
// other: add github wiki
// other: compress new audio files
// other: change the build checkbox for MUI checkbox
// other: change the fontawesome icons for MUI icons
// other: remove the mui search bar, change it for something different
// other: cleanup the canvas controls
// other: compress all models in blender export

// 6.x.x:

// feature: dynamic performance settings based on users gpu (quality - performance)
// feature: load textureless (prop) models on mobile instead of the textured ones

// info edit mode performance impact: x + z mouse coordinates on model / preb. base hover,
// info lower the update rate after a certain amount of models present in the canvas / rewrite the coordinates

// info create a 10000 1x1 planes (100x100) that translate to the exact square coordinates on hover
// info or
// info divide whole canvas on 4 parts / if mouse is in part 1, divide this part into another 4 parts, repeat until last iteration end up in 1x1 square dimension
