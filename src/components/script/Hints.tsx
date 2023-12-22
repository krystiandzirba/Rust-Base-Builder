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
          <div className="hint_part"> LMB | MB1 - rotate camera</div>
          <div className="hint_part"> RMB | MB2 - move camera</div>
          <div className="hint_part"> mouse scroll - zoom in-out</div>
        </div>
      )}
      {camera_type === "camera_2d" && !object_selected && (
        <div className="hint_default_2d">
          <div className="hint_part"> LMB | MB1 | RMB | MB2 - move camera</div>
          <div className="hint_part"> mouse scroll - zoom in-out</div>
        </div>
      )}
      {object_selected && (
        <div className="hint_object_selected">
          <div className="hint_part">
            <FontAwesomeIcon icon={faUpDownLeftRight} size="lg" style={{ color: "rgb(90, 90, 90)" }} /> | W/A/S/D - move
          </div>
          <div className="hint_part"> Q/E - rotate </div>
          <div className="hint_part"> SPACE/CTRL - move up/down</div>
          <div className="hint_part"> SHIFT - increment unit</div>
          <div className="hint_part"> DEL - delete </div>
        </div>
      )}
    </div>
  );
}
