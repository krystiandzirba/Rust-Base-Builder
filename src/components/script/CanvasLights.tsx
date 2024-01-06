import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";

export default function CanvasLights() {
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore

  return (
    <>
      {better_lighting_state && <ambientLight intensity={0.4} />}
      {!better_lighting_state && <ambientLight />}
      {!better_lighting_state && <directionalLight />}
      {better_lighting_state && <directionalLight />}
      {better_lighting_state && <pointLight position={[10, 10, 10]} />}
      {better_lighting_state && (
        <group rotation={[Math.PI / 16, 3, Math.PI / 2]}>
          <spotLight position={[155, 15, 14]} penumbra={1} decay={0} intensity={5} />
        </group>
      )}
    </>
  );
}
