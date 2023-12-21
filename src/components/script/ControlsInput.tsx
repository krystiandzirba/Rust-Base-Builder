import { useEffect, useState } from "react";

import { RootState } from "../../Store.tsx";
import {
  set_keyboard_input,
  set_object_distance_multiplier,
  set_key_press_trigger,
  set_button_input,
  set_button_trigger,
  set_object_rotation_degree,
  set_delete_object_mode,
  set_delete_object_trigger,
} from "../../Store.tsx";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCanArrowUp,
  faArrowRotateRight,
  faArrowRotateLeft,
  faArrowUp,
  faArrowRight,
  faArrowDown,
  faArrowLeft,
  faCircleUp,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function ControlsInput() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  let object_distance_multiplier = useSelector((state: RootState) => state.controlsInput.object_distance_multiplier);
  const key_press_trigger = useSelector((state: RootState) => state.controlsInput.key_press_trigger);
  const button_trigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const object_rotation_degree = useSelector((state: RootState) => state.controlsInput.object_rotation_degree);
  const delete_object_trigger = useSelector((state: RootState) => state.controlsInput.delete_object_trigger);
  const object_selected = useSelector((state: RootState) => state.modelsData.object_selected);

  const [previous_model_rotation_degree, set_previous_model_rotation_degree] = useState<number>(45);
  const [model_rotation_degree, set_model_rotation_degree] = useState<number>(90);
  const [next_model_rotation_degree, set_next_model_rotation_degree] = useState<number>(22.5);

  const KeypressEvent = (event: KeyboardEvent) => {
    if (event.key === "q" || event.key === "Q") {
      console.log("Q key pressed");
      dispatch(set_keyboard_input("Q"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "e" || event.key === "E") {
      console.log("E key pressed");
      dispatch(set_keyboard_input("E"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
      console.log("W key pressed");
      dispatch(set_keyboard_input("W"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
      console.log("A key pressed");
      dispatch(set_keyboard_input("A"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
      console.log("S key pressed");
      dispatch(set_keyboard_input("S"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
      console.log("D key pressed");
      dispatch(set_keyboard_input("D"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === " ") {
      console.log("space key pressed");
      dispatch(set_keyboard_input("SPACE"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "Control") {
      console.log("control key pressed");
      dispatch(set_keyboard_input("CTRL"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      dispatch(set_keyboard_input("DELETE"));
      dispatch(set_delete_object_trigger(delete_object_trigger + 1));
    }

    if (event.key === "Shift") {
      if (object_distance_multiplier === 5) {
        object_distance_multiplier = 1;
        dispatch(set_object_distance_multiplier(1));
        console.log("shift key disabled");
      } else if (object_distance_multiplier === 1) {
        object_distance_multiplier = 5;
        dispatch(set_object_distance_multiplier(5));
        console.log("shift key enabled");
      }
    }
  };

  function ChangeRotationDegree() {
    if (object_rotation_degree === 90) {
      set_previous_model_rotation_degree(22.5);
      set_model_rotation_degree(45);
      set_next_model_rotation_degree(90);
      dispatch(set_object_rotation_degree(45));
    }

    if (object_rotation_degree === 45) {
      set_previous_model_rotation_degree(90);
      set_model_rotation_degree(22.5);
      set_next_model_rotation_degree(45);
      dispatch(set_object_rotation_degree(22.5));
    }

    if (object_rotation_degree === 22.5) {
      set_previous_model_rotation_degree(45);
      set_model_rotation_degree(90);
      set_next_model_rotation_degree(22.5);
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

  function DeleteSelectedObjectButton() {
    dispatch(set_delete_object_mode("delete_selected_object"));
    dispatch(set_delete_object_trigger(delete_object_trigger + 1));
  }

  function DeleteAllObjects() {
    dispatch(set_delete_object_mode("delete_all_object"));
    dispatch(set_delete_object_trigger(delete_object_trigger + 1));
  }

  useEffect(() => {
    window.addEventListener("keydown", KeypressEvent);
    return () => {
      window.removeEventListener("keydown", KeypressEvent);
    };
  }, [key_press_trigger, delete_object_trigger, object_distance_multiplier]);

  return (
    <>
      {page_mode === "edit" && (
        <>
          <button onClick={() => ObjectMoveButtonFront()} className="object_move_button object_move_front_button">
            <FontAwesomeIcon
              icon={faArrowUp}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          <button onClick={() => ObjectMoveButtonRight()} className="object_move_button object_move_right_button">
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          <button onClick={() => ObjectMoveButtonBack()} className="object_move_button object_move_back_button">
            <FontAwesomeIcon
              icon={faArrowDown}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          <button onClick={() => ObjectMoveButtonLeft()} className="object_move_button object_move_left_button">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          <button onClick={() => ObjectMoveButtonUp()} className="object_move_button object_move_up_button">
            <FontAwesomeIcon
              icon={faCircleUp}
              size="3x"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          <button onClick={() => ObjectMoveButtonDown()} className="object_move_button object_move_down_button">
            <FontAwesomeIcon
              icon={faCircleDown}
              size="3x"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          <button
            onClick={() => {
              if (object_distance_multiplier === 5) {
                dispatch(set_object_distance_multiplier(1));
              } else if (object_distance_multiplier === 1) {
                dispatch(set_object_distance_multiplier(5));
              }
            }}
            className={
              object_distance_multiplier === 5
                ? "object_movement_multiplier multiplier_active"
                : "object_movement_multiplier multiplier_inactive"
            }
          >
            distance * 5
          </button>
          <div className="object_rotation_container">
            <button onClick={() => ObjectRotateButtonLeft()} className="rotation_left">
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                size="2xl"
                style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
              />
            </button>
            <div className="model_rotation_wheel">
              <div className="model_rotation_previous">{previous_model_rotation_degree}°</div>
              <button onClick={() => ChangeRotationDegree()} className="rotation_change_button">
                -{model_rotation_degree}°-
              </button>
              <div className="model_rotation_next">{next_model_rotation_degree}°</div>
            </div>
            <button onClick={() => ObjectRotateButtonRight()} className="rotation_right">
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                size="2xl"
                style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
              />
            </button>
          </div>
          <button
            className="remove_selected_model"
            onClick={() => {
              DeleteSelectedObjectButton();
            }}
          >
            <FontAwesomeIcon icon={faTrashCanArrowUp} size="2xl" style={{ color: "#a8a8a8" }} />
          </button>
          {object_selected && (
            <button
              className="remove_all_models"
              onClick={() => {
                DeleteAllObjects();
              }}
            >
              remove all models
            </button>
          )}
        </>
      )}
    </>
  );
}
