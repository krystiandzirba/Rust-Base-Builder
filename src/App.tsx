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

function App() {
  return (
    <div>
      <ControlsInput />
      <Toolbar />
      <Presets />
      <Version />
      <CameraType />
      <ResourceCounter />
      <CanvasContainer />
      <ObjectList />
      <Hints />
      <Settings />
      <StructureVisibilityMode />
    </div>
  );
}

export default App;

// dark-light theme
// performance settings
// make a separate component for different light setups
// object copy: "C"
// controls menu (mouse + keyboard)
// raid cost
// different "save files / base plans"
// add object list filters (walls / foundations / stairs / roofs / miscs )
// "overview" - more rendered look textured objects, more lights and so on / "edit" - more raw look, objects with simple colors
// toggle system stats ( fps, mem, cpu)
// adjust the pivot controls according to ortographic camera (eg. front: move only up-down/side (walls) left-right(foundation), disable the common pivot and camera axis)
// enable-disable a controls hints, a few currently available shortcuts on screen
// make a separate resource counter function for miscs (crates, rugs ...) so it wont interfere the structure upkeep cost rampup
// if possible change the model name from (high-mid-low) foundations of every type without the height prefix, ex. "StoneFoundationSquare" (later)
// performance mode (simple boxes, no textures just colors)
// add a fov slider
// move every canvas item configs (position, rotation ...) to separate file
// add custom rotation angle and distance unit to transform the object
// add multiple models of same type on mouse drag on canvas (like painting)
// add placing sound
// add creation mode hints, placing objects, multiple placing*,

// list of active canvas 3d objects (editable)
// 2 types of building (freebuild - without snapping and restrictions, with rust rules - with snapping and restrictions)

//errors?
// - if 2 or more models are in the cursor line, the last one is selected on click, not the first one, both aquire hover color
// - (multiple objects on canvas, hovering over any object causes frames to drop)
// - rotate the model pivot together with the model itself
