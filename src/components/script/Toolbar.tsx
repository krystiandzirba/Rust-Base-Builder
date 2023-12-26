import { useDispatch } from "react-redux";
import { set_page_mode } from "../../Store.tsx";

import { store } from "../../Store.tsx";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import {
  set_object_selected,
  set_selected_model_id,
  set_selected_object_list,
  set_model_creation_state,
} from "../../Store.tsx";

const Toolbar = () => {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  function PageModeOverview() {
    dispatch(set_page_mode("overview")),
      dispatch(set_object_selected(false)),
      dispatch(set_selected_model_id("empty")),
      dispatch(set_selected_object_list(-1));
    dispatch(set_model_creation_state(false));
  }

  function PageModeEdit() {
    dispatch(set_page_mode("edit")), dispatch(set_object_selected(false)), dispatch(set_selected_model_id("empty"));
  }

  function PageModeRaid() {
    dispatch(set_page_mode("raid")), dispatch(set_object_selected(false)), dispatch(set_selected_model_id("empty"));
  }

  return (
    <>
      <div className="toolbar_container">
        <div
          className={page_mode === "overview" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => PageModeOverview()}
        >
          overview
        </div>
        <div
          className={page_mode === "edit" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => PageModeEdit()}
        >
          edit
        </div>
        <div
          className={page_mode === "raid" ? "toolbar_button active" : "toolbar_button inactive"}
          onClick={() => PageModeRaid()}
        >
          raid
        </div>
      </div>
    </>
  );
};

export default Toolbar;
