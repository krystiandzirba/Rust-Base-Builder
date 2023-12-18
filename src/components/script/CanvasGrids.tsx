import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { Box, Grid } from "@react-three/drei";

export default function CanvasGrids() {
  const camera_2d_direction = useSelector((state: RootState) => state.camera2DDirection.camera_2d_direction);

  return (
    <>
      <Box
        scale={
          camera_2d_direction === "front" || camera_2d_direction === "back" || camera_2d_direction === "top"
            ? [101, 0.1, 0.08]
            : [0, 0, 0]
        }
        material-color="#ff6e52"
      />
      <Box
        scale={
          camera_2d_direction === "left" || camera_2d_direction === "right" || camera_2d_direction === "top"
            ? [0.08, 0.1, 101]
            : [0, 0, 0]
        }
        material-color="#69b1ff"
      />
      <Box
        scale={
          camera_2d_direction === "left" ||
          camera_2d_direction === "right" ||
          camera_2d_direction === "front" ||
          camera_2d_direction === "back"
            ? [0.1, 101, 0.08]
            : [0, 0, 0]
        }
        material-color="#70ff77"
      />

      <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"white"} />
      {/* prettier-ignore */}
      {camera_2d_direction === "front" && (
        <Grid
          cellSize={3}
          infiniteGrid={true}
          fadeStrength={2}
          sectionColor={"white"}
          position={[0, 0, -50]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      {/* prettier-ignore */}
      {camera_2d_direction === "back" && (
        <Grid
          cellSize={3}
          infiniteGrid={true}
          fadeStrength={2}
          sectionColor={"white"}
          position={[0, 0, 50]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        />
      )}
      {/* prettier-ignore */}
      {camera_2d_direction === "left" && (
        <Grid
          cellSize={3}
          infiniteGrid={true}
          fadeStrength={2}
          sectionColor={"white"}
          position={[50, 0, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
      )}
      {/* prettier-ignore */}
      {camera_2d_direction === "right" && (
        <Grid
          cellSize={3}
          infiniteGrid={true}
          fadeStrength={2}
          sectionColor={"white"}
          position={[-50, 0, 0]}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        />
      )}
    </>
  );
}
