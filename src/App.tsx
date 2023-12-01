import FiberContainer from "./components/script/FiberContainer.tsx";
import Toolbar from "./components/script/Toolbar.tsx";
import Version from "./components/script/Version.tsx";
import ObjectList from "./components/script/ObjectList.tsx";

import "./components/styles/global.css";
import "./components/styles/container.css";
import "./components/styles/toolbar.css";
import "./components/styles/version.css";
import "./components/styles/object_list.css";

function App() {
  return (
    <div>
      <FiberContainer />
      <Toolbar />
      <Version />
      <ObjectList />
    </div>
  );
}

export default App;

// reset camera
// 3d camera / 2d camera 5 sides
// black-white theme
// performance settings
//
