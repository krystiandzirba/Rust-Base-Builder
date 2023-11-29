import ThreeContainer from "./components/script/ThreeContainer.tsx";
import Toolbar from "./components/script/Toolbar.tsx";
import Version from "./components/script/Version.tsx";

import "./components/styles/global.css";
import "./components/styles/three_container.css";
import "./components/styles/toolbar.css";
import "./components/styles/version.css";

function App() {
  return (
    <div>
      <ThreeContainer />
      <Toolbar />
      <Version />
    </div>
  );
}

export default App;
