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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function StructureVisibilityMode() {
  const dispatch = useDispatch();
  const models_xray_active = useSelector((state: RootState) => state.modelsData.models_xray_active);
  const foundations_active = useSelector((state: RootState) => state.modelsData.foundations_active);
  const walls_active = useSelector((state: RootState) => state.modelsData.walls_active);
  const floors_active = useSelector((state: RootState) => state.modelsData.floors_active);
  const stairs_active = useSelector((state: RootState) => state.modelsData.stairs_active);
  const doors_active = useSelector((state: RootState) => state.modelsData.doors_active);
  const frames_active = useSelector((state: RootState) => state.modelsData.frames_active);
  const roofs_active = useSelector((state: RootState) => state.modelsData.roofs_active);
  const miscs_active = useSelector((state: RootState) => state.modelsData.miscs_active);

  return (
    <>
      <div className="structure_visibility_container_description">Objects visibility</div>
      <div className="structure_visibility_container">
        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_models_xray_active(!models_xray_active));
              }}
              className={!models_xray_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              xray
            </div>
          </div>
        </div>

        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_foundations_active(!foundations_active));
              }}
              className={foundations_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              found.
            </div>
          </div>
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_walls_active(!walls_active));
              }}
              className={walls_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              walls
            </div>
          </div>
        </div>

        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_floors_active(!floors_active));
              }}
              className={floors_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              floors
            </div>
          </div>
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_stairs_active(!stairs_active));
              }}
              className={stairs_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              stairs
            </div>
          </div>
        </div>
        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_doors_active(!doors_active));
              }}
              className={doors_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              doors
            </div>
          </div>
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_frames_active(!frames_active));
              }}
              className={frames_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              frames
            </div>
          </div>
        </div>
        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_roofs_active(!roofs_active));
              }}
              className={roofs_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              roofs
            </div>
          </div>
          <div className="visibility_switch_element">
            <div
              onClick={() => {
                dispatch(set_miscs_active(!miscs_active));
              }}
              className={miscs_active ? "visibility_switch_button visibility_switch_button_enabled" : "visibility_switch_button visibility_switch_button_disabled"} // prettier-ignore
            >
              miscs
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
