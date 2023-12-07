import { useDispatch } from "react-redux";
import { set_page_mode } from "../../Store.tsx";

import { store } from "../../Store.tsx";

interface ToolbarProps {
  type: string;
  setType: (type: string) => void;
}

export default function PageMode({ type, setType }: ToolbarProps) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="toolbar">
        <div
          className={type === "overview" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => {
            setType("overview"), dispatch(set_page_mode("overview")), console.log(store.getState());
          }}
        >
          overview
        </div>
        <div
          className={type === "edit" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => {
            setType("edit"), dispatch(set_page_mode("edit")), console.log(store.getState());
          }}
        >
          edit
        </div>
        <div
          className={type === "raid" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => {
            setType("raid"), dispatch(set_page_mode("raid")), console.log(store.getState());
          }}
        >
          raid
        </div>
      </div>
    </>
  );
}
