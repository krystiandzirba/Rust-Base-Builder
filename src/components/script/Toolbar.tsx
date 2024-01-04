import { useDispatch } from "react-redux";
import { set_page_mode } from "../../Store.tsx";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import {
  set_object_selected,
  set_selected_model_id,
  set_selected_object_list,
  set_model_creation_state,
} from "../../Store.tsx";

import overviewRgbThumbnail from "../../icons/overview_rgb_thumbnail.png";
import editRgbThumbnail from "../../icons/hammer_rgb_thumbnail.png";
import raidRgbThumbnail from "../../icons/raid_rgb_thumbnail.png";
import overviewBwThumbnail from "../../icons/overview_bw_thumbnail.png";
import editBwThumbnail from "../../icons/hammer_bw_thumbnail.png";
import raidBwThumbnail from "../../icons/raid_bw_thumbnail.png";

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
          onClick={() => PageModeOverview()}
          className={page_mode === "overview" ? "overview_container active" : "overview_container inactive"}
          style={
            page_mode === "overview"
              ? { backgroundImage: `url(${overviewRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${overviewBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          onClick={() => PageModeEdit()}
          className={page_mode === "edit" ? "edit_container active" : "edit_container inactive"}
          style={
            page_mode === "edit"
              ? { backgroundImage: `url(${editRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${editBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          onClick={() => PageModeRaid()}
          className={page_mode === "raid" ? "raid_container active" : "raid_container inactive"}
          style={
            page_mode === "raid"
              ? { backgroundImage: `url(${raidRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${raidBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
      </div>
      <div className="toolbar_description_container">
        <div className="toolbar_description">overview</div>
        <div className="toolbar_description">edit</div>
        <div className="toolbar_description">raid</div>
      </div>
      <div className="raid_unavailable">not yet available</div>
    </>
  );
};

export default Toolbar;
