import { useDispatch } from "react-redux";
import { set_create_prebuilt_base_state, set_model_type_to_create, set_page_mode } from "../../Store.tsx";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import {
  set_object_selected,
  set_selected_model_id,
  set_selected_object_list,
  set_model_creation_state,
  set_reset_raid_models,
} from "../../Store.tsx";

import overviewRgbThumbnail from "../../icons/overview_rgb_thumbnail.png";
import editRgbThumbnail from "../../icons/hammer_rgb_thumbnail.png";
import raidRgbThumbnail from "../../icons/raid_rgb_thumbnail.png";
import overviewBwThumbnail from "../../icons/overview_bw_thumbnail.png";
import editBwThumbnail from "../../icons/hammer_bw_thumbnail.png";
import raidBwThumbnail from "../../icons/raid_bw_thumbnail.png";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { AudioPlayer } from "./AudioPlayer.tsx";
import menu_sound from "../../audio/menu_sound.mp3";

//? ----------------------------------------------------------------------------------------------------

//? This component serves as the main navigation tool, allowing users to change the page mode (overview, edit, raid).

//? ----------------------------------------------------------------------------------------------------

const Toolbar = () => {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [toolbar_enabled, set_toolbar_enabled] = useState<boolean>(true);

  // -------------------------  change the page mode to "Overview" mode -------------------------

  function PageModeOverview() {
    dispatch(set_page_mode("overview")),
      dispatch(set_object_selected(false)),
      dispatch(set_selected_model_id("empty")),
      dispatch(set_selected_object_list(-1));
    dispatch(set_model_creation_state(false));
    dispatch(set_reset_raid_models(!reset_raid_models));
    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  // -------------------------  change the page mode to "Edit" mode -------------------------

  function PageModeEdit() {
    dispatch(set_page_mode("edit")),
      dispatch(set_object_selected(false)),
      dispatch(set_selected_model_id("empty"), dispatch(set_reset_raid_models(!reset_raid_models)));
    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  // -------------------------  change the page mode to "Edit" mode -------------------------

  function PageModeRaid() {
    dispatch(set_page_mode("raid")),
      dispatch(set_object_selected(false)),
      dispatch(set_selected_model_id("empty"), dispatch(set_reset_raid_models(!reset_raid_models)));
    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  // -------------------------  enable|disable the toolbar visibility -------------------------

  function ToggleToolbar() {
    set_toolbar_enabled(!toolbar_enabled);
  }

  // -------------------------  deselect the selected object and disable the model cretion state on page mode change -------------------------

  useEffect(() => {
    {
      dispatch(set_selected_object_list(-1));
      dispatch(set_model_creation_state(false));
      dispatch(set_create_prebuilt_base_state(false));
      dispatch(set_model_type_to_create(""));
    }
  }, [page_mode]);

  return (
    <>
      <div
        className={
          toolbar_enabled
            ? "toolbar_container toolbar_container_displayed"
            : "toolbar_container toolbar_container_hidden"
        }
      >
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
      <div
        className={
          toolbar_enabled
            ? "toolbar_description_container toolbar_description_displayed"
            : "toolbar_description_container toolbar_description_hidden"
        }
      >
        <div className="toolbar_description">overview</div>
        <div className="toolbar_description">edit</div>
        <div className="toolbar_description">raid</div>
      </div>

      <div
        className="toolbar_display_trigger"
        onClick={() => {
          ToggleToolbar();
        }}
      >
        <FontAwesomeIcon
          icon={toolbar_enabled ? faCaretUp : faCaretDown}
          size="xl"
          style={{ color: toolbar_enabled ? "black" : "#a8a8a8" }}
        />
      </div>
    </>
  );
};

export default Toolbar;
