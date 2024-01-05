import { RootState } from "../../Store";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

export default function Hints() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const object_selected = useSelector((state: RootState) => state.modelsData.object_selected);
  const camera_type = useSelector((state: RootState) => state.cameraType.camera_type);

  return (
    <div className="hint_container_bottom">
      {camera_type === "camera_3d" && !object_selected && (
        <div className="hint_default_3d">
          <div className="hint_part">
            <span className="orange_theme_color">LMB | MB1</span> - rotate camera
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">RMB | MB2</span> - move camera
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">mouse scroll</span> - zoom in-out
          </div>
        </div>
      )}
      {camera_type === "camera_2d" && !object_selected && (
        <div className="hint_default_2d">
          <div className="hint_part">
            <span className="orange_theme_color">LMB | MB1 | RMB | MB2</span> - move camera
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">mouse scroll</span> - zoom in-out
          </div>
        </div>
      )}
      {object_selected && (
        <div className="hint_object_selected">
          <div className="hint_part">
            <FontAwesomeIcon icon={faUpDownLeftRight} size="lg" style={{ color: "#ffd5b3" }} />
            <span className="orange_theme_color">| W/A/S/D</span> - move
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">Q/E</span> - rotate
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">SPACE/CTRL</span> - move up/down
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">SHIFT</span> - change unit
          </div>

          <div className="hint_part">
            <span className="orange_theme_color">DEL</span> - delete
          </div>
        </div>
      )}
    </div>
  );
}
