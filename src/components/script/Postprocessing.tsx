import { RootState } from "../../Store";
import { useSelector } from "react-redux";

import { Bloom, EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import { BlendFunction, SMAAPreset } from "postprocessing";
import { Suspense } from "react";

//? ----------------------------------------------------------------------------------------------------

//? This component applies post-processing effects to the canvas scene and all 3D objects.

//! heavy performance impact, requires changing | rewriting

//? ----------------------------------------------------------------------------------------------------

export default function Postprocessing() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const ssao_state = useSelector((state: RootState) => state.pageSettings.ssao_state); //prettier-ignore
  const antialiasing_state = useSelector((state: RootState) => state.pageSettings.antialiasing_state); //prettier-ignore

  return (
    <>
      <Suspense fallback={null}>
        <EffectComposer multisampling={antialiasing_state ? 3 : 0}>
          <N8AO
            aoRadius={ssao_state && page_mode !== "edit" ? 27.5 : 0}
            distanceFalloff={0.15}
            intensity={ssao_state && page_mode !== "edit" ? 5 : 0.01}
            screenSpaceRadius
            halfRes={true}
          />

          <Bloom
            intensity={bloom_state ? 0.5 : 0}
            luminanceThreshold={0.6}
            luminanceSmoothing={1}
            mipmapBlur={true}
            radius={0.4}
          />
          <SMAA preset={SMAAPreset.ULTRA} blendFunction={BlendFunction.SET} />
        </EffectComposer>
      </Suspense>
    </>
  );
}
