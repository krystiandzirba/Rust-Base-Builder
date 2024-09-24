import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { Box, Grid } from "@react-three/drei";

//? ----------------------------------------------------------------------------------------------------

//? This component consists of multiple planes serving as the center point for the X and Z axes.

//? In 2D mode, it displays a side grid aligned with the corresponding position of the 2D camera.

//? ----------------------------------------------------------------------------------------------------

export default function CanvasGrids() {
  const camera_2d_direction = useSelector((state: RootState) => state.camerasSettings.camera_2d_direction);

  //prettier-ignore
  return (
    <>
      <Box
        scale={camera_2d_direction === "front" || camera_2d_direction === "back" || camera_2d_direction === "top" ? [101, 0.1, 0.08] : [101, 0.01, 0.035]}
        material-color="#f5e684"
      />
      <Box
        scale={camera_2d_direction === "left" || camera_2d_direction === "right" || camera_2d_direction === "top" ? [0.08, 0.1, 101] : [0.035, 0.011, 101]}
        material-color="#f5b784"
      />
      <Box
        scale={camera_2d_direction === "left" || camera_2d_direction === "right" || camera_2d_direction === "front" || camera_2d_direction === "back" ? [0.1, 101, 0.08] : [0, 0, 0]}
        material-color="rgb(246, 177, 122)"
      />

      <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"grey"} />

      {camera_2d_direction === "front" && (
        <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"grey"} position={[0, 0, -50]} rotation={[Math.PI / 2, 0, 0]}/>
      )}

      {camera_2d_direction === "back" && (
        <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"grey"} position={[0, 0, 50]} rotation={[Math.PI / 2, 0, Math.PI]}/>
      )}
      
      {camera_2d_direction === "left" && (
        <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"grey"} position={[50, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}/>
      )}
      
      {camera_2d_direction === "right" && (
        <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"grey"} position={[-50, 0, 0]} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}/>
      )}
    </>
  );
}
