import { useDispatch } from "react-redux";
import { set_camera_type } from "../../Store.tsx";

import { store } from "../../Store.tsx";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpLong, faRightLong, faDownLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function CameraType() {
  const dispatch = useDispatch();

  const camera_type = useSelector((state: RootState) => state.cameraType.camera_type);
  const [camera_switch_text, set_camera_switch_text] = useState<string>("3D camera");
  const [camera_button_hover, set_camera_button_hover] = useState<boolean>(false);

  const [switch_button_top_hover, set_switch_button_top_hover] = useState<boolean>(false);
  const [switch_button_right_hover, set_switch_button_right_hover] = useState<boolean>(false);
  const [switch_button_down_hover, set_switch_button_down_hover] = useState<boolean>(false);
  const [switch_button_left_hover, set_switch_button_left_hover] = useState<boolean>(false);

  return (
    <>
      <button
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
        onMouseEnter={() => set_camera_button_hover(true)}
        onMouseLeave={() => set_camera_button_hover(false)}
      >
        <div>
          <FontAwesomeIcon icon={faCamera} size="3x" style={{ color: camera_button_hover ? "#d4d4d4" : "#a8a8a8" }} />
        </div>
        <div className={"camera_text"}>{camera_switch_text}</div>
      </button>
      <button
        className="camera_button_switch switch_top"
        onMouseEnter={() => set_switch_button_top_hover(true)}
        onMouseLeave={() => set_switch_button_top_hover(false)}
      >
        <FontAwesomeIcon
          icon={faUpLong}
          size="2xl"
          style={{ color: switch_button_top_hover ? "#d4d4d4" : "#a8a8a8" }}
        />
      </button>
      <button
        className="camera_button_switch switch_right"
        onMouseEnter={() => set_switch_button_right_hover(true)}
        onMouseLeave={() => set_switch_button_right_hover(false)}
      >
        <FontAwesomeIcon
          icon={faRightLong}
          size="2xl"
          style={{ color: switch_button_right_hover ? "#d4d4d4" : "#a8a8a8" }}
        />
      </button>
      <button
        className="camera_button_switch switch_bottom"
        onMouseEnter={() => set_switch_button_down_hover(true)}
        onMouseLeave={() => set_switch_button_down_hover(false)}
      >
        <FontAwesomeIcon
          icon={faDownLong}
          size="2xl"
          style={{ color: switch_button_down_hover ? "#d4d4d4" : "#a8a8a8" }}
        />
      </button>
      <button
        className="camera_button_switch switch_left"
        onMouseEnter={() => set_switch_button_left_hover(true)}
        onMouseLeave={() => set_switch_button_left_hover(false)}
      >
        <FontAwesomeIcon
          icon={faLeftLong}
          size="2xl"
          style={{ color: switch_button_left_hover ? "#d4d4d4" : "#a8a8a8" }}
        />
      </button>
    </>
  );
}
