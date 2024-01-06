import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";

export default function CanvasLights() {
  const performance_mode = useSelector((state: RootState) => state.pageSettings.performance_mode); //prettier-ignore
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore

  return (
    <>
      {!performance_mode ? (
        <>
          <ambientLight intensity={1} />
          {better_lighting_state && <directionalLight />}
          {better_lighting_state && <pointLight position={[10, 10, 10]} />}
          {better_lighting_state && (
            <group rotation={[Math.PI / 16, 3, Math.PI / 2]}>
              <spotLight position={[155, 15, 14]} penumbra={1} decay={0} intensity={5} />
            </group>
          )}
        </>
      ) : (
        better_lighting_state && <ambientLight intensity={2} />
      )}
    </>
  );
}
