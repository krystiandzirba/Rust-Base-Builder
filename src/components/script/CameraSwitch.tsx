import { useDispatch } from "react-redux";
import { set_camera_type } from "../../Store.tsx";

import { store } from "../../Store.tsx";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function CameraType() {
  const dispatch = useDispatch();

  const camera_type = useSelector((state: RootState) => state.cameraType.camera_type);
  const [camera_switch_text, set_camera_switch_text] = useState<string>("3D camera");

  return (
    <>
      <div
        className="camera_switch_button"
        onClick={() => {
          if (camera_type === "3D_PerspectiveCamera") {
            dispatch(set_camera_type("2D_OrtographicCamera")), console.log(store.getState());
            set_camera_switch_text("2D camera");
          } else if (camera_type === "2D_OrtographicCamera") {
            dispatch(set_camera_type("3D_PerspectiveCamera")), console.log(store.getState());
            set_camera_switch_text("3D camera");
          }
        }}
      >
        {camera_switch_text}
      </div>
    </>
  );
}
