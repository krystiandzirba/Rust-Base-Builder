import { RootState } from "../../Store";
import { useSelector } from "react-redux";

//? ----------------------------------------------------------------------------------------------------

//? This component houses the conditional lighting setup for the canvas.

//? It includes various types of lights such as ambient lights, directional lights, point lights, and spotlights.

//? ----------------------------------------------------------------------------------------------------

export default function CanvasLights() {
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore

  return (
    <>
      {better_lighting_state && <ambientLight intensity={1.2} />}
      {better_lighting_state && (
        <>
          <group rotation={[Math.PI / 2, 1, Math.PI / 3]}>
            <spotLight position={[155, 15, 14]} penumbra={1} decay={0} intensity={3.5} />
          </group>
          <group rotation={[Math.PI / 4, -1, Math.PI]}>
            <spotLight position={[155, 15, 14]} penumbra={1} decay={0} intensity={2.5} />
          </group>
        </>
      )}

      {!better_lighting_state && <ambientLight intensity={3.5} />}
    </>
  );
}
