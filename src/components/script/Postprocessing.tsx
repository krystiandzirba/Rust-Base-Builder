import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";

import { Bloom, EffectComposer, SMAA, SSAO, Pixelation } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution, BlendFunction, SMAAPreset } from "postprocessing";
import { Suspense } from "react";

export default function Postprocessing() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const ssao_state = useSelector((state: RootState) => state.pageSettings.ssao_state); //prettier-ignore
  const antialiasing_state = useSelector((state: RootState) => state.pageSettings.antialiasing_state); //prettier-ignore

  return (
    <>
      <Suspense fallback={null}>
        <EffectComposer multisampling={antialiasing_state ? 3 : 0}>
          <Bloom
            intensity={bloom_state ? 0.5 : 0}
            luminanceThreshold={0.6}
            luminanceSmoothing={1}
            mipmapBlur={true}
            radius={0.4}
          />
          <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            samples={50}
            rings={8}
            intensity={ssao_state && page_mode === "overview" ? 22 : 0}
            worldDistanceThreshold={10}
            worldDistanceFalloff={25}
            worldProximityFalloff={25}
            worldProximityThreshold={1}
            luminanceInfluence={1}
            radius={0.2}
            resolutionScale={0.5}
            bias={0.275}
          />
          <SMAA preset={SMAAPreset.ULTRA} blendFunction={BlendFunction.SET} />
        </EffectComposer>
      </Suspense>
    </>
  );
}
