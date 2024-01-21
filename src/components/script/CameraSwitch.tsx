import { useDispatch } from "react-redux";
import {
  set_camera_type,
  set_camera_3d_reset,
  set_camera_3d_direction,
  set_camera_2d_position,
  set_camera_2d_direction,
  set_cursor_type,
} from "../../Store.tsx";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faRightLong, faLeftLong, faCameraRotate } from "@fortawesome/free-solid-svg-icons";

import camera2dThumbnail from "../../icons/camera_2d.png";
import camera3dThumbnail from "../../icons/camera_3d.png";

export default function CameraType() {
  const dispatch = useDispatch();

  const camera_type = useSelector((state: RootState) => state.camerasSettings.camera_type); //prettier-ignore
  const camera_3d_reset = useSelector((state: RootState) => state.camerasSettings.camera_3d_reset);
  const camera_2d_position = useSelector((state: RootState) => state.camerasSettings.camera_2d_position);

  const [camera_switch_button_text, set_camera_switch_button_text] = useState<string>("3D");
  const [camera_switch_button_hover, set_camera_switch_button_hover] = useState<boolean>(false);
  const [camera_2d_top_hover, set_camera_2d_top_hover] = useState<boolean>(false);
  const [camera_2d_right_hover, set_camera_2d_right_hover] = useState<boolean>(false);
  const [camera_2d_left_hover, set_camera_2d_left_hover] = useState<boolean>(false);
  const [camera_3d_reset_hover, set_camera_3d_reset_hover] = useState<boolean>(false);

  const setOrtographicCameraPosition = (position: number[]) => {
    return set_camera_2d_position(position);
  };

  function CameraButtonsColorChange(button: boolean) {
    if (camera_type === "camera_2d") {
      return {
        color: button ? "#d4d4d4" : "#a8a8a8",
      };
    } else if (camera_type === "camera_3d") {
      return {
        color: "rgba(255, 255, 255, 0.1)",
      };
    }
  }

  function CameraResetColorChange(button: boolean) {
    if (camera_type === "camera_3d") {
      return {
        color: button ? "#d4d4d4" : "#a8a8a8",
      };
    } else if (camera_type === "camera_2d") {
      return {
        color: "rgba(255, 255, 255, 0.1)",
      };
    }
  }

  function CameraLeftView() {
    if (camera_type === "camera_2d") {
      if (
        (camera_2d_position[0] === 0 && camera_2d_position[1] === 0 && camera_2d_position[2] === 45) ||
        (camera_2d_position[0] === 0 && camera_2d_position[1] === -45 && camera_2d_position[2] === 0) ||
        (camera_2d_position[0] === 0 && camera_2d_position[1] === 45 && camera_2d_position[2] === 0)
      ) {
        const new_camera_position = [-45, 0, 0];
        set_camera_switch_button_text("2D left");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("left"));
      } else if (camera_2d_position[0] === -45 && camera_2d_position[1] === 0 && camera_2d_position[2] === 0) {
        const new_camera_position = [0, 0, -45];
        set_camera_switch_button_text("2D back");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("back"));
      } else if (camera_2d_position[0] === 0 && camera_2d_position[1] === 0 && camera_2d_position[2] === -45) {
        const new_camera_position = [45, 0, 0];
        set_camera_switch_button_text("2D right");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("right"));
      } else if (camera_2d_position[0] === 45 && camera_2d_position[1] === 0 && camera_2d_position[2] === 0) {
        const new_camera_position = [0, 0, 45];
        set_camera_switch_button_text("2D front");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("front"));
      }
    }
  }

  function CameraRightView() {
    if (camera_type === "camera_2d") {
      if (
        (camera_2d_position[0] === 0 && camera_2d_position[1] === 0 && camera_2d_position[2] === 45) ||
        (camera_2d_position[0] === 0 && camera_2d_position[1] === -45 && camera_2d_position[2] === 0) ||
        (camera_2d_position[0] === 0 && camera_2d_position[1] === 45 && camera_2d_position[2] === 0)
      ) {
        const new_camera_position = [45, 0, 0];
        set_camera_switch_button_text("2D right");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("right"));
      } else if (camera_2d_position[0] === -45 && camera_2d_position[1] === 0 && camera_2d_position[2] === 0) {
        const new_camera_position = [0, 0, 45];
        set_camera_switch_button_text("2D front");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("front"));
      } else if (camera_2d_position[0] === 0 && camera_2d_position[1] === 0 && camera_2d_position[2] === -45) {
        const new_camera_position = [-45, 0, 0];
        set_camera_switch_button_text("2D left");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("left"));
      } else if (camera_2d_position[0] === 45 && camera_2d_position[1] === 0 && camera_2d_position[2] === 0) {
        const new_camera_position = [0, 0, -45];
        set_camera_switch_button_text("2D back");
        dispatch(setOrtographicCameraPosition(new_camera_position));
        dispatch(set_camera_2d_direction("back"));
      }
    }
  }

  function CameraTopView() {
    console.log(camera_2d_position);
    if (camera_type === "camera_2d") {
      const new_camera_position = [0, 45, 0];
      set_camera_switch_button_text("2D top");
      dispatch(setOrtographicCameraPosition(new_camera_position));
      dispatch(set_camera_2d_direction("top"));
    }
  }
  function ResetPerspectiveCamera() {
    if (camera_type === "camera_3d") {
      dispatch(set_camera_3d_reset(!camera_3d_reset));
    }
    return;
  }

  return (
    <>
      <button
        className="camera_switch_button"
        onClick={() => {
          if (camera_type === "camera_3d") {
            dispatch(set_camera_type("camera_2d"));
            dispatch(set_cursor_type("move"));
            const new_camera_position = [0, 0, 45];
            dispatch(setOrtographicCameraPosition(new_camera_position));
            set_camera_switch_button_text("2D front");
            dispatch(set_camera_2d_direction("front"));
            dispatch(set_camera_3d_direction(""));
          } else if (camera_type === "camera_2d") {
            dispatch(set_camera_type("camera_3d"));
            dispatch(set_cursor_type("default"));
            set_camera_switch_button_text("3D");
            dispatch(set_camera_2d_direction(""));
            dispatch(set_camera_3d_direction("north"));
          }
        }}
        onMouseEnter={() => set_camera_switch_button_hover(true)}
        onMouseLeave={() => set_camera_switch_button_hover(false)}
        style={{
          backgroundImage: `url(${camera_type === "camera_3d" ? camera3dThumbnail : camera2dThumbnail})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div></div>
        <div className={"camera_text"}>{camera_switch_button_text}</div>
      </button>
      <button
        className="camera_button_switch switch_top"
        onMouseEnter={() => set_camera_2d_top_hover(true)}
        onMouseLeave={() => set_camera_2d_top_hover(false)}
        onClick={() => {
          CameraTopView();
        }}
      >
        <FontAwesomeIcon icon={faUpLong} size="2xl" style={CameraButtonsColorChange(camera_2d_top_hover)} />
      </button>
      <button
        className="camera_button_switch switch_right"
        onMouseEnter={() => set_camera_2d_right_hover(true)}
        onMouseLeave={() => set_camera_2d_right_hover(false)}
        onClick={() => {
          CameraRightView();
        }}
      >
        <FontAwesomeIcon icon={faRightLong} size="2xl" style={CameraButtonsColorChange(camera_2d_right_hover)} />
      </button>
      <button
        className="camera_button_switch switch_left"
        onClick={() => {
          CameraLeftView();
        }}
        onMouseEnter={() => set_camera_2d_left_hover(true)}
        onMouseLeave={() => set_camera_2d_left_hover(false)}
      >
        <FontAwesomeIcon icon={faLeftLong} size="2xl" style={CameraButtonsColorChange(camera_2d_left_hover)} />
      </button>
      <button
        className="camera_3d_reset"
        onMouseEnter={() => set_camera_3d_reset_hover(true)}
        onMouseLeave={() => set_camera_3d_reset_hover(false)}
        onClick={() => ResetPerspectiveCamera()}
      >
        <FontAwesomeIcon icon={faCameraRotate} size="2xl" style={CameraResetColorChange(camera_3d_reset_hover)} />
        <div
          className={
            camera_type === "camera_3d" ? "camera_reset_text reset_text_white" : "camera_reset_text reset_text_black"
          }
        >
          reset
        </div>
      </button>
    </>
  );
}
