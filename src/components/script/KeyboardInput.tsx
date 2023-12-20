import { useEffect, useState } from "react";

export default function KeyboardInput() {
  const [shift_enabled, set_shift_enabled] = useState<boolean>(false);

  const KeypressEvent = (event: KeyboardEvent) => {
    if (event.key === "w" || event.key === "W") {
      console.log("W key pressed");
    }
    if (event.key === "a" || event.key === "A") {
      console.log("A key pressed");
    }
    if (event.key === "s" || event.key === "S") {
      console.log("S key pressed");
    }
    if (event.key === "d" || event.key === "D") {
      console.log("D key pressed");
    }
    if (event.key === " ") {
      console.log("space key pressed");
    }
    if (event.key === "Control") {
      console.log("control key pressed");
    }

    if (event.key === "Shift") {
      if (shift_enabled) {
        console.log("shift key enabled");
      }

      if (!shift_enabled) {
        console.log("shift key disabled");
      }

      set_shift_enabled(!shift_enabled);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", KeypressEvent);

    return () => {
      window.removeEventListener("keydown", KeypressEvent);
    };
  }, []);

  return null;
}
