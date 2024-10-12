import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useEffect, useState } from "react";

type GLTFResult = GLTF & {
  nodes: {Cube: THREE.Mesh}; //prettier-ignore
  materials: {["Material"]: THREE.MeshStandardMaterial}; //prettier-ignore
};

type GhostModelProps = {
  model_type: string;
  model_x_position: number;
  model_y_position: number;
  model_z_position: number;
  model_y_rotation: number;
  symmetry_x_enabled: boolean;
  symmetry_z_enabled: boolean;
  model_offset_active: boolean;
  model_x_offset_position: number;
  model_z_offset_position: number;
  prebuilt_base: boolean;
};

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component Component that provides a "ghost" model that it indicates a position of the mouse cursor on the canvas,
//Component helping the user understand where and what kind of model is currently placing
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function GhostModel({
  model_type,
  model_x_position,
  model_y_position,
  model_z_position,
  model_y_rotation,
  symmetry_x_enabled,
  symmetry_z_enabled,
  model_offset_active,
  model_x_offset_position,
  model_z_offset_position,
  prebuilt_base,
}: GhostModelProps) {
  const { nodes: arrow_prop_nodes } = useGLTF("./models/props/arrow_prop.glb") as GLTFResult; //prettier-ignore
  const { nodes: foundation_square_high_nodes } = useGLTF("./models/props/foundation_square_high.glb") as GLTFResult; //prettier-ignore
  const { nodes: foundation_square_mid_nodes } = useGLTF("./models/props/foundation_square_mid.glb") as GLTFResult; //prettier-ignore
  const { nodes: foundation_square_low_nodes } = useGLTF("./models/props/foundation_square_low.glb") as GLTFResult; //prettier-ignore
  const { nodes: foundation_triangle_high_nodes } = useGLTF("./models/props/foundation_triangle_high.glb") as GLTFResult; //prettier-ignore
  const { nodes: foundation_triangle_mid_nodes } = useGLTF("./models/props/foundation_triangle_mid.glb") as GLTFResult; //prettier-ignore
  const { nodes: foundation_triangle_low_nodes } = useGLTF("./models/props/foundation_triangle_low.glb") as GLTFResult; //prettier-ignore
  const { nodes: wall_high_nodes } = useGLTF("./models/props/wall_high.glb") as GLTFResult; //prettier-ignore
  const { nodes: wall_mid_nodes } = useGLTF("./models/props/wall_mid.glb") as GLTFResult; //prettier-ignore
  const { nodes: wall_low_nodes } = useGLTF("./models/props/wall_low.glb") as GLTFResult; //prettier-ignore
  const { nodes: doorway_nodes } = useGLTF("./models/props/doorway.glb") as GLTFResult; //prettier-ignore
  const { nodes: window_nodes } = useGLTF("./models/props/window.glb") as GLTFResult; //prettier-ignore
  const { nodes: wall_frame_nodes } = useGLTF("./models/props/wall_frame.glb") as GLTFResult; //prettier-ignore
  const { nodes: stairs_l_shape_nodes } = useGLTF("./models/props/stairs_l_shape.glb") as GLTFResult; //prettier-ignore
  const { nodes: stairs_u_shape_nodes } = useGLTF("./models/props/stairs_u_shape.glb") as GLTFResult; //prettier-ignore
  const { nodes: floor_square_nodes } = useGLTF("./models/props/floor_square.glb") as GLTFResult; //prettier-ignore
  const { nodes: floor_triangle_nodes } = useGLTF("./models/props/floor_triangle.glb") as GLTFResult; //prettier-ignore
  const { nodes: floor_frame_square_nodes } = useGLTF("./models/props/floor_frame_square.glb") as GLTFResult; //prettier-ignore
  const { nodes: floor_frame_triangle_nodes } = useGLTF("./models/props/floor_frame_triangle.glb") as GLTFResult; //prettier-ignore
  const { nodes: roof_square_nodes } = useGLTF("./models/props/roof_square.glb") as GLTFResult; //prettier-ignore
  const { nodes: roof_triangle_nodes } = useGLTF("./models/props/roof_triangle.glb") as GLTFResult; //prettier-ignore
  const { nodes: roof_wall_nodes } = useGLTF("./models/props/roof_wall.glb") as GLTFResult; //prettier-ignore
  const { nodes: metal_door_nodes } = useGLTF("./models/props/metal_door.glb") as GLTFResult; //prettier-ignore
  const { nodes: garage_door_nodes } = useGLTF("./models/props/garage_door.glb") as GLTFResult; //prettier-ignore
  const { nodes: metal_vertical_embrasure_nodes } = useGLTF("./models/props/metal_vertical_embrasure.glb") as GLTFResult; //prettier-ignore
  const { nodes: strenghtened_glass_window_nodes } = useGLTF("./models/props/strenghtened_glass_window.glb") as GLTFResult; //prettier-ignore
  const { nodes: tool_cupboard_nodes } = useGLTF("./models/props/tool_cupboard.glb") as GLTFResult; //prettier-ignore
  const { nodes: wood_storage_box_nodes } = useGLTF("./models/props/wood_storage_box.glb") as GLTFResult; //prettier-ignore
  const { nodes: large_wood_box_nodes } = useGLTF("./models/props/large_wood_box.glb") as GLTFResult; //prettier-ignore
  const { nodes: furnace_nodes } = useGLTF("./models/props/furnace.glb") as GLTFResult; //prettier-ignore
  const { nodes: workbench_t3_nodes } = useGLTF("./models/props/workbench_t3.glb") as GLTFResult; //prettier-ignore
  const { nodes: sleeping_bag_nodes } = useGLTF("./models/props/sleeping_bag.glb") as GLTFResult; //prettier-ignore

  const { nodes: starter_base_2x1_prop_nodes } = useGLTF("./models/props/starter_base_2x1_prop.glb") as GLTFResult; //prettier-ignore
  const { nodes: chad_cube_prop_nodes } = useGLTF("./models/props/chad_cube_2x1_prop.glb") as GLTFResult; //prettier-ignore
  const { nodes: hermit_prop_nodes } = useGLTF("./models/props/hermit_prop.glb") as GLTFResult; //prettier-ignore
  const { nodes: diamond_prop_nodes } = useGLTF("./models/props/diamond_prop.glb") as GLTFResult; //prettier-ignore
  const { nodes: vulcan_prop_nodes } = useGLTF("./models/props/vulcan_prop.glb") as GLTFResult; //prettier-ignore

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const [enable_model_arrow, set_enable_model_arrow] = useState<boolean>(false);

  // prettier-ignore
  function ModelTypeGeometryNodes(model_type: string) {
    switch (model_type) {
      case "StoneFoundationSquareHigh": case "MetalFoundationSquareHigh": case "ArmoredFoundationSquareHigh": return foundation_square_high_nodes.Cube.geometry;
      case "StoneFoundationSquareMid": case "MetalFoundationSquareMid": case "ArmoredFoundationSquareMid": return foundation_square_mid_nodes.Cube.geometry;
      case "StoneFoundationSquareLow": case "MetalFoundationSquareLow": case "ArmoredFoundationSquareLow": return foundation_square_low_nodes.Cube.geometry;
      case "StoneFoundationTriangleHigh": case "MetalFoundationTriangleHigh": case "ArmoredFoundationTriangleHigh": return foundation_triangle_high_nodes.Cube.geometry;
      case "StoneFoundationTriangleMid": case "MetalFoundationTriangleMid": case "ArmoredFoundationTriangleMid": return foundation_triangle_mid_nodes.Cube.geometry;
      case "StoneFoundationTriangleLow": case "MetalFoundationTriangleLow": case "ArmoredFoundationTriangleLow": return foundation_triangle_low_nodes.Cube.geometry;
      case "StoneWallHigh": case "MetalWallHigh": case "ArmoredWallHigh": return wall_high_nodes.Cube.geometry;
      case "StoneWallMid": case "MetalWallMid": case "ArmoredWallMid": return wall_mid_nodes.Cube.geometry;
      case "StoneWallLow": case "MetalWallLow": case "ArmoredWallLow": return wall_low_nodes.Cube.geometry;
      case "StoneDoorway": case "MetalDoorway": case "ArmoredDoorway": return doorway_nodes.Cube.geometry;
      case "StoneWindow": case "MetalWindow": case "ArmoredWindow": return window_nodes.Cube.geometry;
      case "StoneWallFrame": case "MetalWallFrame": case "ArmoredWallFrame": return wall_frame_nodes.Cube.geometry;
      case "StoneStairsLShape": case "MetalStairsLShape": case "ArmoredStairsLShape": return stairs_l_shape_nodes.Cube.geometry;
      case "StoneStairsUShape": case "MetalStairsUShape": case "ArmoredStairsUShape": return stairs_u_shape_nodes.Cube.geometry;
      case "StoneFloorSquare": case "MetalFloorSquare": case "ArmoredFloorSquare": return floor_square_nodes.Cube.geometry;
      case "StoneFloorTriangle": case "MetalFloorTriangle": case "ArmoredFloorTriangle": return floor_triangle_nodes.Cube.geometry;
      case "StoneFloorFrameSquare": case "MetalFloorFrameSquare": case "ArmoredFloorFrameSquare": return floor_frame_square_nodes.Cube.geometry;
      case "StoneFloorFrameTriangle": case "MetalFloorFrameTriangle": case "ArmoredFloorFrameTriangle": return floor_frame_triangle_nodes.Cube.geometry;
      case "StoneRoofSquare": case "MetalRoofSquare": case "ArmoredRoofSquare": return roof_square_nodes.Cube.geometry;
      case "StoneRoofTriangle": case "MetalRoofTriangle": case "ArmoredRoofTriangle": return roof_triangle_nodes.Cube.geometry;
      case "StoneRoofWallLeft": case "StoneRoofWallRight": case "MetalRoofWallLeft": case "MetalRoofWallRight": case "ArmoredRoofWallLeft": case "ArmoredRoofWallRight": return roof_wall_nodes.Cube.geometry;
      case "MetalDoor": return metal_door_nodes.Cube.geometry;
      case "GarageDoor": return garage_door_nodes.Cube.geometry;
      case "MetalVerticalEmbrasure": return metal_vertical_embrasure_nodes.Cube.geometry;
      case "StrenghtenedGlassWindow": return strenghtened_glass_window_nodes.Cube.geometry;
      case "ToolCupboard": return tool_cupboard_nodes.Cube.geometry;
      case "WoodStorageBox": return wood_storage_box_nodes.Cube.geometry;
      case "LargeWoodBox": return large_wood_box_nodes.Cube.geometry;
      case "Furnace": return furnace_nodes.Cube.geometry;
      case "WorkbenchT3": return workbench_t3_nodes.Cube.geometry;
      case "SleepingBag": return sleeping_bag_nodes.Cube.geometry;

      case "PrebuildBaseI": return starter_base_2x1_prop_nodes.Cube.geometry;
      case "PrebuildBaseII": return chad_cube_prop_nodes.Cube.geometry;
      case "PrebuildBaseIII": return hermit_prop_nodes.Cube.geometry;
      case "PrebuildBaseIV": return diamond_prop_nodes.Cube.geometry;
      case "PrebuildBaseV": return vulcan_prop_nodes.Cube.geometry;

      case "ImportedBase": return foundation_square_low_nodes.Cube.geometry;
    }
  }

  function GhostModelBloomValue(is_prebuilt_base: boolean) {
    return is_prebuilt_base ? 1 : bloom_state ? 2.5 : 0;
  }

  // prettier-ignore
  function GhostModelGeometry(wireframe_enabled: boolean) {
    return (
      <>
        {enable_model_arrow && (
          <group position={[0, 0, -1]} scale={[3.5, 1, 1.25]}>
            <mesh geometry={arrow_prop_nodes.Cube.geometry}><meshStandardMaterial color={"#ffa463"} emissive={"rgb(255, 206, 166)"} emissiveIntensity={GhostModelBloomValue(prebuilt_base)}/></mesh>
          </group>
        )}

        <mesh geometry={ModelTypeGeometryNodes(model_type)}>
          <meshStandardMaterial color={"#ffa463"} emissive={"rgb(255, 206, 166)"} emissiveIntensity={GhostModelBloomValue(prebuilt_base)} transparent={true} opacity={0.5} wireframe={wireframe_enabled}/>
        </mesh>
      </>
    );
  }

  //prettier-ignore
  useEffect(() => {
    switch (model_type) {
      case "StoneWallHigh": case "MetalWallHigh": case "ArmoredWallHigh": case "StoneWallMid": case "MetalWallMid": case "ArmoredWallMid": case "StoneWallLow":
      case "MetalWallLow": case "ArmoredWallLow": case "StoneDoorway": case "MetalDoorway": case "ArmoredDoorway": case "StoneWindow": case "MetalWindow":
      case "ArmoredWindow": case "MetalVerticalEmbrasure":
        set_enable_model_arrow(true); break;
      default:
        set_enable_model_arrow(false); break;
    }
  }, [model_type]);

  //prettier-ignore
  return (
    <>
      <group position={[model_x_position, model_y_position, model_z_position]} rotation={[0, model_y_rotation, 0]} scale={0.99}>{GhostModelGeometry(false)}</group>

      {!prebuilt_base && symmetry_x_enabled && (
        <group position={[-model_x_position, model_y_position, model_z_position]} rotation={[0, -model_y_rotation, 0]} >{GhostModelGeometry(false)}</group>
      )}
      {!prebuilt_base && symmetry_z_enabled && (
        <group position={[model_x_position, model_y_position, -model_z_position]} rotation={[0, -model_y_rotation - Math.PI, 0]} >{GhostModelGeometry(false)}</group>
      )}
      {!prebuilt_base && symmetry_z_enabled && symmetry_x_enabled && (
        <group position={[-model_x_position, model_y_position, -model_z_position]} rotation={[0, model_y_rotation + Math.PI, 0]} >{GhostModelGeometry(false)}</group>
      )}
      {!prebuilt_base && (model_offset_active || model_y_position > 0.05) && (
        <group position={[model_x_offset_position, 0, model_z_offset_position]} rotation={[0, model_y_rotation, 0]} >{GhostModelGeometry(true)}</group>
      )}


      {!prebuilt_base && (model_offset_active || model_y_position > 0.05) && symmetry_x_enabled && (
        <group position={[-model_x_offset_position, 0, model_z_offset_position]} rotation={[0, -model_y_rotation, 0]} >{GhostModelGeometry(true)}</group>
      )}
      {!prebuilt_base && (model_offset_active || model_y_position > 0) && symmetry_z_enabled && (
        <group position={[model_x_offset_position, 0, -model_z_offset_position]} rotation={[0, -model_y_rotation - Math.PI, 0]} >{GhostModelGeometry(true)}</group>
      )}
      {!prebuilt_base && (model_offset_active || model_y_position > 0) && symmetry_x_enabled && symmetry_z_enabled && (
        <group position={[-model_x_offset_position, 0, -model_z_offset_position]} rotation={[0, model_y_rotation + Math.PI, 0]} >{GhostModelGeometry(true)}</group>
      )}

    </>
  );
}

useGLTF.preload("./models/props/arrow_prop.glb");
useGLTF.preload("./models/props/foundation_square_high.glb");
useGLTF.preload("./models/props/foundation_square_mid.glb");
useGLTF.preload("./models/props/foundation_square_low.glb");
useGLTF.preload("./models/props/foundation_triangle_high.glb");
useGLTF.preload("./models/props/foundation_triangle_mid.glb");
useGLTF.preload("./models/props/foundation_triangle_low.glb");
useGLTF.preload("./models/props/wall_high.glb");
useGLTF.preload("./models/props/wall_mid.glb");
useGLTF.preload("./models/props/wall_low.glb");
useGLTF.preload("./models/props/doorway.glb");
useGLTF.preload("./models/props/window.glb");
useGLTF.preload("./models/props/wall_frame.glb");
useGLTF.preload("./models/props/stairs_l_shape.glb");
useGLTF.preload("./models/props/stairs_u_shape.glb");
useGLTF.preload("./models/props/floor_square.glb");
useGLTF.preload("./models/props/floor_triangle.glb");
useGLTF.preload("./models/props/floor_frame_square.glb");
useGLTF.preload("./models/props/floor_frame_triangle.glb");
useGLTF.preload("./models/props/roof_square.glb");
useGLTF.preload("./models/props/roof_triangle.glb");
useGLTF.preload("./models/props/roof_wall.glb");
useGLTF.preload("./models/props/metal_door.glb");
useGLTF.preload("./models/props/garage_door.glb");
useGLTF.preload("./models/props/metal_vertical_embrasure.glb");
useGLTF.preload("./models/props/strenghtened_glass_window.glb");
useGLTF.preload("./models/props/tool_cupboard.glb");
useGLTF.preload("./models/props/wood_storage_box.glb");
useGLTF.preload("./models/props/large_wood_box.glb");
useGLTF.preload("./models/props/furnace.glb");
useGLTF.preload("./models/props/workbench_t3.glb");
useGLTF.preload("./models/props/sleeping_bag.glb");

useGLTF.preload("./models/props/starter_base_2x1_prop.glb");
useGLTF.preload("./models/props/chad_cube_2x1_prop.glb");
useGLTF.preload("./models/props/hermit_prop.glb");
useGLTF.preload("./models/props/diamond_prop.glb");
useGLTF.preload("./models/props/vulcan_prop.glb");

GhostModel.displayName = "GhostModel";
