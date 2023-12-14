import Toolbar from "./components/script/Toolbar.tsx";
import Presets from "./components/script/Presets.tsx";
import Sidebar from "./components/script/Sidebar.tsx";
import Version from "./components/script/Version.tsx";
import CameraType from "./components/script/CameraSwitch.tsx";
import ResourceCounter from "./components/script/ResourceCounter.tsx";
import CanvasContainer from "./components/script/CanvasContainer.tsx";

import "./components/styles/global.css";
import "./components/styles/toolbar.css";
import "./components/styles/presets.css";
import "./components/styles/sidebar.css";
import "./components/styles/version.css";
import "./components/styles/camera_switch.css";
import "./components/styles/canvas_container.css";
import "./components/styles/resource_counter.css";

function App() {
  return (
    <div>
      <Toolbar />
      <Presets />
      <Sidebar />
      <Version />
      <CameraType />
      <ResourceCounter />
      <CanvasContainer />
    </div>
  );
}

export default App;

// dark-light theme
// performance settings
// make a separate component for different light setups
// list of active canvas 3d objects (editable)
// object move type: mouse-follow, gizmo
// object copy: "C"
// object delete: "del"
// controls menu (mouse + keyboard)
// upkeep cost
// build cost
// raid cost
// different "save files / base plans"
// xray
// "overview" - more rendered look textured objects, more lights and so on / "edit" - more raw look, objects with simple colors
// 2 types of building (freebuild - without snapping and restrictions, with rust rules - with snapping and restrictions)
// toggle system stats ( fps, mem, cpu)
// adjust the pivot controls according to ortographic camera (eg. front: move only up-down/side (walls) left-right(foundation), disable the common pivot and camera axis)
// enable-disable a controls hints, a few currently available shortcuts on screen
// object clicked -> display options above mouse position (delete selected object, rotate -90d, +90d square foundations, -45d, +45d for everything else)
// make a separate resource counter function for miscs (crates, rugs ...) so it wont interfere the structure upkeep cost rampup
// if possible change the model name from (high-mid-low) foundations of every type without the height prefix, ex. "StoneFoundationSquare" (later)

//errors?
// - if 2 or more models are in the cursor line, the last one is selected on click, not the first one, both aquire hover color
