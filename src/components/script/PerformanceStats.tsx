import { Stats } from "@react-three/drei";
import { Perf } from "r3f-perf";

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
