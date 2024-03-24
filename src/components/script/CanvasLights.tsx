import { RootState } from "../../Store";
import { useSelector } from "react-redux";

//? ----------------------------------------------------------------------------------------------------

//? This component houses the lighting setup for the canvas.

//? It includes various types of lights such as ambient lights, directional lights, point lights, and spotlights.

//! heavy performance impact, requires changing | rewriting

//? ----------------------------------------------------------------------------------------------------

export default function CanvasLights() {
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state);

  return (
    <>
      {better_lighting_state && <ambientLight intensity={0.55} />}
      {better_lighting_state && (
        <group rotation={[Math.PI / 16, 3, Math.PI / 2]}>
          <spotLight position={[155, 15, 14]} penumbra={1} decay={0} intensity={model_creation_state ? 3 : 4} />
        </group>
      )}

      {!better_lighting_state && <ambientLight />}
      {!better_lighting_state && <directionalLight />}
    </>
  );
}
