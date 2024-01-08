import Toolbar from "./components/script/Toolbar.tsx";
import Presets from "./components/script/Presets.tsx";
import Version from "./components/script/Version.tsx";
import CameraType from "./components/script/CameraSwitch.tsx";
import ResourceCounter from "./components/script/ResourceCounter.tsx";
import CanvasContainer from "./components/script/CanvasContainer.tsx";
import ObjectList from "./components/script/ObjectList.tsx";
import ControlsInput from "./components/script/ControlsInput.tsx";
import Hints from "./components/script/Hints.tsx";
import Settings from "./components/script/Settings.tsx";
import StructureVisibilityMode from "./components/script/StructureVisibilityMode.tsx";

import "./components/styles/global.css";
import "./components/styles/toolbar.css";
import "./components/styles/presets.css";
import "./components/styles/version.css";
import "./components/styles/camera_switch.css";
import "./components/styles/canvas_container.css";
import "./components/styles/resource_counter.css";
import "./components/styles/object_list.css";
import "./components/styles/controls_input.css";
import "./components/styles/hints.css";
import "./components/styles/settings.css";
import "./components/styles/structure_visibility_mode.css";

import { RootState } from "./Store";
import { useSelector } from "react-redux";

function App() {
  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_presets = useSelector((state: RootState) => state.pageSettings.enable_presets);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  return (
    <div>
      {model_transform_controls && <ControlsInput />}
      <Toolbar />
      {enable_presets && <Presets />}
      <Version />
      {enable_cameras && <CameraType />}
      {enable_resource_container && <ResourceCounter />}
      <CanvasContainer />
      <ObjectList />
      {enable_hints && <Hints />}
      <Settings />
      {enable_structures_visibility && <StructureVisibilityMode />}
    </div>
  );
}

export default App;

// object copy: "C"
// raid cost
// different "save files / base plans"
// add object list filters (walls / foundations / stairs / roofs / miscs )
// adjust the pivot controls according to ortographic camera (eg. front: move only up-down/side (walls) left-right(foundation), disable the common pivot and camera axis)
// if possible change the model name from (high-mid-low) foundations of every type without the height prefix, ex. "StoneFoundationSquare" (later)
// move every canvas item configs (position, rotation ...) to separate file
// add custom rotation angle and distance unit to transform the object
// add multiple models of same type on mouse drag on canvas (like painting)
// add placing sound
// add creation mode hints, placing objects, multiple placing*,
// prebuild base setups selector
// settings: dark-light mode
// add 1st person walking in overview and raid mode

//errors?
// - rotate the model pivot together with the model itself
// performance fix: disable mesh-mouse input (on miss / on click) outside the edit mode

///// make a bledner 1:0 button on-off instead of toolbar hide-display icon
// if performance issue = canvas lighting + postprocessing + click events
