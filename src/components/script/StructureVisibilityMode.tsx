import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import {
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
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function StructureVisibilityMode() {
  const dispatch = useDispatch();
  const foundations_active = useSelector((state: RootState) => state.modelsData.foundations_active);
  const walls_active = useSelector((state: RootState) => state.modelsData.walls_active);
  const floors_active = useSelector((state: RootState) => state.modelsData.floors_active);
  const stairs_active = useSelector((state: RootState) => state.modelsData.stairs_active);
  const doors_active = useSelector((state: RootState) => state.modelsData.doors_active);
  const frames_active = useSelector((state: RootState) => state.modelsData.frames_active);
  const roofs_active = useSelector((state: RootState) => state.modelsData.roofs_active);
  const miscs_active = useSelector((state: RootState) => state.modelsData.miscs_active);

  return (
    <div className="structure_visibility_container">
      {/* <div className="visibility_type_container">
        <button>solid</button>
        <button>xray</button>
        <button>none</button>
      </div> */}
      <div className="visibility_switch_container">
        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_foundations_active(!foundations_active));
              }}
              className={"visibility_switch_button"}
            >
              {foundations_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>found.</span>
          </div>
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_walls_active(!walls_active));
              }}
              className={"visibility_switch_button"}
            >
              {walls_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>walls</span>
          </div>
        </div>

        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_floors_active(!floors_active));
              }}
              className={"visibility_switch_button"}
            >
              {floors_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>floors</span>
          </div>
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_stairs_active(!stairs_active));
              }}
              className={"visibility_switch_button"}
            >
              {stairs_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>stairs</span>
          </div>
        </div>
        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_doors_active(!doors_active));
              }}
              className={"visibility_switch_button"}
            >
              {doors_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>doors</span>
          </div>
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_frames_active(!frames_active));
              }}
              className={"visibility_switch_button"}
            >
              {frames_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>frames</span>
          </div>
        </div>
        <div className="visibility_switch_row">
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_roofs_active(!roofs_active));
              }}
              className={"visibility_switch_button"}
            >
              {roofs_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>roofs</span>
          </div>
          <div className="visibility_switch_element">
            <button
              onClick={() => {
                dispatch(set_miscs_active(!miscs_active));
              }}
              className={"visibility_switch_button"}
            >
              {miscs_active ? (
                <FontAwesomeIcon icon={faEye} size="xl" style={{ color: "#d4d4d4" }} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="xl" style={{ color: "#a8a8a8" }} />
              )}
            </button>
            <span>miscs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
