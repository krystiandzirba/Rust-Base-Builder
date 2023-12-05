//import { useState } from "react";

interface ToolbarProps {
  type: string;
  setType: (type: string) => void;
}

export default function Toolbar({ type, setType }: ToolbarProps) {
  return (
    <>
      <div className="toolbar">
        <div
          className={type === "overview" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => setType("overview")}
        >
          overview
        </div>
        <div
          className={type === "edit" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => setType("edit")}
        >
          edit
        </div>
        <div
          className={type === "raid" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => setType("raid")}
        >
          raid
        </div>
      </div>
    </>
  );
}

function randomIdGenerator() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let random_id = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    random_id += characters[randomIndex];
  }
  return random_id;
}
