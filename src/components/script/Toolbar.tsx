import { useDispatch } from "react-redux";
import { set_page_mode } from "../../Store.tsx";

import { store } from "../../Store.tsx";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";

export default function PageMode() {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.PageMode.page_mode);

  return (
    <>
      <div className="toolbar">
        <div
          className={page_mode === "overview" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => {
            dispatch(set_page_mode("overview")), console.log(store.getState());
          }}
        >
          overview
        </div>
        <div
          className={page_mode === "edit" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => {
            dispatch(set_page_mode("edit")), console.log(store.getState());
          }}
        >
          edit
        </div>
        <div
          className={page_mode === "raid" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => {
            dispatch(set_page_mode("raid")), console.log(store.getState());
          }}
        >
          raid
        </div>
      </div>
    </>
  );
}
