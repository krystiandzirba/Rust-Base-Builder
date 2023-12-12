import { useState } from "react";
import CanvasContainer from "./components/script/CanvasContainer.tsx";
import Toolbar from "./components/script/Toolbar.tsx";
import Version from "./components/script/Version.tsx";
import CameraType from "./components/script/CameraSwitch.tsx";

import "./components/styles/global.css";
import "./components/styles/canvas_container.css";
import "./components/styles/toolbar.css";
import "./components/styles/version.css";
import "./components/styles/camera_switch.css";

function App() {
  return (
    <div>
      <Toolbar />
      <CanvasContainer />
      <Version />
      <CameraType />
    </div>
  );
}

export default App;

// add 0,0,0 color grid lines
// dark-light theme
// performance settings
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

//errors?
// - if 2 or more models are in the cursor line, the last one is selected on click, not the first one, both aquire hover color
