import { useState } from "react";
import ObjectList from "./ObjectList";

export default function Toolbar() {
  const [type, set_type] = useState("overview");

  return (
    <>
      <div className="toolbar">
        <div className="toolbar_button overview_button" onClick={() => set_type("overview")}>
          overview
        </div>
        <div className="toolbar_button edit_button" onClick={() => [set_type("edit"), console.log(type)]}>
          edit
        </div>
        <div className="toolbar_button raid_button" onClick={() => set_type("raid")}>
          raid
        </div>
      </div>
      <ObjectList type={type} />
    </>
  );
}
