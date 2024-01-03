import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaceOfWorship } from "@fortawesome/free-solid-svg-icons";

const Preset = () => {
  return (
    <>
      <div className="presets_container">
        <div className="preset preset_a">
          <button className="preset_button preset_a">
            <FontAwesomeIcon icon={faPlaceOfWorship} size="2xl" style={{ color: "#a8a8a8" }} />
          </button>
          <span className="preset_name_text">base</span>
          <span className="preset_name_text">a</span>
        </div>

        <div className="preset preset_b preset_inactive">
          <button className="preset_button preset_b">
            <FontAwesomeIcon icon={faPlaceOfWorship} size="2xl" style={{ color: "rgba(255, 255, 255, 0.1)" }} />
          </button>
          <span className="preset_name_text">base</span>
          <span className="preset_name_text">b</span>
        </div>

        <div className="preset preset_c preset_inactive">
          <button className="preset_button preset_c">
            <FontAwesomeIcon icon={faPlaceOfWorship} size="2xl" style={{ color: "rgba(255, 255, 255, 0.1)" }} />
          </button>
          <span className="preset_name_text">base</span>
          <span className="preset_name_text">c</span>
        </div>

        <div className="preset preset_d preset_inactive">
          <button className="preset_button preset_d">
            <FontAwesomeIcon icon={faPlaceOfWorship} size="2xl" style={{ color: "rgba(255, 255, 255, 0.1)" }} />
          </button>
          <span className="preset_name_text">base</span>
          <span className="preset_name_text">d</span>
        </div>

        <div className="preset preset_e preset_inactive">
          <button className="preset_button preset_e">
            <FontAwesomeIcon icon={faPlaceOfWorship} size="2xl" style={{ color: "rgba(255, 255, 255, 0.1)" }} />
          </button>
          <span className="preset_name_text">base</span>
          <span className="preset_name_text">e</span>
        </div>
      </div>
    </>
  );
};

export default Preset;
