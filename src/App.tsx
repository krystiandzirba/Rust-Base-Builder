import Toolbar from "./components/script/Toolbar.tsx";
import Presets from "./components/script/Presets.tsx";
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
import PrebuiltBasesDesign from "./components/script/PrebuiltBasesDesign.tsx";
import HardwareParameters from "./components/script/HardwareParameters.tsx";

import "./components/styles/global.css";
import "./components/styles/toolbar.css";
import "./components/styles/presets.css";
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
import "./components/styles/prebuilt_bases_design.css";

import { RootState } from "./Store";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry, Loader } from "@react-three/drei";

function App() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_presets = useSelector((state: RootState) => state.pageSettings.enable_presets);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  const map = useMemo<KeyboardControlsEntry[]>(() => [], []);

  const loaderStyles = {
    dataStyles: {
      fontSize: "0.8vw",
    },
  };

  return (
    <>
      <KeyboardControls map={map}>
        <CanvasContainer />
        {enable_resource_container && page_mode === "edit" && <BuildCalculator />}
        {page_mode === "raid" && <RaidCalculator />}
        <ObjectList />
        {model_transform_controls && <ControlsInput />}
        <Toolbar />
        {enable_cameras && <CameraType />}
        {enable_hints && <Hints />}
        {enable_structures_visibility && <StructureVisibilityMode />}
        {enable_presets && <Presets />}
        <Settings />
        <MobileAlert />
        <Github />
        <Version />
        <PrebuiltBasesDesign />
      </KeyboardControls>
      <Loader {...loaderStyles} dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} />
      <HardwareParameters />
    </>
  );
}

export default App;

// object copy: "ctrl + C"
// different "save files / base plans"
// add object list filters (walls / foundations / stairs / roofs / miscs )
// add custom rotation angle and distance unit to transform the object
// add 1st person walking in overview and raid mode
// add new keyboard controls description - 2d camera (moving the objects) + creation mode

// fix the camera NSEW position, it is incorrectly calculated
// fix: wsad object transform > mouse click up transform > wsad transform = double axis transform

// react three fiber - pointer lock controls (first person camera control) + fps octree

// add a correct object rotation in mirrored axis
// make the xray work in overview mode

// 1 second 3d text while creating, deleting and raiding the object (+build cost / +raid cost ...)
// add current id storage to avoid id duplication
// useIntersect, useProgress
// adaptive resolution for low end pcs and heavy performance loss
// 3d day and night cycle as light and dark mode
// change the font size from vw/vh to em / make the settings-controls-save/delete in the black boxes such as overview, edit and raid
// update the building sound, make it different for stone, metal and armored structures, add a explosion to the raid_sound
// make the glass transparent
// add campfire

// fix: raid object destructon on mouse click (down) not the click (release/up)
// fix: select any placed object -> select any object from list to create -> double the hints displayed
// fix: add roof 1/2 walls to the raid cost?
// fix: model textures in settings (off) does not work, the model is bright white / determine the use of the model_material and model_textures

// remake the wall mid uv and lower the texture size
// add github wiki
// move if (audio) to the audio component

// roof wall left or right does not contain the edges highlight
// compress new audio files

// bug: double model selection during selection of the closest model, when currently selected model is in the mouse position behind

// while removing the 3d camera, change the 3d camera to orbital controls and cap the max distance, pan/zoom/rotation speed
// add a build "cloud / dust" effect when building and upgrading models, and moving 2d hammer animation

// add a build + raid cost table on button click with selected models
// change else if for cases

// change the color palette
// prevent key elements to be selectible by user (text) but still be a clickable part of a button
// change the cursor type when hovering over buttons
// change the build checkbox for MUI checkbox
// add MUI skeleton
// change the fontawesome icons for MUI icons

// compress all models in blender export

// change all icons color change on hover, from js function to css hover

//! edit mode performance impact: x + z mouse coordinates on model / preb. base hover,
//! lower the update rate after a certain amount of models present in the canvas / rewrite the coordinates

//! create a 10000 1x1 planes (100x100) that translate to the exact square coordinates on hover
//! or
//! divide whole canvas on 4 parts / if mouse is in part 1, divide this part into another 4 parts, repeat until last iteration end up in 1x1 square dimension
