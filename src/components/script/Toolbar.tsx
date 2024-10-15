import { useDispatch } from "react-redux";
import { set_create_prebuilt_base_state, set_model_type_to_create, set_page_mode } from "../../Store.tsx";

import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { set_object_selected, set_selected_model_id, set_selected_object_list, set_model_creation_state, set_reset_raid_models} from "../../Store.tsx"; // prettier-ignore

import overviewToolbarThumbnail from "../../icons/overview_toolbar_thumbnail.png";
import editToolbarThumbnail from "../../icons/edit_toolbar_thumbnail.png";
import raidToolbarThumbnail from "../../icons/raid_toolbar_thumbnail.png";

import { useAudioPlayer } from "./AudioPlayer.tsx";
import posthog from "posthog-js";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component This component serves as the main navigation tool, allowing users to change the page mode (overview, edit, raid).
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Toolbar = () => {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode); //prettier-ignore
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore

  function ChangePageMode(page_mode: string) {
    dispatch(set_selected_object_list(-1));
    dispatch(set_model_creation_state(false));
    dispatch(set_create_prebuilt_base_state(false));
    dispatch(set_model_type_to_create(""));
    dispatch(set_reset_raid_models(!reset_raid_models));
    dispatch(set_selected_model_id("empty"));
    dispatch(set_object_selected(false));
    playSound("menu_sound");

    setTimeout(() => {
      dispatch(set_page_mode(page_mode));
    }, 10);

    //% timeout is required because:
    //% 1. model ghost hover in raid mode,
    //% 2. switch to edit mode
    //% 3. ghost models become textureless and white
  }

  return (
    <>
      <nav className={"toolbar_container"}>
        <button
          onClick={() => ChangePageMode("overview")}
          className={
            page_mode === "overview"
              ? "toolbar_container_button toolbar_container_button_active"
              : "toolbar_container_button toolbar_container_button_inactive"
          }
        >
          <img
            src={overviewToolbarThumbnail}
            alt="Overview mode thumbnail"
            className="toolbar_container_button_thumbnail"
            style={{
              filter: page_mode === "overview" ? "grayscale(0%)" : "grayscale(100%)",
            }}
          />
          <span className="toolbar_container_button_description">overview</span>
        </button>

        <button
          onClick={() => {
            ChangePageMode("edit");
          }}
          className={
            page_mode === "edit"
              ? "toolbar_container_button toolbar_container_button_active"
              : "toolbar_container_button toolbar_container_button_inactive"
          }
        >
          <img
            src={editToolbarThumbnail}
            alt="Edit mode thumbnail"
            className="toolbar_container_button_thumbnail"
            style={{ filter: page_mode === "edit" ? "grayscale(0%)" : "grayscale(100%)" }}
          />
          <span className="toolbar_container_button_description">edit</span>
        </button>

        <button
          onClick={() => {
            ChangePageMode("raid"), posthog.capture("raid mode clicked");
          }}
          className={
            page_mode === "raid"
              ? "toolbar_container_button toolbar_container_button_active"
              : "toolbar_container_button toolbar_container_button_inactive"
          }
        >
          <img
            src={raidToolbarThumbnail}
            alt="Raid mode thumbnail"
            className="toolbar_container_button_thumbnail"
            style={{
              filter: page_mode === "raid" ? "grayscale(0%)" : "grayscale(100%)",
            }}
          />
          <span className="toolbar_container_button_description">raid</span>
        </button>
      </nav>
    </>
  );
};

export default Toolbar;
