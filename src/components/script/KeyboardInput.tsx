import { useEffect } from "react";

import { RootState } from "../../Store";
import { set_keyboard_input, set_object_distance_multiplier, set_key_press_trigger } from "../../Store.tsx";
import { useSelector, useDispatch } from "react-redux";

export default function KeyboardInput() {
  const dispatch = useDispatch();
  let object_distance_multiplier = useSelector((state: RootState) => state.controlsInput.object_distance_multiplier);
  const key_press_trigger = useSelector((state: RootState) => state.controlsInput.key_press_trigger);

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
    if (event.key === "w" || event.key === "W") {
      console.log("W key pressed");
      dispatch(set_keyboard_input("W"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "a" || event.key === "A") {
      console.log("A key pressed");
      dispatch(set_keyboard_input("A"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "s" || event.key === "S") {
      console.log("S key pressed");
      dispatch(set_keyboard_input("S"));
      dispatch(set_key_press_trigger(key_press_trigger + 1));
    }
    if (event.key === "d" || event.key === "D") {
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

  useEffect(() => {
    window.addEventListener("keydown", KeypressEvent);
    return () => {
      window.removeEventListener("keydown", KeypressEvent);
    };
  }, [key_press_trigger, object_distance_multiplier]);

  return null;
}
