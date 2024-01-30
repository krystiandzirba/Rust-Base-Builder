import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import {
  set_models_xray_active,
  set_foundations_active,
  set_walls_active,
  set_floors_active,
  set_stairs_active,
  set_doors_active,
  set_frames_active,
  set_roofs_active,
  set_miscs_active,
} from "../../Store.tsx";

import { AudioPlayer } from "./AudioPlayer.tsx";
import buttons_sound from "../../audio/buttons_sound.mp3";

export default function StructureVisibilityMode() {
  const dispatch = useDispatch();
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const foundations_active = useSelector((state: RootState) => state.modelsData.foundations_active);
  const walls_active = useSelector((state: RootState) => state.modelsData.walls_active);
  const floors_active = useSelector((state: RootState) => state.modelsData.floors_active);
  const stairs_active = useSelector((state: RootState) => state.modelsData.stairs_active);
  const doors_active = useSelector((state: RootState) => state.modelsData.doors_active);
  const frames_active = useSelector((state: RootState) => state.modelsData.frames_active);
  const roofs_active = useSelector((state: RootState) => state.modelsData.roofs_active);
  const miscs_active = useSelector((state: RootState) => state.modelsData.miscs_active);
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  return (
    <>
      <div
        className={
          page_mode === "overview"
            ? "structure_visibility_container_description structure_visibility_container_description_overview"
            : page_mode === "edit"
            ? "structure_visibility_container_description structure_visibility_container_description_edit"
            : "structure_visibility_container_description structure_visibility_container_description_raid"
        }
      >
        Objects visibility
      </div>
      <div
        className={
          page_mode === "overview"
            ? "structure_visibility_container structure_visibility_container_overview"
            : page_mode === "edit"
            ? "structure_visibility_container structure_visibility_container_edit"
            : "structure_visibility_container structure_visibility_container_raid"
        }
      >
        <div className="visibility_switch_row">
          <div
            onClick={() => {
              dispatch(set_models_xray_active(!models_xray_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={!models_xray_active ? "xray_switch_button visibility_switch_button_enabled" : "xray_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            xray
          </div>
        </div>

        <div className="visibility_switch_row">
          <div
            onClick={() => {
              dispatch(set_foundations_active(!foundations_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={foundations_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            found.
          </div>
          <div
            onClick={() => {
              dispatch(set_walls_active(!walls_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={walls_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            walls
          </div>

          <div
            onClick={() => {
              dispatch(set_floors_active(!floors_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={floors_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            floors
          </div>

          <div
            onClick={() => {
              dispatch(set_stairs_active(!stairs_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={stairs_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            stairs
          </div>
        </div>

        <div className="visibility_switch_row">
          <div
            onClick={() => {
              dispatch(set_doors_active(!doors_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={doors_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            doors
          </div>

          <div
            onClick={() => {
              dispatch(set_frames_active(!frames_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={frames_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            frames
          </div>

          <div
            onClick={() => {
              dispatch(set_roofs_active(!roofs_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={roofs_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            roofs
          </div>

          <div
            onClick={() => {
              dispatch(set_miscs_active(!miscs_active));
              if (audio) {
                AudioPlayer(buttons_sound);
              }
            }}
            className={miscs_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
          >
            miscs
          </div>
        </div>
      </div>
    </>
  );
}
