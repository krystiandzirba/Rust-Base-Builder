import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";

//? ----------------------------------------------------------------------------------------------------

//? This placeholder component represents a "layouts" feature, which is yet to be implemented.

//? Users will be able to switch between multiple instances of different unrelated setups.

//? ----------------------------------------------------------------------------------------------------

const Preset = () => {
  return (
    <>
      <div className="presets_container">
        <div className="preset">
          <button className="preset_button preset_a">
            <FontAwesomeIcon icon={faVectorSquare} size="2xl" style={{ color: "#ffd5b3" }} />
          </button>
          <span className="preset_name_text">I</span>
        </div>

        <div className="preset preset_inactive">
          <button className="preset_button preset_b">
            <FontAwesomeIcon icon={faVectorSquare} size="2xl" style={{ color: "rgba(255, 255, 255, 0.1)" }} />
          </button>
          <span className="preset_name_text">II</span>
        </div>

        <div className="preset preset_inactive">
          <button className="preset_button preset_c">
            <FontAwesomeIcon icon={faVectorSquare} size="2xl" style={{ color: "rgba(255, 255, 255, 0.1)" }} />
          </button>
          <span className="preset_name_text">III</span>
        </div>
      </div>
    </>
  );
};

export default Preset;
