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

import "./components/styles/global.css";
import "./components/styles/toolbar.css";
import "./components/styles/presets.css";
import "./components/styles/version.css";
import "./components/styles/camera_switch.css";
import "./components/styles/canvas_container.css";
import "./components/styles/resource_calculator.css";
import "./components/styles/object_list.css";
import "./components/styles/controls_input.css";
import "./components/styles/hints.css";
import "./components/styles/settings.css";
import "./components/styles/structure_visibility_mode.css";
import "./components/styles/github.css";
import "./components/styles/mobile_alert.css";

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
        {model_transform_controls && <ControlsInput />}
        <Toolbar />
        {enable_presets && <Presets />}
        <Version />
        {enable_cameras && <CameraType />}
        {page_mode === "raid" && <RaidCalculator />}
        <CanvasContainer />
        {enable_resource_container && page_mode === "edit" && <BuildCalculator />}
        <ObjectList />
        {enable_hints && <Hints />}
        <Settings />
        {enable_structures_visibility && <StructureVisibilityMode />}
        <Github />
        <MobileAlert />
      </KeyboardControls>
      <Loader {...loaderStyles} dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} />
    </>
  );
}

export default App;

// object copy: "ctrl + C"
// different "save files / base plans"
// add object list filters (walls / foundations / stairs / roofs / miscs )
// add custom rotation angle and distance unit to transform the object
// prebuild base setups selector
// add 1st person walking in overview and raid mode
// add new keyboard controls diescription - 2d camera (moving the objects) + creation mode
// base share as a link
// detailed list of currently active models (number of doors, walls ...)

// fix the camera NSEW position, it is incorrectly calculated
// fix: wsad object transform > mouse click up transform > wsad transform = double axis transform

// react three fiber - pointer lock controls (first person camera control) + fps octree

// add a correct object rotation in mirrored axis
// make the xray work in overview mode

// 1 second 3d text while creating, deleting and raiding the object
// add current id storage to avoid id duplication
// useIntersect, useProgress
// adaptive resolution for low end pcs and heavy performance loss
// 3d day and night cycle as light and dark mode
// model upgrade (stone -> metal) button
// change the foundation low (stone + metal) UV and texture size from 256 to 128
// object info, when selecting an object make it display its name
// add a ground control instructions (wasd around the selected objects)
// change the font size from vw/vh to em / make the settings-controls-save/delete in the black boxes such as overview, edit and raid
