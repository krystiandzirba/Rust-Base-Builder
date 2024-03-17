import { Stats } from "@react-three/drei";
import { Perf } from "r3f-perf";

//? ----------------------------------------------------------------------------------------------------

//? This component adds performance monitoring by displaying a performance graph in the top-left corner when enabled.

//? The graph provides insights into matrix updates, GPU + CPU frame time, FPS, calls, number of loaded geometries, textures and shaders.

//? ----------------------------------------------------------------------------------------------------

export default function PerformanceStats() {
  return (
    <>
      {/* <Stats showPanel={2} /> */}

      <Perf
        style={{
          position: "absolute",
          top: "0vh",
          left: "0vw",
          width: "20vw",
        }}
        logsPerSecond={3}
        matrixUpdate={true}
        showGraph={true}
        deepAnalyze={false}
      />
    </>
  );
}
