import { useState } from "react";
import CanvasContainer from "./components/script/CanvasContainer.tsx";
import Toolbar from "./components/script/Toolbar.tsx";
import Version from "./components/script/Version.tsx";

import "./components/styles/global.css";
import "./components/styles/canvas_container.css";
import "./components/styles/toolbar.css";
import "./components/styles/version.css";

function App() {
  const [type, setType] = useState<string>("overview");

  return (
    <div>
      <Toolbar type={type} setType={setType} />
      <CanvasContainer type={type} />
      <Version />
    </div>
  );
}

export default App;

// reset camera
// 3d camera / 2d camera 5 sides
// black-white theme
// performance settings
// list of active canvas 3d objects (editable)
// object move type: mouse, gizmo
// object copy: "C"
// object delete: "del"
// controls menu
// upkeep cost
// build cost
// different "save files / base plans"
