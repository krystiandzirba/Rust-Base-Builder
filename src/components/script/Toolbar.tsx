import { useState } from "react";
import ObjectList from "./ObjectList";

export default function Toolbar() {
  const [type, set_type] = useState("overview");

  return (
    <>
      <div className="toolbar">
        <div
          className={type === "overview" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => set_type("overview")}
        >
          overview
        </div>
        <div
          className={type === "edit" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => [set_type("edit"), console.log(type)]}
        >
          edit
        </div>
        <div
          className={type === "raid" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => set_type("raid")}
        >
          raid
        </div>
      </div>
      <ObjectList type={type} />
    </>
  );
}
