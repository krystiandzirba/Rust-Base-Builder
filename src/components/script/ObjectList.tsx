import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { set_model_type_to_create, set_model_creation_state, set_selected_object_list } from "../../Store.tsx";

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

export default function ObjectList() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const selected_object_list = useSelector((state: RootState) => state.modelsData.selected_object_list);

  const object_list = [
    {
      name: "stone foundation square (high)",
      thumbnail: "",
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
      thumbnail: "",
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
      thumbnail: "",
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
      thumbnail: "",
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
      thumbnail: "",
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
      thumbnail: "",
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
      thumbnail: "",
      keywords: ["stone", "wall", "high", "stone wall", "stone high", "wall high"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallHigh"));
      },
    },
    {
      name: "stone wall (third)",
      thumbnail: "",
      keywords: ["stone", "wall", "low", "stone wall", "stone low", "wall low"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallThird"));
      },
    },
    {
      name: "stone wall (mid)",
      thumbnail: "",
      keywords: ["stone", "wall", "mid", "stone wall", "stone mid", "wall mid"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallMid"));
      },
    },

    {
      name: "stone doorway",
      thumbnail: "",
      keywords: ["stone", "doorway", "stone doorway"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneDoorway"));
      },
    },

    {
      name: "stone wall frame",
      thumbnail: "",
      keywords: ["stone", "wall", "frame", "stone wall", "stone frame", "wall frame"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallFrame"));
      },
    },

    {
      name: "stone window",
      thumbnail: "",
      keywords: ["stone", "window", "stone window"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWindow"));
      },
    },

    {
      name: "stone stairs (L shape)",
      thumbnail: "",
      keywords: ["stone", "stairs", "stone stairs"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneStairsLShape"));
      },
    },
    {
      name: "stone stairs (U shape)",
      thumbnail: "",
      keywords: ["stone", "stairs", "stone stairs"],
      onClick: () => {
        dispatch(set_model_type_to_create("StoneStairsUShape"));
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
      name: "metal wall frame",
      thumbnail: metalWallFrameThumbnail,
      keywords: ["metal", "wall", "frame", "metal wall", "metal frame", "wall frame"],
      onClick: () => {
        dispatch(set_model_type_to_create("MetalWallFrame"));
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
