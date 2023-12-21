import { useState } from "react";
import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";

import { set_model_type_to_create, set_model_creation_state } from "../../Store.tsx";

export default function ObjectList() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  const [selected_object_list, set_selected_object_list] = useState<number>(-1);

  const object_list = [
    // { name: "twig_foundation_low", thumbnail: "", id: "FL0" },
    // { name: "twig_foundation_mid", thumbnail: "", id: "FM0" },
    // { name: "twig_foundation_high", thumbnail: "", id: "FH0" },

    // { name: "wooden_foundation_low", thumbnail: "", id: "FL1" },
    // { name: "wooden_foundation_mid", thumbnail: "", id: "FM1" },
    // { name: "wooden_foundation_high", thumbnail: "", id: "FH1" },

    // { name: "stone_foundation_low", thumbnail: "", id: "FL2" },

    {
      name: "stone foundation square (mid)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareMid"));
      },
    },

    {
      name: "stone foundation square (high)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareHigh"));
      },
    },

    // { name: "metal_foundation_low", thumbnail: "", id: "FL3" },
    // { name: "metal_foundation_mid", thumbnail: "", id: "FM3" },
    // { name: "metal_foundation_high", thumbnail: "", id: "FH3" },

    // { name: "armored_foundation_low", thumbnail: "", id: "FL4" },
    // { name: "armored_foundation_mid", thumbnail: "", id: "FM4" },
    // { name: "armored_foundation_high", thumbnail: "", id: "FH4" },

    // { name: "twig_wall", thumbnail: "", id: "W0" },
    // { name: "wooden_wall", thumbnail: "", id: "W1" },
    // { name: "stone_wall", thumbnail: "", id: "W2" },
    // { name: "metal_wall", thumbnail: "", id: "W3" },
    // { name: "armored_wall", thumbnail: "", id: "W4" },

    {
      name: "stone wall (high)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneWallHigh"));
      },
    },
  ];

  return (
    <>
      <div
        className={
          page_mode === "edit"
            ? "objects_container objects_container_displayed"
            : "objects_container objects_container_hidden"
        }
      >
        <div className="object_list">
          {object_list.map((item, index) => (
            <button
              key={index}
              className={selected_object_list === index ? "object object_selected" : "object object_deselected"}
              onClick={() => {
                if (selected_object_list === index) {
                  set_selected_object_list(-1);
                  dispatch(set_model_creation_state(false));
                } else {
                  set_selected_object_list(index);
                  dispatch(set_model_creation_state(true));
                }
                item.onClick?.();
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
