import { useState } from "react";

import { RootState } from "../../Store.tsx";
import {
  set_object_distance_multiplier,
  set_button_input,
  set_button_trigger,
  set_object_rotation_degree,
  set_delete_object_mode,
  set_delete_object_mouse_trigger,
  set_object_selected,
  set_selected_model_id,
} from "../../Store.tsx";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faArrowRotateLeft,
  faArrowUp,
  faArrowRight,
  faArrowDown,
  faArrowLeft,
  faCircleUp,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import { AudioPlayer } from "./AudioPlayer.tsx";
import buttons_sound from "../../audio/buttons_sound.mp3";
import menu_sound from "../../audio/menu_sound.mp3";

import dumpsterClosed from "../../icons/dumpster_closed_bw.png";
import dumpsterOpened from "../../icons/dumpster_opened.png";

//? ----------------------------------------------------------------------------------------------------

//? The control panel positioned at the center bottom of the app that serves as a transforming tool for objects via mouse input.

//? It facilitates adjustments to object properties such as position, rotation, elevation and height.

//? Users can also switch between distance units and delete either selected or all objects.

//? ----------------------------------------------------------------------------------------------------

export default function ControlsInput() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  let object_distance_multiplier = useSelector((state: RootState) => state.controlsInput.object_distance_multiplier);
  const button_trigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const object_rotation_degree = useSelector((state: RootState) => state.controlsInput.object_rotation_degree);
  const delete_object_mouse_trigger = useSelector((state: RootState) => state.controlsInput.delete_object_mouse_trigger); //prettier-ignore
  const object_selected = useSelector((state: RootState) => state.modelsData.object_selected);
  const camera_3d_direction = useSelector((state: RootState) => state.camerasSettings.camera_3d_direction);
  const camera_type = useSelector((state: RootState) => state.camerasSettings.camera_type);
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [previous_object_rotation_degree, set_previous_object_rotation_degree] = useState<number>(60);
  const [next_object_rotation_degree, set_next_object_rotation_degree] = useState<number>(15);

  const [dumpster_hovered, set_dumpster_hovered] = useState<boolean>(false);

  const [unit_distance_type, set_unit_distance_type] = useState<string>("1");

  const [display_remove_all_models_question, set_display_remove_all_models_question] = useState<boolean>(false);
  const [yes_answer_hovered, set_yes_answer_hovered] = useState<boolean>(false);
  const [no_answer_hovered, set_no_answer_hovered] = useState<boolean>(false);

  const [enable_custom_distance, set_enable_custom_distance] = useState<boolean>(false);
  const [custom_distance_unit, set_custom_distance_unit] = useState<number>(0);

  function ChangeRotationDegree() {
    if (audio) {
      AudioPlayer(buttons_sound);
    }
    if (object_rotation_degree === 90) {
      set_next_object_rotation_degree(30);
      set_previous_object_rotation_degree(90);
      dispatch(set_object_rotation_degree(15));
    }

    if (object_rotation_degree === 15) {
      set_next_object_rotation_degree(60);
      set_previous_object_rotation_degree(15);
      dispatch(set_object_rotation_degree(30));
    }

    if (object_rotation_degree === 30) {
      set_next_object_rotation_degree(90);
      set_previous_object_rotation_degree(30);
      dispatch(set_object_rotation_degree(60));
    }

    if (object_rotation_degree === 60) {
      set_next_object_rotation_degree(15);
      set_previous_object_rotation_degree(60);
      dispatch(set_object_rotation_degree(90));
    }
  }

  function ObjectMoveButtonLeft() {
    dispatch(set_button_input("move_left"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectMoveButtonFront() {
    dispatch(set_button_input("move_front"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectMoveButtonRight() {
    dispatch(set_button_input("move_right"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectMoveButtonBack() {
    dispatch(set_button_input("move_back"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectMoveButtonUp() {
    dispatch(set_button_input("move_up"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectMoveButtonDown() {
    dispatch(set_button_input("move_down"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectRotateButtonLeft() {
    dispatch(set_button_input("rotate_left"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function ObjectRotateButtonRight() {
    dispatch(set_button_input("rotate_right"));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  function DumpsterMouseEnter() {
    set_dumpster_hovered(true);
  }

  function DumpsterMouseLeave() {
    set_dumpster_hovered(false);
  }

  function DeleteAllObjects() {
    dispatch(set_delete_object_mode("delete_all_object"));
    dispatch(set_delete_object_mouse_trigger(delete_object_mouse_trigger + 1));
  }

  function ChangeDistanceUnitButton(distance: number) {
    if (audio) {
      AudioPlayer(buttons_sound);
    }
    dispatch(set_object_distance_multiplier(distance));
  }

  function ToggleCustomDistance() {
    set_enable_custom_distance(!enable_custom_distance);
  }

  const changeCustomDistanceUnit = (event: any) => {
    const inputValue = event.target.value;
    set_custom_distance_unit(inputValue);
    ChangeDistanceUnitButton(inputValue);
  };

  return (
    <>
      {page_mode === "edit" && (
        <>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_top"
              style={{ color: camera_3d_direction === "north" ? "#ffd5b3" : "#bbbbbb" }}
            >
              {camera_3d_direction === "north"
                ? "W (+Z)"
                : camera_3d_direction === "east"
                ? "W (+X)"
                : camera_3d_direction === "west"
                ? "W (-X)"
                : camera_3d_direction === "south"
                ? "W (-Z)"
                : "unknown"}
            </div>
          )}
          <button onClick={() => ObjectMoveButtonFront()} className="object_move_button object_move_front_button">
            <FontAwesomeIcon
              icon={faArrowUp}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_right"
              style={{ color: camera_3d_direction === "west" ? "#ffd5b3" : "#bbbbbb" }}
            >
              {camera_3d_direction === "north"
                ? "D (+X)"
                : camera_3d_direction === "east"
                ? "D (-Z)"
                : camera_3d_direction === "west"
                ? "D (+Z)"
                : camera_3d_direction === "south"
                ? "D (-X)"
                : "unknown"}
            </div>
          )}
          <button onClick={() => ObjectMoveButtonRight()} className="object_move_button object_move_right_button">
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_bottom"
              style={{ color: camera_3d_direction === "south" ? "#ffd5b3" : "#bbbbbb" }}
            >
              {camera_3d_direction === "north"
                ? "S (-Z)"
                : camera_3d_direction === "east"
                ? "S (-X)"
                : camera_3d_direction === "west"
                ? "S (+X)"
                : camera_3d_direction === "south"
                ? "S (+Z)"
                : "unknown"}
            </div>
          )}
          <button onClick={() => ObjectMoveButtonBack()} className="object_move_button object_move_back_button">
            <FontAwesomeIcon
              icon={faArrowDown}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_left"
              style={{ color: camera_3d_direction === "east" ? "#ffd5b3" : "#bbbbbb" }}
            >
              {camera_3d_direction === "north"
                ? "A (-X)"
                : camera_3d_direction === "east"
                ? "A (+Z)"
                : camera_3d_direction === "west"
                ? "A (-Z)"
                : camera_3d_direction === "south"
                ? "A (+X)"
                : "unknown"}
            </div>
          )}
          <button onClick={() => ObjectMoveButtonLeft()} className="object_move_button object_move_left_button">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          {camera_type === "camera_3d" && (
            <button
              onClick={() => ObjectMoveButtonUp()}
              className="object_move_button object_move_up_button"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            >
              SPACE
              <FontAwesomeIcon icon={faCircleUp} size="3x" />
            </button>
          )}
          {camera_type === "camera_3d" && (
            <button
              onClick={() => ObjectMoveButtonDown()}
              className="object_move_button object_move_down_button"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            >
              <FontAwesomeIcon icon={faCircleDown} size="3x" />
              CTRL
            </button>
          )}
          <div className="distance_unit_main_container">
            <div className="distance_unit_description_main_container">
              <div className="distance_unit_description"> change distance units</div>
              <input
                onClick={() => {
                  dispatch(set_selected_model_id(-1));
                  dispatch(set_object_selected(false));
                }}
                className={
                  unit_distance_type === "custom"
                    ? "object_movement_multiplier movement_multiplier_top_right multiplier_active"
                    : "object_movement_multiplier movement_multiplier_top_right custom_distance_hidden"
                }
                type="number"
                value={custom_distance_unit}
                onChange={changeCustomDistanceUnit}
                placeholder="distance"
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="change_distance_unit_container">
              <button
                className={
                  unit_distance_type === "0.125"
                    ? "object_movement_multiplier movement_multiplier_left multiplier_active"
                    : "object_movement_multiplier movement_multiplier_left multiplier_inactive"
                }
                onClick={() => (ChangeDistanceUnitButton(0.125), set_unit_distance_type("0.125"))}
              >
                x0.125
              </button>
              <button
                className={
                  unit_distance_type === "1"
                    ? "object_movement_multiplier movement_multiplier_middle multiplier_active"
                    : "object_movement_multiplier movement_multiplier_middle multiplier_inactive"
                }
                onClick={() => (ChangeDistanceUnitButton(1), set_unit_distance_type("1"))}
              >
                x1
              </button>
              <button
                className={
                  unit_distance_type === "5"
                    ? "object_movement_multiplier movement_multiplier_middle multiplier_active"
                    : "object_movement_multiplier movement_multiplier_middle multiplier_inactive"
                }
                onClick={() => (ChangeDistanceUnitButton(5), set_unit_distance_type("5"))}
              >
                x5
              </button>
              <button
                className={
                  unit_distance_type === "custom"
                    ? "object_movement_multiplier movement_multiplier_bottom_right multiplier_active"
                    : "object_movement_multiplier movement_multiplier_right multiplier_inactive"
                }
                onClick={() => (
                  ToggleCustomDistance(),
                  set_unit_distance_type("custom"),
                  ChangeDistanceUnitButton(custom_distance_unit)
                )}
              >
                custom
              </button>
            </div>
          </div>
          <div className="object_rotation_container">
            <button
              onClick={() => ObjectRotateButtonLeft()}
              className="rotation_direction_button"
              style={{ color: object_selected ? "#ffd5b3" : "rgba(120, 120, 120, 0.5)" }}
            >
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                size="2xl"
                style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
              />
              Q
            </button>
            <div className="model_rotation_wheel">
              <div className="model_rotation_button">{next_object_rotation_degree}°</div>
              <button onClick={() => ChangeRotationDegree()} className="rotation_change_button">
                -{object_rotation_degree}°-
              </button>
              <div className="model_rotation_button">{previous_object_rotation_degree}°</div>
            </div>
            <button
              onClick={() => ObjectRotateButtonRight()}
              className="rotation_direction_button"
              style={{ color: object_selected ? "#ffd5b3" : "rgba(120, 120, 120, 0.5)" }}
            >
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                size="2xl"
                style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
              />
              E
            </button>
          </div>

          <div className="remove_all_model_description" style={{ color: dumpster_hovered ? "#ffd5b3" : "#bbbbbb" }}>
            delete all
          </div>

          <button
            className="remove_all_models"
            style={{
              backgroundImage: `url(${dumpster_hovered ? dumpsterOpened : dumpsterClosed})`,
              backgroundSize: "cover",
            }}
            onClick={() => {
              set_display_remove_all_models_question(true);
              if (audio) {
                AudioPlayer(menu_sound);
              }
            }}
            onMouseEnter={DumpsterMouseEnter}
            onMouseLeave={DumpsterMouseLeave}
          ></button>
          {display_remove_all_models_question && (
            <div className="delete_all_question_container">are you sure you want to delete all the objects?</div>
          )}
          {display_remove_all_models_question && (
            <div className="delete_all_question_buttons_container">
              <button
                className="delete_all_question_button"
                onClick={() => {
                  DeleteAllObjects();
                  set_display_remove_all_models_question(false);
                }}
                onMouseEnter={() => set_yes_answer_hovered(true)}
                onMouseLeave={() => set_yes_answer_hovered(false)}
                style={{ color: yes_answer_hovered ? "#ffd5b3" : "#bbbbbb" }}
              >
                yes
              </button>
              <button
                className="delete_all_question_button"
                onClick={() => {
                  set_display_remove_all_models_question(false);
                  if (audio) {
                    AudioPlayer(menu_sound);
                  }
                }}
                onMouseEnter={() => set_no_answer_hovered(true)}
                onMouseLeave={() => set_no_answer_hovered(false)}
                style={{ color: no_answer_hovered ? "#ffd5b3" : "#bbbbbb" }}
              >
                no
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
