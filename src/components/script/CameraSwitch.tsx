import { useDispatch } from "react-redux";
import { set_camera_type } from "../../Store.tsx";
import { set_ortographic_camera_position } from "../../Store.tsx";

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

  function ButtonColorChange(button: boolean) {
    if (camera_type === "2D_OrtographicCamera") {
      return {
        color: button ? "#d4d4d4" : "#a8a8a8",
      };
    } else if (camera_type === "3D_PerspectiveCamera") {
      return {
        color: "rgba(255, 255, 255, 0.1)",
      };
    }
  }

  const ortographic_camera_position = useSelector(
    (state: RootState) => state.ortographicCameraPosition.ortographic_camera_position
  );

  const setOrtographicCameraPosition = (position: number[]) => {
    return set_ortographic_camera_position(position);
  };

  function CameraLeftView() {
    if (camera_type === "2D_OrtographicCamera") {
      if (
        (ortographic_camera_position[0] === 0 &&
          ortographic_camera_position[1] === 0 &&
          ortographic_camera_position[2] === 45) ||
        (ortographic_camera_position[0] === 0 &&
          ortographic_camera_position[1] === 45 &&
          ortographic_camera_position[2] === 0)
      ) {
        const newPosition = [-45, 0, 0];
        dispatch(setOrtographicCameraPosition(newPosition));
      } else if (
        ortographic_camera_position[0] === -45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const newPosition = [0, 0, -45];
        dispatch(setOrtographicCameraPosition(newPosition));
      } else if (
        ortographic_camera_position[0] === 0 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === -45
      ) {
        const newPosition = [45, 0, 0];
        dispatch(setOrtographicCameraPosition(newPosition));
      } else if (
        ortographic_camera_position[0] === 45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const newPosition = [0, 0, 45];
        dispatch(setOrtographicCameraPosition(newPosition));
      }
    }
  }

  function CameraRightView() {
    if (camera_type === "2D_OrtographicCamera") {
      if (
        (ortographic_camera_position[0] === 0 &&
          ortographic_camera_position[1] === 0 &&
          ortographic_camera_position[2] === 45) ||
        (ortographic_camera_position[0] === 0 &&
          ortographic_camera_position[1] === -45 &&
          ortographic_camera_position[2] === 0)
      ) {
        const newPosition = [45, 0, 0];
        dispatch(setOrtographicCameraPosition(newPosition));
      } else if (
        ortographic_camera_position[0] === -45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const newPosition = [0, 0, 45];
        dispatch(setOrtographicCameraPosition(newPosition));
      } else if (
        ortographic_camera_position[0] === 0 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === -45
      ) {
        const newPosition = [-45, 0, 0];
        dispatch(setOrtographicCameraPosition(newPosition));
      } else if (
        ortographic_camera_position[0] === 45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const newPosition = [0, 0, -45];
        dispatch(setOrtographicCameraPosition(newPosition));
      }
    }
  }

  function CameraTopView() {
    console.log(ortographic_camera_position);
    if (camera_type === "2D_OrtographicCamera") {
      const newPosition = [0, 45, 0];
      dispatch(setOrtographicCameraPosition(newPosition));
    }
  }

  function CameraBottomView() {
    if (camera_type === "2D_OrtographicCamera") {
      const newPosition = [0, -45, 0];
      dispatch(setOrtographicCameraPosition(newPosition));
    }
  }

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
        onClick={() => {
          CameraTopView();
        }}
      >
        <FontAwesomeIcon icon={faUpLong} size="2xl" style={ButtonColorChange(switch_button_top_hover)} />
      </button>
      <button
        className="camera_button_switch switch_right"
        onMouseEnter={() => set_switch_button_right_hover(true)}
        onMouseLeave={() => set_switch_button_right_hover(false)}
        onClick={() => {
          CameraRightView(), console.log(store.getState());
        }}
      >
        <FontAwesomeIcon icon={faRightLong} size="2xl" style={ButtonColorChange(switch_button_right_hover)} />
      </button>
      <button
        className="camera_button_switch switch_bottom"
        onClick={() => {
          CameraBottomView(), console.log(store.getState());
        }}
        onMouseEnter={() => set_switch_button_down_hover(true)}
        onMouseLeave={() => set_switch_button_down_hover(false)}
      >
        <FontAwesomeIcon icon={faDownLong} size="2xl" style={ButtonColorChange(switch_button_down_hover)} />
      </button>
      <button
        className="camera_button_switch switch_left"
        onClick={() => {
          CameraLeftView(), console.log(store.getState());
        }}
        onMouseEnter={() => set_switch_button_left_hover(true)}
        onMouseLeave={() => set_switch_button_left_hover(false)}
      >
        <FontAwesomeIcon icon={faLeftLong} size="2xl" style={ButtonColorChange(switch_button_left_hover)} />
      </button>
    </>
  );
}
