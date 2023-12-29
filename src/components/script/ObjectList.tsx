import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { set_model_type_to_create, set_model_creation_state, set_selected_object_list } from "../../Store.tsx";

import stoneFoundationSquareHighThumbnail from "../images/ObjectListThumbnails/stone_foundation_square_high_thumbnail.png";
import stoneFoundationSquareMidThumbnail from "../images/ObjectListThumbnails/stone_foundation_square_mid_thumbnail.png";
import stoneFoundationSquareLowThumbnail from "../images/ObjectListThumbnails/stone_foundation_square_low_thumbnail.png";
import stoneFoundationTriangleHighThumbnail from "../images/ObjectListThumbnails/stone_foundation_triangle_high_thumbnail.png";
import stoneFoundationTriangleMidThumbnail from "../images/ObjectListThumbnails/stone_foundation_triangle_mid_thumbnail.png";
import stoneFoundationTriangleLowThumbnail from "../images/ObjectListThumbnails/stone_foundation_triangle_low_thumbnail.png";
import stoneWallHighThumbnail from "../images/ObjectListThumbnails/stone_wall_high_thumbnail.png";
import stoneWallMidThumbnail from "../images/ObjectListThumbnails/stone_wall_mid_thumbnail.png";
import stoneWallLowThumbnail from "../images/ObjectListThumbnails/stone_wall_low_thumbnail.png";
import stoneDoorwayThumbnail from "../images/ObjectListThumbnails/stone_doorway_thumbnail.png";
import stoneWallFrameThumbnail from "../images/ObjectListThumbnails/stone_wall_frame_thumbnail.png";
import stoneWindowThumbnail from "../images/ObjectListThumbnails/stone_window_thumbnail.png";
import stoneStairsLShapeThumbnail from "../images/ObjectListThumbnails/stone_stairs_l_shape_thumbnail.png";
import stoneStairsUShapeThumbnail from "../images/ObjectListThumbnails/stone_stairs_u_shape_thumbnail.png";
import stoneFloorSquareThumbnail from "../images/ObjectListThumbnails/stone_floor_square_thumbnail.png";
import stoneFloorTriangleThumbnail from "../images/ObjectListThumbnails/stone_floor_triangle_thumbnail.png";
import stoneFloorFrameSquareThumbnail from "../images/ObjectListThumbnails/stone_floor_frame_square_thumbnail.png";
import stoneFloorFrameTriangleThumbnail from "../images/ObjectListThumbnails/stone_floor_frame_triangle_thumbnail.png";

import metalFoundationSquareHighThumbnail from "../images/ObjectListThumbnails/metal_foundation_square_high_thumbnail.png";
import metalFoundationSquareMidThumbnail from "../images/ObjectListThumbnails/metal_foundation_square_mid_thumbnail.png";
import metalFoundationSquareLowThumbnail from "../images/ObjectListThumbnails/metal_foundation_square_low_thumbnail.png";
import metalFoundationTriangleHighThumbnail from "../images/ObjectListThumbnails/metal_foundation_triangle_high_thumbnail.png";
import metalFoundationTriangleMidThumbnail from "../images/ObjectListThumbnails/metal_foundation_triangle_mid_thumbnail.png";
import metalFoundationTriangleLowThumbnail from "../images/ObjectListThumbnails/metal_foundation_triangle_low_thumbnail.png";
import metalWallHighThumbnail from "../images/ObjectListThumbnails/metal_wall_high_thumbnail.png";
import metalWallMidThumbnail from "../images/ObjectListThumbnails/metal_wall_mid_thumbnail.png";
import metalWallLowThumbnail from "../images/ObjectListThumbnails/metal_wall_low_thumbnail.png";
import metalDoorwayThumbnail from "../images/ObjectListThumbnails/metal_doorway_thumbnail.png";
import metalWallFrameThumbnail from "../images/ObjectListThumbnails/metal_wall_frame_thumbnail.png";
import metalWindowThumbnail from "../images/ObjectListThumbnails/metal_window_thumbnail.png";
import metalStairsLShapeThumbnail from "../images/ObjectListThumbnails/metal_stairs_l_shape_thumbnail.png";
import metalStairsUShapeThumbnail from "../images/ObjectListThumbnails/metal_stairs_u_shape_thumbnail.png";
import metalFloorSquareThumbnail from "../images/ObjectListThumbnails/metal_floor_square_thumbnail.png";
import metalFloorTriangleThumbnail from "../images/ObjectListThumbnails/metal_floor_triangle_thumbnail.png";
import metalFloorFrameSquareThumbnail from "../images/ObjectListThumbnails/metal_floor_frame_square_thumbnail.png";
import metalFloorFrameTriangleThumbnail from "../images/ObjectListThumbnails/metal_floor_frame_triangle_thumbnail.png";
import metalDoorThumbnail from "../images/ObjectListThumbnails/metal_door_thumbnail.png";

export default function ObjectList() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);

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

    // {
    //   name: "stone square frame",
    //   thumbnail: "",
    //   keywords: ["stone", "square", "frame", "stone square", "stone frame", "square frame"],
    //   onClick: () => {
    //     dispatch(set_model_type_to_create("StoneSquareFrame"));
    //   },
    // },

    // {
    //   name: "stone triangle frame",
    //   thumbnail: "",
    //   keywords: ["stone", "triangle", "frame", "stone triangle", "stone frame", "triangle frame"],
    //   onClick: () => {
    //     dispatch(set_model_type_to_create("StoneTriangleFrame"));
    //   },
    // },

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
      name: "metal door",
      thumbnail: metalDoorThumbnail,
      keywords: ["metal", "door", "metal door"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalDoor"));
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
        <input
          className="search_bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="object_list">
          {filteredObjectList.map((item, index) => (
            <button
              key={index}
              className={selected_object_list === index ? "object object_selected" : "object object_deselected"}
              onClick={() => {
                if (selected_object_list === index) {
                  dispatch(set_selected_object_list(-1));
                  dispatch(set_model_creation_state(false));
                } else {
                  dispatch(set_selected_object_list(index));
                  dispatch(set_model_creation_state(true));
                }
                item.onClick?.();
              }}
              style={{ backgroundImage: `url(${item.thumbnail})` }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
