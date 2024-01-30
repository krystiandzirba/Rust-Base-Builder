import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { set_model_type_to_create, set_model_creation_state, set_selected_object_list } from "../../Store.tsx";

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
import stoneWallFrameThumbnail from "../../object_list_thumbnails/stone_wall_frame_thumbnail.png";
import stoneWindowThumbnail from "../../object_list_thumbnails/stone_window_thumbnail.png";
import stoneStairsLShapeThumbnail from "../../object_list_thumbnails/stone_stairs_l_shape_thumbnail.png";
import stoneStairsUShapeThumbnail from "../../object_list_thumbnails/stone_stairs_u_shape_thumbnail.png";
import stoneFloorSquareThumbnail from "../../object_list_thumbnails/stone_floor_square_thumbnail.png";
import stoneFloorTriangleThumbnail from "../../object_list_thumbnails/stone_floor_triangle_thumbnail.png";
import stoneFloorFrameSquareThumbnail from "../../object_list_thumbnails/stone_floor_frame_square_thumbnail.png";
import stoneFloorFrameTriangleThumbnail from "../../object_list_thumbnails/stone_floor_frame_triangle_thumbnail.png";
import stoneRoofSquareThumbnail from "../../object_list_thumbnails/stone_roof_square_thumbnail.png";
import stoneRoofTriangleThumbnail from "../../object_list_thumbnails/stone_roof_triangle_thumbnail.png";

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
import metalWallFrameThumbnail from "../../object_list_thumbnails/metal_wall_frame_thumbnail.png";
import metalWindowThumbnail from "../../object_list_thumbnails/metal_window_thumbnail.png";
import metalStairsLShapeThumbnail from "../../object_list_thumbnails/metal_stairs_l_shape_thumbnail.png";
import metalStairsUShapeThumbnail from "../../object_list_thumbnails/metal_stairs_u_shape_thumbnail.png";
import metalFloorSquareThumbnail from "../../object_list_thumbnails/metal_floor_square_thumbnail.png";
import metalFloorTriangleThumbnail from "../../object_list_thumbnails/metal_floor_triangle_thumbnail.png";
import metalFloorFrameSquareThumbnail from "../../object_list_thumbnails/metal_floor_frame_square_thumbnail.png";
import metalFloorFrameTriangleThumbnail from "../../object_list_thumbnails/metal_floor_frame_triangle_thumbnail.png";
import metalRoofSquareThumbnail from "../../object_list_thumbnails/metal_roof_square_thumbnail.png";
import metalRoofTriangleThumbnail from "../../object_list_thumbnails/metal_roof_triangle_thumbnail.png";

import metalDoorThumbnail from "../../object_list_thumbnails/metal_door_thumbnail.png";
import garageDoorThumbnail from "../../object_list_thumbnails/garage_door_thumbnail.png";

import metalVerticalEmbrasureThumbnail from "../../object_list_thumbnails/metal_vertical_embrasure_thumbnail.png";
import strenghtenedGlassWindowThumbnail from "../../object_list_thumbnails/strenghtened_glass_window_thumbnail.png";

import toolCupboardThumbnail from "../../object_list_thumbnails/tool_cupboard_thumbnail.png";
import woodStorageBoxThumbnail from "../../object_list_thumbnails/wood_storage_box_thumbnail.png";
import largeWoodBoxThumbnail from "../../object_list_thumbnails/large_wood_box_thumbnail.png";
import furnaceThumbnail from "../../object_list_thumbnails/furnace_thumbnail.png";
import workbench_t3_Thumbnail from "../../object_list_thumbnails/workbench_3_thumbnail.png";

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AudioPlayer } from "./AudioPlayer.tsx";
import object_selecting_sound from "../../../public/audio/object_selecting_sound.mp3";
import object_hover_sound from "../../../public/audio/object_hover_sound.mp3";

const SearchBarField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#ffcea6",
  },
  "& label": {
    color: "#bbbbbb",
  },
  "& input": {
    color: "#bbbbbb",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffcea6",
  },
  "& .MuiOutlinedInput-root": {
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
  return <SearchBarField className="search_bar" label="Search..." type="search" value={value} onChange={onChange} />;
};

export default function ObjectList() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [hovered_object_list, set_hovered_object_list] = useState<number>(-1);

  const object_list = [
    {
      name: "stone foundation square (high)",
      thumbnail: stoneFoundationSquareHighThumbnail,
      keywords: [
        "stone",
        "foundation",
        "square",
        "high",
        "stone foundation",
        "stone square",
        "stone high",
        "foundation square",
        "foundation high",
        "square high",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareHigh"));
      },
    },

    {
      name: "stone foundation square (mid)",
      thumbnail: stoneFoundationSquareMidThumbnail,
      keywords: [
        "stone",
        "foundation",
        "square",
        "mid",
        "stone foundation",
        "stone square",
        "stone mid",
        "foundation square",
        "foundation mid",
        "square mid ",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareMid"));
      },
    },

    {
      name: "stone foundation square (low)",
      thumbnail: stoneFoundationSquareLowThumbnail,
      keywords: [
        "stone",
        "foundation",
        "square",
        "low",
        "stone foundation",
        "stone square",
        "stone low",
        "foundation square",
        "foundation low",
        "square low",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareLow"));
      },
    },

    {
      name: "stone foundation triangle (high)",
      thumbnail: stoneFoundationTriangleHighThumbnail,
      keywords: [
        "stone",
        "foundation",
        "triangle",
        "high",
        "stone foundation",
        "stone triangle",
        "stone high",
        "foundation triangle",
        "foundation high",
        "triangle high",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationTriangleHigh"));
      },
    },

    {
      name: "stone foundation triangle (mid)",
      thumbnail: stoneFoundationTriangleMidThumbnail,
      keywords: [
        "stone",
        "foundation",
        "triangle",
        "mid",
        "stone foundation",
        "stone triangle",
        "stone mid",
        "foundation triangle",
        "foundation mid",
        "triangle mid",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationTriangleMid"));
      },
    },

    {
      name: "stone foundation triangle (low)",
      thumbnail: stoneFoundationTriangleLowThumbnail,
      keywords: [
        "stone",
        "foundation",
        "triangle",
        "low",
        "stone foundation",
        "stone triangle",
        "stone low",
        "foundation triangle",
        "foundation low",
        "triangle low",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationTriangleLow"));
      },
    },

    {
      name: "stone wall (high)",
      thumbnail: stoneWallHighThumbnail,
      keywords: ["stone", "wall", "high", "stone wall", "stone high", "wall high"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallHigh"));
      },
    },

    {
      name: "stone wall (mid)",
      thumbnail: stoneWallMidThumbnail,
      keywords: ["stone", "wall", "mid", "stone wall", "stone mid", "wall mid"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallMid"));
      },
    },

    {
      name: "stone wall (third)",
      thumbnail: stoneWallLowThumbnail,
      keywords: ["stone", "wall", "low", "stone wall", "stone low", "wall low"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallLow"));
      },
    },

    {
      name: "stone doorway",
      thumbnail: stoneDoorwayThumbnail,
      keywords: ["stone", "doorway", "stone doorway"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneDoorway"));
      },
    },

    {
      name: "stone window",
      thumbnail: stoneWindowThumbnail,
      keywords: ["stone", "wall", "window", "stone wall", "stone window", "wall window"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWindow"));
      },
    },

    {
      name: "stone stairs (L shape)",
      thumbnail: stoneStairsLShapeThumbnail,
      keywords: ["stone", "stairs", "stone stairs"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneStairsLShape"));
      },
    },
    {
      name: "stone stairs (U shape)",
      thumbnail: stoneStairsUShapeThumbnail,
      keywords: ["stone", "stairs", "stone stairs"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneStairsUShape"));
      },
    },

    {
      name: "stone wall frame",
      thumbnail: stoneWallFrameThumbnail,
      keywords: ["stone", "wall", "frame", "stone wall", "stone frame", "wall frame"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallFrame"));
      },
    },

    {
      name: "stone floor square",
      thumbnail: stoneFloorSquareThumbnail,
      keywords: ["stone", "floor", "square", "stone floor", "stone square", "floor square"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFloorSquare"));
      },
    },

    {
      name: "stone floor triangle",
      thumbnail: stoneFloorTriangleThumbnail,
      keywords: ["stone", "floor", "triangle", "stone floor", "stone triangle", "floor triangle"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFloorTriangle"));
      },
    },

    {
      name: "stone floor frame (square)",
      thumbnail: stoneFloorFrameSquareThumbnail,
      keywords: [
        "stone",
        "floor",
        "frame",
        "square",
        "stone floor",
        "stone frame",
        "stone square",
        "floor frame",
        "floor square",
        "frame square",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFloorFrameSquare"));
      },
    },

    {
      name: "stone floor frame (triangle)",
      thumbnail: stoneFloorFrameTriangleThumbnail,
      keywords: [
        "stone",
        "floor",
        "frame",
        "triangle",
        "stone floor",
        "stone frame",
        "stone triangle",
        "floor frame",
        "floor triangle",
        "frame triangle",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFloorFrameTriangle"));
      },
    },

    {
      name: "stone roof (square)",
      thumbnail: stoneRoofSquareThumbnail,
      keywords: ["stone", "roof", "square", "stone roof", "stone square", "roof square"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneRoofSquare"));
      },
    },

    {
      name: "stone roof (triangle)",
      thumbnail: stoneRoofTriangleThumbnail,
      keywords: ["stone", "roof", "triangle", "stone roof", "stone triangle", "roof triangle"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneRoofTriangle"));
      },
    },

    // metal

    {
      name: "metal foundation square (high)",
      thumbnail: metalFoundationSquareHighThumbnail,
      keywords: [
        "metal",
        "foundation",
        "square",
        "high",
        "metal foundation",
        "metal square",
        "metal high",
        "foundation square",
        "foundation high",
        "square high",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFoundationSquareHigh"));
      },
    },

    {
      name: "metal foundation square (mid)",
      thumbnail: metalFoundationSquareMidThumbnail,
      keywords: [
        "metal",
        "foundation",
        "square",
        "mid",
        "metal foundation",
        "metal square",
        "metal mid",
        "foundation square",
        "foundation mid",
        "square mid",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFoundationSquareMid"));
      },
    },

    {
      name: "metal foundation square (low)",
      thumbnail: metalFoundationSquareLowThumbnail,
      keywords: [
        "metal",
        "foundation",
        "square",
        "low",
        "metal foundation",
        "metal square",
        "metal low",
        "foundation square",
        "foundation low",
        "square low",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFoundationSquareLow"));
      },
    },

    {
      name: "metal foundation triangle (high)",
      thumbnail: metalFoundationTriangleHighThumbnail,
      keywords: [
        "metal",
        "foundation",
        "triangle",
        "high",
        "metal foundation",
        "metal triangle",
        "metal high",
        "foundation triangle",
        "foundation high",
        "triangle high",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFoundationTriangleHigh"));
      },
    },

    {
      name: "metal foundation triangle (mid)",
      thumbnail: metalFoundationTriangleMidThumbnail,
      keywords: [
        "metal",
        "foundation",
        "triangle",
        "mid",
        "metal foundation",
        "metal triangle",
        "metal mid",
        "foundation triangle",
        "foundation mid",
        "triangle mid",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFoundationTriangleMid"));
      },
    },

    {
      name: "metal foundation triangle (low)",
      thumbnail: metalFoundationTriangleLowThumbnail,
      keywords: [
        "metal",
        "foundation",
        "triangle",
        "low",
        "metal foundation",
        "metal triangle",
        "metal low",
        "foundation triangle",
        "foundation low",
        "triangle low",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFoundationTriangleLow"));
      },
    },

    {
      name: "metal wall (high)",
      thumbnail: metalWallHighThumbnail,
      keywords: ["metal", "wall", "high", "metal wall", "metal high", "wall high"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalWallHigh"));
      },
    },

    {
      name: "metal wall (mid)",
      thumbnail: metalWallMidThumbnail,
      keywords: ["metal", "wall", "mid", "metal wall", "metal mid", "wall mid"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalWallMid"));
      },
    },

    {
      name: "metal wall (low)",
      thumbnail: metalWallLowThumbnail,
      keywords: ["metal", "wall", "low", "metal wall", "metal low", "wall low"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalWallLow"));
      },
    },

    {
      name: "metal doorway",
      thumbnail: metalDoorwayThumbnail,
      keywords: ["metal", "wall", "doorway", "metal wall", "metal doorway", "wall doorway"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalDoorway"));
      },
    },

    {
      name: "metal window",
      thumbnail: metalWindowThumbnail,
      keywords: ["metal", "wall", "window", "metal wall", "metal window", "wall window"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalWindow"));
      },
    },

    {
      name: "metal stairs (L shape)",
      thumbnail: metalStairsLShapeThumbnail,
      keywords: ["metal", "stairs", "metal stairs"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalStairsLShape"));
      },
    },
    {
      name: "metal stairs (U shape)",
      thumbnail: metalStairsUShapeThumbnail,
      keywords: ["metal", "stairs", "metal stairs"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalStairsUShape"));
      },
    },

    {
      name: "metal wall frame",
      thumbnail: metalWallFrameThumbnail,
      keywords: ["metal", "wall", "frame", "metal wall", "metal frame", "wall frame"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalWallFrame"));
      },
    },

    {
      name: "metal floor square",
      thumbnail: metalFloorSquareThumbnail,
      keywords: ["metal", "floor", "square", "metal floor", "metal square", "floor square"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFloorSquare"));
      },
    },

    {
      name: "metal floor triangle",
      thumbnail: metalFloorTriangleThumbnail,
      keywords: ["metal", "floor", "triangle", "metal floor", "metal triangle", "floor triangle"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFloorTriangle"));
      },
    },

    {
      name: "metal floor frame (square)",
      thumbnail: metalFloorFrameSquareThumbnail,
      keywords: [
        "metal",
        "floor",
        "frame",
        "square",
        "metal floor",
        "metal frame",
        "metal square",
        "floor frame",
        "floor square",
        "frame square",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFloorFrameSquare"));
      },
    },

    {
      name: "metal floor frame (triangle)",
      thumbnail: metalFloorFrameTriangleThumbnail,
      keywords: [
        "metal",
        "floor",
        "frame",
        "triangle",
        "metal floor",
        "metal frame",
        "metal triangle",
        "floor frame",
        "floor triangle",
        "frame triangle",
      ],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalFloorFrameTriangle"));
      },
    },

    {
      name: "metal roof (square)",
      thumbnail: metalRoofSquareThumbnail,
      keywords: ["metal", "roof", "square", "metal roof", "metal square", "roof square"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalRoofSquare"));
      },
    },

    {
      name: "metal roof (triangle)",
      thumbnail: metalRoofTriangleThumbnail,
      keywords: ["metal", "roof", "triangle", "metal roof", "metal triangle", "roof triangle"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalRoofTriangle"));
      },
    },

    {
      name: "metal door",
      thumbnail: metalDoorThumbnail,
      keywords: ["metal", "door", "metal door"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalDoor"));
      },
    },

    {
      name: "garage door",
      thumbnail: garageDoorThumbnail,
      keywords: ["garage", "door", "garage door"],
      onClick: () => {
        dispatch(set_model_type_to_create("GarageDoor"));
      },
    },

    // windows

    {
      name: "metal vertical embrasure",
      thumbnail: metalVerticalEmbrasureThumbnail,
      keywords: ["metal", "vertical", "embrasure", "metal vertical embrasure", "window", "metal window"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalVerticalEmbrasure"));
      },
    },

    {
      name: "strenghtened glass window",
      thumbnail: strenghtenedGlassWindowThumbnail,
      keywords: ["strenghtened", "glass", "window", "strenghtened glass window", "window"],
      onClick: () => {
        dispatch(set_model_type_to_create("StrenghtenedGlassWindow"));
      },
    },

    // miscs

    {
      name: "tool cupboard",
      thumbnail: toolCupboardThumbnail,
      keywords: ["tool", "cup", "board", "cupboard", "tool cupboard"],
      onClick: () => {
        dispatch(set_model_type_to_create("ToolCupboard"));
      },
    },

    {
      name: "wood storage box",
      thumbnail: woodStorageBoxThumbnail,
      keywords: ["wood", "storage", "box", "wood storage", "wood box", "storage box"],
      onClick: () => {
        dispatch(set_model_type_to_create("WoodStorageBox"));
      },
    },

    {
      name: "large wood box",
      thumbnail: largeWoodBoxThumbnail,
      keywords: ["large", "wood", "box", "large wood", "large box", "wood box"],
      onClick: () => {
        dispatch(set_model_type_to_create("LargeWoodBox"));
      },
    },

    {
      name: "furnace",
      thumbnail: furnaceThumbnail,
      keywords: ["furnace"],
      onClick: () => {
        dispatch(set_model_type_to_create("Furnace"));
      },
    },

    {
      name: "workbench T3",
      thumbnail: workbench_t3_Thumbnail,
      keywords: ["workbench", "work", "bench", "t3", "3", "workbench t3"],
      onClick: () => {
        dispatch(set_model_type_to_create("WorkbenchT3"));
      },
    },
  ];

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredObjectList = object_list.filter((item) =>
    item.keywords.some((keyword) => keyword.includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div
        className={
          page_mode === "edit"
            ? "objects_container objects_container_displayed"
            : "objects_container objects_container_hidden"
        }
      >
        <SearchBar value={searchQuery} onChange={(event: any) => setSearchQuery(event.target.value)} />
        <div className="object_list">
          {filteredObjectList.map((item, index) => (
            <button
              key={index}
              className={
                selected_object_list === index
                  ? "object object_selected"
                  : hovered_object_list === index
                  ? "object hovered_object"
                  : "object object_deselected"
              }
              onClick={() => {
                if (audio) {
                  AudioPlayer(object_selecting_sound);
                }
                if (selected_object_list === index) {
                  dispatch(set_selected_object_list(-1));
                  dispatch(set_model_creation_state(false));
                } else {
                  dispatch(set_selected_object_list(index));
                  dispatch(set_model_creation_state(true));
                }
                item.onClick?.();
              }}
              onMouseOver={() => {
                set_hovered_object_list(index);
                if (audio) {
                  AudioPlayer(object_hover_sound);
                }
              }}
              onMouseLeave={() => {
                set_hovered_object_list(-1);
              }}
              style={{ backgroundImage: `url(${item.thumbnail})` }}
            >
              <div className="object_list_description">{item.name}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
