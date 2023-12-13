import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { Box, Grid } from "@react-three/drei";

export default function CanvasGrids() {
  const ortographic_camera_direction = useSelector(
    (state: RootState) => state.ortographicCameraDirection.ortographic_camera_direction
  );

  return (
    <>
      <Box
        scale={
          ortographic_camera_direction === "front" || ortographic_camera_direction === "back"
            ? [101, 0.1, 0.1]
            : [0, 0, 0]
        }
        material-color="red"
      />
      <Box
        scale={
          ortographic_camera_direction === "left" || ortographic_camera_direction === "right"
            ? [0.1, 0.1, 101]
            : [0, 0, 0]
        }
        material-color="blue"
      />
      {ortographic_camera_direction !== "bottom" && (
        <Grid cellSize={3} infiniteGrid={true} fadeStrength={2} sectionColor={"white"} />
      )}
      {/* prettier-ignore */}
      {ortographic_camera_direction === "front" && (
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
      {ortographic_camera_direction === "back" && (
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
      {ortographic_camera_direction === "left" && (
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
      {ortographic_camera_direction === "right" && (
        <Grid
          cellSize={3}
          infiniteGrid={true}
          fadeStrength={2}
          sectionColor={"white"}
          position={[-50, 0, 0]}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        />
      )}
      {ortographic_camera_direction === "bottom" && (
        <Grid
          cellSize={3}
          infiniteGrid={true}
          fadeStrength={2}
          sectionColor={"white"}
          position={[0, 50, 0]}
          rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
        />
      )}
    </>
  );
}
