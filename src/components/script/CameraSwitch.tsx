import { useDispatch } from "react-redux";
import { set_camera_type } from "../../Store.tsx";
import { set_ortographic_camera_position } from "../../Store.tsx";
import { set_perspective_camera_reset } from "../../Store.tsx";
import { set_ortographic_camera_direction } from "../../Store.tsx";
import { set_cursor_type } from "../../Store.tsx";

import { store } from "../../Store.tsx";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faUpLong,
  faRightLong,
  faDownLong,
  faLeftLong,
  faCameraRotate,
} from "@fortawesome/free-solid-svg-icons";

export default function CameraType() {
  const dispatch = useDispatch();

  const camera_type = useSelector((state: RootState) => state.cameraType.camera_type);
  //prettier-ignore
  const perspective_camera_reset = useSelector((state: RootState) => state.perspectiveCameraReset.perspective_camera_reset);
  const [camera_switch_text, set_camera_switch_text] = useState<string>("3D 360°");
  const [camera_button_hover, set_camera_button_hover] = useState<boolean>(false);

  const [switch_button_top_hover, set_switch_button_top_hover] = useState<boolean>(false);
  const [switch_button_right_hover, set_switch_button_right_hover] = useState<boolean>(false);
  const [switch_button_down_hover, set_switch_button_down_hover] = useState<boolean>(false);
  const [switch_button_left_hover, set_switch_button_left_hover] = useState<boolean>(false);
  const [perspective_camera_reset_hover, set_perspective_camera_reset_hover] = useState<boolean>(false);

  function CameraButtonsColorChange(button: boolean) {
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

  function CameraResetColorChange(button: boolean) {
    if (camera_type === "3D_PerspectiveCamera") {
      return {
        color: button ? "#d4d4d4" : "#a8a8a8",
      };
    } else if (camera_type === "2D_OrtographicCamera") {
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
          ortographic_camera_position[1] === -45 &&
          ortographic_camera_position[2] === 0) ||
        (ortographic_camera_position[0] === 0 &&
          ortographic_camera_position[1] === 45 &&
          ortographic_camera_position[2] === 0)
      ) {
        const new_camera_position = [-45, 0, 0];
        set_camera_switch_text("2D left");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("left"));
      } else if (
        ortographic_camera_position[0] === -45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const new_camera_position = [0, 0, -45];
        set_camera_switch_text("2D back");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("back"));
      } else if (
        ortographic_camera_position[0] === 0 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === -45
      ) {
        const new_camera_position = [45, 0, 0];
        set_camera_switch_text("2D right");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("right"));
      } else if (
        ortographic_camera_position[0] === 45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const new_camera_position = [0, 0, 45];
        set_camera_switch_text("2D front");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("front"));
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
          ortographic_camera_position[2] === 0) ||
        (ortographic_camera_position[0] === 0 &&
          ortographic_camera_position[1] === 45 &&
          ortographic_camera_position[2] === 0)
      ) {
        const new_camera_position = [45, 0, 0];
        set_camera_switch_text("2D right");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("right"));
      } else if (
        ortographic_camera_position[0] === -45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const new_camera_position = [0, 0, 45];
        set_camera_switch_text("2D front");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("front"));
      } else if (
        ortographic_camera_position[0] === 0 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === -45
      ) {
        const new_camera_position = [-45, 0, 0];
        set_camera_switch_text("2D left");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("left"));
      } else if (
        ortographic_camera_position[0] === 45 &&
        ortographic_camera_position[1] === 0 &&
        ortographic_camera_position[2] === 0
      ) {
        const new_camera_position = [0, 0, -45];
        set_camera_switch_text("2D back");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_ortographic_camera_direction("back"));
      }
    }
  }

  function CameraTopView() {
    console.log(ortographic_camera_position);
    if (camera_type === "2D_OrtographicCamera") {
      const new_camera_position = [0, 45, 0];
      set_camera_switch_text("2D top");
      dispatch(setOrtographicCameraPosition(new_camera_position));
      dispatch(set_ortographic_camera_direction("top"));
    }
  }

  function CameraBottomView() {
    if (camera_type === "2D_OrtographicCamera") {
      const new_camera_position = [0, -45, 0];
      set_camera_switch_text("2D bottom");
      dispatch(setOrtographicCameraPosition(new_camera_position));
      dispatch(set_ortographic_camera_direction("bottom"));
    }
  }

  function ResetPerspectiveCamera() {
    if (camera_type === "3D_PerspectiveCamera") {
      dispatch(set_perspective_camera_reset(!perspective_camera_reset));
    }
    return;
  }

  return (
    <>
      <button
        className="camera_switch_button"
        onClick={() => {
          if (camera_type === "3D_PerspectiveCamera") {
            dispatch(set_camera_type("2D_OrtographicCamera")), console.log(store.getState());
            dispatch(set_cursor_type("move"));
            const new_camera_position = [0, 0, 45];
            dispatch(setOrtographicCameraPosition(new_camera_position));
            set_camera_switch_text("2D front");
            dispatch(set_ortographic_camera_direction("front"));
          } else if (camera_type === "2D_OrtographicCamera") {
            dispatch(set_camera_type("3D_PerspectiveCamera")), console.log(store.getState());
            dispatch(set_cursor_type("default"));
            set_camera_switch_text("3D 360°");
            dispatch(set_ortographic_camera_direction(""));
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
        <FontAwesomeIcon icon={faUpLong} size="2xl" style={CameraButtonsColorChange(switch_button_top_hover)} />
      </button>
      <button
        className="camera_button_switch switch_right"
        onMouseEnter={() => set_switch_button_right_hover(true)}
        onMouseLeave={() => set_switch_button_right_hover(false)}
        onClick={() => {
          CameraRightView();
        }}
      >
        <FontAwesomeIcon icon={faRightLong} size="2xl" style={CameraButtonsColorChange(switch_button_right_hover)} />
      </button>
      <button
        className="camera_button_switch switch_bottom"
        onClick={() => {
          CameraBottomView();
        }}
        onMouseEnter={() => set_switch_button_down_hover(true)}
        onMouseLeave={() => set_switch_button_down_hover(false)}
      >
        <FontAwesomeIcon icon={faDownLong} size="2xl" style={CameraButtonsColorChange(switch_button_down_hover)} />
      </button>
      <button
        className="camera_button_switch switch_left"
        onClick={() => {
          CameraLeftView();
        }}
        onMouseEnter={() => set_switch_button_left_hover(true)}
        onMouseLeave={() => set_switch_button_left_hover(false)}
      >
        <FontAwesomeIcon icon={faLeftLong} size="2xl" style={CameraButtonsColorChange(switch_button_left_hover)} />
      </button>
      <button
        className="perspective_camera_reset"
        onMouseEnter={() => set_perspective_camera_reset_hover(true)}
        onMouseLeave={() => set_perspective_camera_reset_hover(false)}
        onClick={() => ResetPerspectiveCamera()}
      >
        <FontAwesomeIcon
          icon={faCameraRotate}
          size="2xl"
          style={CameraResetColorChange(perspective_camera_reset_hover)}
        />
        <div
          className={
            camera_type === "3D_PerspectiveCamera"
              ? "camera_reset_text reset_text_white"
              : "camera_reset_text reset_text_black"
          }
        >
          reset
        </div>
      </button>
    </>
  );
}
