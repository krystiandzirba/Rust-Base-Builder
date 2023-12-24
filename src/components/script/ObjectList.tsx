import { useState } from "react";
import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";

import { set_model_type_to_create, set_model_creation_state } from "../../Store.tsx";

export default function ObjectList() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  const [selected_object_list, set_selected_object_list] = useState<number>(-1);

  const object_list = [
    {
      name: "stone foundation square (high)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareHigh"));
      },
    },

    {
      name: "stone foundation square (mid)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareMid"));
      },
    },

    {
      name: "stone foundation square (low)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationSquareLow"));
      },
    },

    {
      name: "stone foundation triangle (high)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationTriangleHigh"));
      },
    },

    {
      name: "stone foundation triangle (mid)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationTriangleMid"));
      },
    },

    {
      name: "stone foundation triangle (low)",
      thumbnail: "",
      onClick: () => {
        dispatch(set_model_type_to_create("StoneFoundationTriangleLow"));
      },
    },

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
