import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {set_model_type_to_create, set_model_creation_state, set_selected_object_list, set_object_rotation_degree, set_create_prebuilt_base_state} from "../../Store.tsx"; //prettier-ignore

import stoneFoundationSquareHighThumbnail from "../../object_list_thumbnails/stone_foundation_square_high_thumbnail.png";
import stoneFoundationSquareMidThumbnail from "../../object_list_thumbnails/stone_foundation_square_mid_thumbnail.png";
import stoneFoundationSquareLowThumbnail from "../../object_list_thumbnails/stone_foundation_square_low_thumbnail.png";
import stoneFoundationTriangleHighThumbnail from "../../object_list_thumbnails/stone_foundation_triangle_high_thumbnail.png";
import stoneFoundationTriangleMidThumbnail from "../../object_list_thumbnails/stone_foundation_triangle_mid_thumbnail.png";
import stoneFoundationTriangleLowThumbnail from "../../object_list_thumbnails/stone_foundation_triangle_low_thumbnail.png";
import stoneWallHighThumbnail from "../../object_list_thumbnails/stone_wall_high_thumbnail.png";
import stoneWallMidThumbnail from "../../object_list_thumbnails/stone_wall_mid_thumbnail.png";
import stoneWallLowThumbnail from "../../object_list_thumbnails/stone_wall_low_thumbnail.png";
import stoneDoorwayThumbnail from "../../object_list_thumbnails/stone_doorway_thumbnail.png";
import stoneWindowThumbnail from "../../object_list_thumbnails/stone_window_thumbnail.png";
import stoneWallFrameThumbnail from "../../object_list_thumbnails/stone_wall_frame_thumbnail.png";
import stoneStairsLShapeThumbnail from "../../object_list_thumbnails/stone_stairs_l_shape_thumbnail.png";
import stoneStairsUShapeThumbnail from "../../object_list_thumbnails/stone_stairs_u_shape_thumbnail.png";
import stoneFloorSquareThumbnail from "../../object_list_thumbnails/stone_floor_square_thumbnail.png";
import stoneFloorTriangleThumbnail from "../../object_list_thumbnails/stone_floor_triangle_thumbnail.png";
import stoneFloorFrameSquareThumbnail from "../../object_list_thumbnails/stone_floor_frame_square_thumbnail.png";
import stoneFloorFrameTriangleThumbnail from "../../object_list_thumbnails/stone_floor_frame_triangle_thumbnail.png";
import stoneRoofSquareThumbnail from "../../object_list_thumbnails/stone_roof_square_thumbnail.png";
import stoneRoofTriangleThumbnail from "../../object_list_thumbnails/stone_roof_triangle_thumbnail.png";
import stoneRoofWallRight from "../../object_list_thumbnails/stone_roof_wall_right_thumbnail.png";
import stoneRoofWallLeft from "../../object_list_thumbnails/stone_roof_wall_left_thumbnail.png";

import metalFoundationSquareHighThumbnail from "../../object_list_thumbnails/metal_foundation_square_high_thumbnail.png";
import metalFoundationSquareMidThumbnail from "../../object_list_thumbnails/metal_foundation_square_mid_thumbnail.png";
import metalFoundationSquareLowThumbnail from "../../object_list_thumbnails/metal_foundation_square_low_thumbnail.png";
import metalFoundationTriangleHighThumbnail from "../../object_list_thumbnails/metal_foundation_triangle_high_thumbnail.png";
import metalFoundationTriangleMidThumbnail from "../../object_list_thumbnails/metal_foundation_triangle_mid_thumbnail.png";
import metalFoundationTriangleLowThumbnail from "../../object_list_thumbnails/metal_foundation_triangle_low_thumbnail.png";
import metalWallHighThumbnail from "../../object_list_thumbnails/metal_wall_high_thumbnail.png";
import metalWallMidThumbnail from "../../object_list_thumbnails/metal_wall_mid_thumbnail.png";
import metalWallLowThumbnail from "../../object_list_thumbnails/metal_wall_low_thumbnail.png";
import metalDoorwayThumbnail from "../../object_list_thumbnails/metal_doorway_thumbnail.png";
import metalWindowThumbnail from "../../object_list_thumbnails/metal_window_thumbnail.png";
import metalWallFrameThumbnail from "../../object_list_thumbnails/metal_wall_frame_thumbnail.png";
import metalStairsLShapeThumbnail from "../../object_list_thumbnails/metal_stairs_l_shape_thumbnail.png";
import metalStairsUShapeThumbnail from "../../object_list_thumbnails/metal_stairs_u_shape_thumbnail.png";
import metalFloorSquareThumbnail from "../../object_list_thumbnails/metal_floor_square_thumbnail.png";
import metalFloorTriangleThumbnail from "../../object_list_thumbnails/metal_floor_triangle_thumbnail.png";
import metalFloorFrameSquareThumbnail from "../../object_list_thumbnails/metal_floor_frame_square_thumbnail.png";
import metalFloorFrameTriangleThumbnail from "../../object_list_thumbnails/metal_floor_frame_triangle_thumbnail.png";
import metalRoofSquareThumbnail from "../../object_list_thumbnails/metal_roof_square_thumbnail.png";
import metalRoofTriangleThumbnail from "../../object_list_thumbnails/metal_roof_triangle_thumbnail.png";
import metalRoofWallRight from "../../object_list_thumbnails/metal_roof_wall_right_thumbnail.png";
import metalRoofWallLeft from "../../object_list_thumbnails/metal_roof_wall_left_thumbnail.png";

import armoredFoundationSquareHighThumbnail from "../../object_list_thumbnails/armored_foundation_square_high_thumbnail.png";
import armoredFoundationSquareMidThumbnail from "../../object_list_thumbnails/armored_foundation_square_mid_thumbnail.png";
import armoredFoundationSquareLowThumbnail from "../../object_list_thumbnails/armored_foundation_square_low_thumbnail.png";
import armoredFoundationTriangleHighThumbnail from "../../object_list_thumbnails/armored_foundation_triangle_high_thumbnail.png";
import armoredFoundationTriangleMidThumbnail from "../../object_list_thumbnails/armored_foundation_triangle_mid_thumbnail.png";
import armoredFoundationTriangleLowThumbnail from "../../object_list_thumbnails/armored_foundation_triangle_low_thumbnail.png";
import armoredWallHighThumbnail from "../../object_list_thumbnails/armored_wall_high_thumbnail.png";
import armoredWallMidThumbnail from "../../object_list_thumbnails/armored_wall_mid_thumbnail.png";
import armoredWallLowThumbnail from "../../object_list_thumbnails/armored_wall_low_thumbnail.png";
import armoredDoorwayThumbnail from "../../object_list_thumbnails/armored_doorway_thumbnail.png";
import armoredWindowThumbnail from "../../object_list_thumbnails/armored_window_thumbnail.png";
import armoredWallFrameThumbnail from "../../object_list_thumbnails/armored_wall_frame_thumbnail.png";
import armoredStairsLShapeThumbnail from "../../object_list_thumbnails/armored_stairs_l_shape_thumbnail.png";
import armoredStairsUShapeThumbnail from "../../object_list_thumbnails/armored_stairs_u_shape_thumbnail.png";
import armoredFloorFrameSquareThumbnail from "../../object_list_thumbnails/armored_floor_frame_square_thumbnail.png";
import armoredFloorFrameTriangleThumbnail from "../../object_list_thumbnails/armored_floor_frame_triangle_thumbnail.png";
import armoredFloorSquareThumbnail from "../../object_list_thumbnails/armored_floor_square_thumbnail.png";
import armoredFloorTriangleThumbnail from "../../object_list_thumbnails/armored_floor_triangle_thumbnail.png";
import armoredRoofSquareThumbnail from "../../object_list_thumbnails/armored_roof_square_thumbnail.png";
import armoredRoofTriangleThumbnail from "../../object_list_thumbnails/armored_roof_triangle_thumbnail.png";
import armoredRoofWallRightThumbnail from "../../object_list_thumbnails/armored_roof_wall_right_thumbnail.png";
import armoredRoofWallLeftThumbnail from "../../object_list_thumbnails/armored_roof_wall_left_thumbnail.png";

import metalDoorThumbnail from "../../object_list_thumbnails/metal_door_thumbnail.png";
import garageDoorThumbnail from "../../object_list_thumbnails/garage_door_thumbnail.png";

import metalVerticalEmbrasureThumbnail from "../../object_list_thumbnails/metal_vertical_embrasure_thumbnail.png";
import strenghtenedGlassWindowThumbnail from "../../object_list_thumbnails/strenghtened_glass_window_thumbnail.png";

import toolCupboardThumbnail from "../../object_list_thumbnails/tool_cupboard_thumbnail.png";
import woodStorageBoxThumbnail from "../../object_list_thumbnails/wood_storage_box_thumbnail.png";
import largeWoodBoxThumbnail from "../../object_list_thumbnails/large_wood_box_thumbnail.png";
import furnaceThumbnail from "../../object_list_thumbnails/furnace_thumbnail.png";
import workbench_t3_Thumbnail from "../../object_list_thumbnails/workbench_3_thumbnail.png";
import sleeping_bag_Thumbnail from "../../object_list_thumbnails/sleeping_bag_thumbnail.png";

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useAudioPlayer } from "./AudioPlayer.tsx";

const SearchBarField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#ffcea6",
  },
  "& label": {
    color: "#bbbbbb",
    fontSize: "calc(0.7vw + 0.4vh)",
  },
  "& input": {
    color: "#bbbbbb",
    height: "30%",
    boxSizing: "border-box",
    fontSize: "calc(0.7vw + 0.4vh)",
    textAlign: "center",
  },
  "& .MuiInputBase-input": {
    height: "30%",
    fontSize: "calc(0.7vw + 0.4vh)",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffcea6",
  },
  "& .MuiOutlinedInput-root": {
    height: "30%",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#ffe9d6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffcea6",
    },
  },
});

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchBarField className="search_bar" label="Search model..." type="search" value={value} onChange={onChange} />
  );
};

//? ----------------------------------------------------------------------------------------------------

//? This component provides a searchable list of all 3D objects available for user interaction.

//? ----------------------------------------------------------------------------------------------------

export default function ObjectList() {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);
  const allow_canvas_interaction_after_first_load = useSelector((state: RootState) => state.modelsData.allow_canvas_interaction_after_first_load); //prettier-ignore

  const [hovered_object_list, set_hovered_object_list] = useState<number>(-1);

  const create_object_list_item = (name: string, thumbnail: string, keywords: string[], modelType: string) => ({
    name,
    thumbnail,
    keywords,
    onClick: () => {
      dispatch(set_model_type_to_create(modelType));
    },
  });

  const object_list_keywords = (material: string, type: string, shape: string, height: string) => {
    const keywords = [
      material,
      type,
      shape,
      height,
      `${material} ${type}`,
      `${material} ${shape}`,
      `${material} ${height}`,
      `${type} ${shape}`,
      `${type} ${height}`,
      `${shape} ${height}`,
      `${material} ${type} ${shape}`,
      `${material} ${type} ${height}`,
      `${material} ${shape} ${height}`,
      `${type} ${shape} ${height}`,
      `${material} ${shape} ${type}`,
      `${material} ${height} ${type}`,
      `${material} ${height} ${shape}`,
      `${type} ${shape} ${material}`,
      `${type} ${height} ${material}`,
      `${type} ${height} ${shape}`,
      `${shape} ${height} ${material}`,
      `${shape} ${material} ${type}`,
      `${shape} ${type} ${material}`,
      `${height} ${type} ${shape}`,
      `${height} ${shape} ${material}`,
      `${height} ${material} ${type}`,
      `${height} ${material} ${shape}`,
      `${height} ${shape} ${type}`,
      `${shape} ${material} ${height}`,
      `${type} ${material} ${shape}`,
      `${type} ${shape} ${height}`,
      `${shape} ${height} ${type}`,
      `${material} ${shape} ${height} ${type}`,
      `${material} ${height} ${shape} ${type}`,
      `${material} ${type} ${height} ${shape}`,
      `${type} ${material} ${height} ${shape}`,
      `${type} ${shape} ${material} ${height}`,
      `${shape} ${type} ${height} ${material}`,
      `${shape} ${height} ${type} ${material}`,
      `${height} ${shape} ${type} ${material}`,
      `${height} ${type} ${material} ${shape}`,
      `${height} ${material} ${shape} ${type}`,
      `${shape} ${material} ${height} ${type}`,
      `${type} ${shape} ${height} ${material}`,
    ];

    return keywords.filter(Boolean);
  };

  const object_list = [
    //stone

    create_object_list_item("stone foundation square (high)", stoneFoundationSquareHighThumbnail, object_list_keywords("stone", "foundation", "square", "high"), "StoneFoundationSquareHigh"), // prettier-ignore
    create_object_list_item("stone foundation square (mid)", stoneFoundationSquareMidThumbnail, object_list_keywords("stone", "foundation", "square", "mid"), "StoneFoundationSquareMid"), // prettier-ignore
    create_object_list_item("stone foundation square (low)", stoneFoundationSquareLowThumbnail, object_list_keywords("stone", "foundation", "square", "low"), "StoneFoundationSquareLow"), // prettier-ignore
    create_object_list_item("stone foundation triangle (high)", stoneFoundationTriangleHighThumbnail, object_list_keywords("stone", "foundation", "triangle", "high"), "StoneFoundationTriangleHigh"), // prettier-ignore
    create_object_list_item("stone foundation triangle (mid)", stoneFoundationTriangleMidThumbnail, object_list_keywords("stone", "foundation", "triangle", "mid"), "StoneFoundationTriangleMid"), // prettier-ignore
    create_object_list_item("stone foundation triangle (low)", stoneFoundationTriangleLowThumbnail, object_list_keywords("stone", "foundation", "triangle", "low"), "StoneFoundationTriangleLow"), // prettier-ignore
    create_object_list_item("stone wall (high)", stoneWallHighThumbnail, object_list_keywords("stone", "wall", "", "high"), "StoneWallHigh"), // prettier-ignore
    create_object_list_item("stone wall (mid)", stoneWallMidThumbnail, object_list_keywords("stone", "wall", "", "mid"), "StoneWallMid"), // prettier-ignore
    create_object_list_item("stone wall (low)", stoneWallLowThumbnail, object_list_keywords("stone", "wall", "", "low"), "StoneWallLow"), // prettier-ignore
    create_object_list_item("stone doorway", stoneDoorwayThumbnail, object_list_keywords("stone", "doorway", "", ""), "StoneDoorway"), // prettier-ignore
    create_object_list_item("stone window", stoneWindowThumbnail, object_list_keywords("stone", "window", "wall", ""), "StoneWindow"), // prettier-ignore
    create_object_list_item("stone wall frame", stoneWallFrameThumbnail, object_list_keywords("stone", "wall", "frame", ""), "StoneWallFrame"), // prettier-ignore
    create_object_list_item("stone stairs (L shape)", stoneStairsLShapeThumbnail, object_list_keywords("stone", "stairs", "L shape", ""), "StoneStairsLShape"), // prettier-ignore
    create_object_list_item("stone stairs (U shape)", stoneStairsUShapeThumbnail, object_list_keywords("stone", "stairs", "U shape", ""), "StoneStairsUShape"), // prettier-ignore
    create_object_list_item("stone floor square", stoneFloorSquareThumbnail, object_list_keywords("stone", "floor", "square", ""), "StoneFloorSquare"), // prettier-ignore
    create_object_list_item("stone floor triangle", stoneFloorTriangleThumbnail, object_list_keywords("stone", "floor", "triangle", ""), "StoneFloorTriangle"), // prettier-ignore
    create_object_list_item("stone floor frame (square)", stoneFloorFrameSquareThumbnail, object_list_keywords("stone", "floor", "frame", "square"), "StoneFloorFrameSquare"), // prettier-ignore
    create_object_list_item("stone floor frame (triangle)", stoneFloorFrameTriangleThumbnail, object_list_keywords("stone", "floor", "frame", "triangle"), "StoneFloorFrameTriangle"), // prettier-ignore
    create_object_list_item("stone roof (square)", stoneRoofSquareThumbnail, object_list_keywords("stone", "roof", "square", ""), "StoneRoofSquare"), // prettier-ignore
    create_object_list_item("stone roof (triangle)", stoneRoofTriangleThumbnail, object_list_keywords("stone", "roof", "triangle", ""), "StoneRoofTriangle"), // prettier-ignore
    create_object_list_item("stone roof wall (left)", stoneRoofWallLeft, object_list_keywords("stone", "roof", "wall", "left"), "StoneRoofWallLeft"), // prettier-ignore
    create_object_list_item("stone roof wall (right)", stoneRoofWallRight, object_list_keywords("stone", "roof", "wall", "right"), "StoneRoofWallRight"), // prettier-ignore

    // metal

    create_object_list_item("metal foundation square (high)", metalFoundationSquareHighThumbnail, object_list_keywords("metal", "foundation", "square", "high"), "MetalFoundationSquareHigh"), // prettier-ignore
    create_object_list_item("metal foundation square (mid)", metalFoundationSquareMidThumbnail, object_list_keywords("metal", "foundation", "square", "mid"), "MetalFoundationSquareMid"), // prettier-ignore
    create_object_list_item("metal foundation square (low)", metalFoundationSquareLowThumbnail, object_list_keywords("metal", "foundation", "square", "low"), "MetalFoundationSquareLow"), // prettier-ignore
    create_object_list_item("metal foundation triangle (high)", metalFoundationTriangleHighThumbnail, object_list_keywords("metal", "foundation", "triangle", "high"), "MetalFoundationTriangleHigh"), // prettier-ignore
    create_object_list_item("metal foundation triangle (mid)", metalFoundationTriangleMidThumbnail, object_list_keywords("metal", "foundation", "triangle", "mid"), "MetalFoundationTriangleMid"), // prettier-ignore
    create_object_list_item("metal foundation triangle (low)", metalFoundationTriangleLowThumbnail, object_list_keywords("metal", "foundation", "triangle", "low"), "MetalFoundationTriangleLow"), // prettier-ignore
    create_object_list_item("metal wall (high)", metalWallHighThumbnail, object_list_keywords("metal", "wall", "", "high"), "MetalWallHigh"), // prettier-ignore
    create_object_list_item("metal wall (mid)", metalWallMidThumbnail, object_list_keywords("metal", "wall", "", "mid"), "MetalWallMid"), // prettier-ignore
    create_object_list_item("metal wall (low)", metalWallLowThumbnail, object_list_keywords("metal", "wall", "", "low"), "MetalWallLow"), // prettier-ignore
    create_object_list_item("metal doorway", metalDoorwayThumbnail, object_list_keywords("metal", "doorway", "", ""), "MetalDoorway"), // prettier-ignore
    create_object_list_item("metal window", metalWindowThumbnail, object_list_keywords("metal", "window", "wall", ""), "MetalWindow"), // prettier-ignore
    create_object_list_item("metal wall frame", metalWallFrameThumbnail, object_list_keywords("metal", "wall", "frame", ""), "MetalWallFrame"), // prettier-ignore
    create_object_list_item("metal stairs (L shape)", metalStairsLShapeThumbnail, object_list_keywords("metal", "stairs", "L shape", ""), "MetalStairsLShape"), // prettier-ignore
    create_object_list_item("metal stairs (U shape)", metalStairsUShapeThumbnail, object_list_keywords("metal", "stairs", "U shape", ""), "MetalStairsUShape"), // prettier-ignore
    create_object_list_item("metal floor square", metalFloorSquareThumbnail, object_list_keywords("metal", "floor", "square", ""), "MetalFloorSquare"), // prettier-ignore
    create_object_list_item("metal floor triangle", metalFloorTriangleThumbnail, object_list_keywords("metal", "floor", "triangle", ""), "MetalFloorTriangle"), // prettier-ignore
    create_object_list_item("metal floor frame (square)", metalFloorFrameSquareThumbnail, object_list_keywords("metal", "floor", "frame", "square"), "MetalFloorFrameSquare"), // prettier-ignore
    create_object_list_item("metal floor frame (triangle)", metalFloorFrameTriangleThumbnail, object_list_keywords("metal", "floor", "frame", "triangle"), "MetalFloorFrameTriangle"), // prettier-ignore
    create_object_list_item("metal roof (square)", metalRoofSquareThumbnail, object_list_keywords("metal", "roof", "square", ""), "MetalRoofSquare"), // prettier-ignore
    create_object_list_item("metal roof (triangle)", metalRoofTriangleThumbnail, object_list_keywords("metal", "roof", "triangle", ""), "MetalRoofTriangle"), // prettier-ignore
    create_object_list_item("metal roof wall (left)", metalRoofWallLeft, object_list_keywords("metal", "roof", "wall", "left"), "MetalRoofWallLeft"), // prettier-ignore
    create_object_list_item("metal roof wall (right)", metalRoofWallRight, object_list_keywords("metal", "roof", "wall", "right"), "MetalRoofWallRight"), // prettier-ignore

    // armored

    create_object_list_item("armored found. square (high)", armoredFoundationSquareHighThumbnail, object_list_keywords("armored", "foundation", "square", "high"), "ArmoredFoundationSquareHigh"), // prettier-ignore
    create_object_list_item("armored found. square (mid)", armoredFoundationSquareMidThumbnail, object_list_keywords("armored", "foundation", "square", "mid"), "ArmoredFoundationSquareMid"), // prettier-ignore
    create_object_list_item("armored found. square (low)", armoredFoundationSquareLowThumbnail, object_list_keywords("armored", "foundation", "square", "low"), "ArmoredFoundationSquareLow"), // prettier-ignore
    create_object_list_item("armored found. triangle (high)", armoredFoundationTriangleHighThumbnail, object_list_keywords("armored", "foundation", "triangle", "high"), "ArmoredFoundationTriangleHigh"), // prettier-ignore
    create_object_list_item("armored found. triangle (mid)", armoredFoundationTriangleMidThumbnail, object_list_keywords("armored", "foundation", "triangle", "mid"), "ArmoredFoundationTriangleMid"), // prettier-ignore
    create_object_list_item("armored found. triangle (low)", armoredFoundationTriangleLowThumbnail, object_list_keywords("armored", "foundation", "triangle", "low"), "ArmoredFoundationTriangleLow"), // prettier-ignore
    create_object_list_item("armored wall (high)", armoredWallHighThumbnail, object_list_keywords("armored", "wall", "", "high"), "ArmoredWallHigh"), // prettier-ignore
    create_object_list_item("armored wall (mid)", armoredWallMidThumbnail, object_list_keywords("armored", "wall", "", "mid"), "ArmoredWallMid"), // prettier-ignore
    create_object_list_item("armored wall (low)", armoredWallLowThumbnail, object_list_keywords("armored", "wall", "", "low"), "ArmoredWallLow"), // prettier-ignore
    create_object_list_item("armored doorway", armoredDoorwayThumbnail, object_list_keywords("armored", "wall", "doorway", ""), "ArmoredDoorway"), // prettier-ignore
    create_object_list_item("armored window", armoredWindowThumbnail, object_list_keywords("armored", "wall", "window", ""), "ArmoredWindow"), // prettier-ignore
    create_object_list_item("armored wall frame", armoredWallFrameThumbnail, object_list_keywords("armored", "wall", "frame", ""), "ArmoredWallFrame"), // prettier-ignore
    create_object_list_item("armored stairs (L shape)", armoredStairsLShapeThumbnail, object_list_keywords("armored", "stairs", "L shape", ""), "ArmoredStairsLShape"), // prettier-ignore
    create_object_list_item("armored stairs (U shape)", armoredStairsUShapeThumbnail, object_list_keywords("armored", "stairs", "U shape", ""), "ArmoredStairsUShape"), // prettier-ignore
    create_object_list_item("armored floor square", armoredFloorSquareThumbnail, object_list_keywords("armored", "floor", "square", ""), "ArmoredFloorSquare"), // prettier-ignore
    create_object_list_item("armored floor triangle", armoredFloorTriangleThumbnail, object_list_keywords("armored", "floor", "triangle", ""), "ArmoredFloorTriangle"), // prettier-ignore
    create_object_list_item("armored floor frame (square)", armoredFloorFrameSquareThumbnail, object_list_keywords("armored", "floor", "frame", "square"), "ArmoredFloorFrameSquare"), // prettier-ignore
    create_object_list_item("armored floor frame (triangle)", armoredFloorFrameTriangleThumbnail, object_list_keywords("armored", "floor", "frame", "triangle"), "ArmoredFloorFrameTriangle"), // prettier-ignore
    create_object_list_item("armored roof (square)", armoredRoofSquareThumbnail, object_list_keywords("armored", "roof", "square", ""), "ArmoredRoofSquare"), // prettier-ignore
    create_object_list_item("armored roof (triangle)", armoredRoofTriangleThumbnail, object_list_keywords("armored", "roof", "triangle", ""), "ArmoredRoofTriangle"), // prettier-ignore
    create_object_list_item("armored roof wall (left)", armoredRoofWallLeftThumbnail, object_list_keywords("armored", "roof", "wall", "left"), "ArmoredRoofWallLeft"), // prettier-ignore
    create_object_list_item("armored roof wall (right)", armoredRoofWallRightThumbnail, object_list_keywords("armored", "roof", "wall", "right"), "ArmoredRoofWallRight"), // prettier-ignore

    // doors

    create_object_list_item("metal door", metalDoorThumbnail, object_list_keywords("metal", "door", "", ""), "MetalDoor"), // prettier-ignore
    create_object_list_item("garage door", garageDoorThumbnail, object_list_keywords("garage", "door", "", ""), "GarageDoor"), // prettier-ignore

    // windows

    create_object_list_item("metal vertical embrasure", metalVerticalEmbrasureThumbnail, object_list_keywords("metal", "vertical", "embrasure", ""), "MetalVerticalEmbrasure"), // prettier-ignore
    create_object_list_item("strenghtened glass window", strenghtenedGlassWindowThumbnail, object_list_keywords("strenghtened", "glass", "window", ""), "StrenghtenedGlassWindow"), // prettier-ignore

    // miscs

    create_object_list_item("tool cupboard", toolCupboardThumbnail, object_list_keywords("tool", "cupboard", "", ""), "ToolCupboard"), // prettier-ignore
    create_object_list_item("wood storage box", woodStorageBoxThumbnail, object_list_keywords("wood", "storage", "box", ""), "WoodStorageBox"), // prettier-ignore
    create_object_list_item("large wood box", largeWoodBoxThumbnail, object_list_keywords("large", "wood", "box", ""), "LargeWoodBox"), // prettier-ignore
    create_object_list_item("furnace", furnaceThumbnail, object_list_keywords("furnace", "", "", ""), "Furnace"), // prettier-ignore
    create_object_list_item("workbench T3", workbench_t3_Thumbnail, object_list_keywords("workbench", "t3", "", ""), "WorkbenchT3"), // prettier-ignore
    create_object_list_item("sleeping bag", sleeping_bag_Thumbnail, object_list_keywords("sleeping", "bag", "", ""), "SleepingBag"), // prettier-ignore
  ];

  const [search_querry, set_search_querry] = useState<string>("");

  const filtered_object_list = object_list.filter((item) =>
    item.keywords.some((keyword) => keyword.includes(search_querry.toLowerCase()))
  );

  //prettier-ignore
  function ObjectListMouseClick(index: number, item: { name?: string; thumbnail?: string; keywords?: string[]; onClick: any }) {
    if (allow_canvas_interaction_after_first_load) {
      playSound("object_selecting_sound");
      if (selected_object_list === index) {
        dispatch(set_selected_object_list(-1));
        dispatch(set_model_creation_state(false));
      } else {
        dispatch(set_create_prebuilt_base_state(false));
        dispatch(set_selected_object_list(index));
        dispatch(set_model_creation_state(true));
        dispatch(set_object_rotation_degree(90));
      }
      item.onClick?.();
    }
  }

  function ObjectListMouseEnter(index: number) {
    if (allow_canvas_interaction_after_first_load) {
      set_hovered_object_list(index);
      playSound("object_hover_sound");
    }
  }

  function ObjectListMouseLeave() {
    if (allow_canvas_interaction_after_first_load) {
      set_hovered_object_list(-1);
    }
  }

  //* ------------------------- ↓ Prevent unwanted keyboard input ↓ -------------------------
  // deselect the current object on search bar input

  // prevent the Space and Enter buttons to enable-disable the object list items, if the Search bar is empty
  // (selecting-deselecting with these two inputs was possible)

  useEffect(() => {
    dispatch(set_selected_object_list(-1));
    dispatch(set_model_creation_state(false));
    dispatch(set_model_type_to_create(""));

    const handleKeyDown = (event: any) => {
      if ((event.code === "Space" || event.code === "Enter") && search_querry === "") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [search_querry]);

  //* ------------------------- ↑ Prevent unwanted keyboard input ↑ -------------------------

  return (
    <>
      <div
        className={
          page_mode === "edit"
            ? "object_list_main_container object_list_main_container_displayed"
            : "object_list_main_container object_list_main_container_hidden"
        }
      >
        <SearchBar value={search_querry} onChange={(event: any) => set_search_querry(event.target.value)} />
        <div className="object_list">
          {filtered_object_list.map((item, index) => (
            <div
              key={index}
              className={
                !allow_canvas_interaction_after_first_load
                  ? "object_list_entity_disabled"
                  : selected_object_list === index
                  ? "object_list_entity object_list_entity_selected"
                  : hovered_object_list === index
                  ? "object_list_entity object_list_entity_hovered"
                  : "object_list_entity object_list_entity_deselected"
              }
              onClick={() => {
                ObjectListMouseClick(index, item);
              }}
              onMouseEnter={() => {
                ObjectListMouseEnter(index);
              }}
              onMouseLeave={() => {
                ObjectListMouseLeave();
              }}
            >
              <img
                className={
                  hovered_object_list === index
                    ? "object_list_entity_thumbnail object_list_entity_thumbnail_hovered"
                    : "object_list_entity_thumbnail"
                }
                src={item.thumbnail}
                alt={`${item.name} thumbnail`}
              />
              <span className="object_list_entity_description">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
