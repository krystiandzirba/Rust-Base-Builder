import { useState } from "react";
import { useAudioPlayer } from "./AudioPlayer.tsx";

export function CanvasModelsPlacingSettings() {
  const playSound = useAudioPlayer();

  const [symmetry_enabled, set_symmetry_enabled] = useState({ x: false, z: false });
  const [unit_distance_number, set_unit_distance_number] = useState(1);
  const [model_build_height_level, set_model_build_height_level] = useState<number>(0);
  const [pivot_controls_enabled, set_pivot_controls_enabled] = useState({ x: false, y: false, z: false });

  const [test, set_test] = useState<string>("");

  function HandleSymmetryStateChange(symmetry_axis: "x" | "z") {
    playSound("menu_sound");
    set_symmetry_enabled((prevState) => ({
      ...prevState,
      [symmetry_axis]: !prevState[symmetry_axis],
    }));
  }

  function HandleUnitDistanceChange(value: number) {
    playSound("menu_sound");
    set_unit_distance_number(value);
  }

  function HandleModelBuildHeightLevelChange(value: number) {
    const new_model_build_height_level = model_build_height_level + value;

    if (new_model_build_height_level >= 0) {
      set_model_build_height_level(new_model_build_height_level);
      playSound("buttons_sound");
    }
  }

  function handlePivotControlsChange(axis: "x" | "y" | "z") {
    playSound("menu_sound");
    set_pivot_controls_enabled((prevState) => ({
      ...prevState,
      [axis]: !prevState[axis],
    }));
  }

  const testowanie = (e: { target: { value: React.SetStateAction<string> } }) => {
    set_test(e.target.value);
    console.log(test);
  };

  function ModelPlacingSettingsMainContainer() {
    return (
      <div className="canvas_models_placing_settings_main_container">
        <div className="canvas_models_placing_settings_content_row">
          <div className="canvas_models_placing_settings_symmetry_container">
            <div className="canvas_models_placing_settings_symmetry_container_description">symmetry:</div>
            <div className="canvas_models_placing_settings_symmetry_buttons_container">
              <div
                className={symmetry_enabled.x ? "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_enabled canvas_models_placing_settings_button_left" : "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_disabled canvas_models_placing_settings_button_left"} // prettier-ignore
                onClick={() => HandleSymmetryStateChange("x")} //prettier-ignore
              >
                X
              </div>
              <div
                className={symmetry_enabled.z ? "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_enabled canvas_models_placing_settings_button_right" : "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_disabled canvas_models_placing_settings_button_right"} // prettier-ignore
                onClick={() => HandleSymmetryStateChange("z")} //prettier-ignore
              >
                Z
              </div>
            </div>
          </div>
          <div className="canvas_models_placing_settings_distance_units_container">
            <div className="canvas_models_placing_settings_distance_units_description">change distance unit:</div>
            <div className="canvas_models_placing_settings_distance_units_buttons_container">
              <div
                className= {unit_distance_number === 0.125 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_enabled canvas_models_placing_settings_button_left" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_disabled canvas_models_placing_settings_button_left"} // prettier-ignore
                onClick={() => HandleUnitDistanceChange(0.125)} //prettier-ignore
              >
                x0.125
              </div>
              <div
                className= {unit_distance_number === 1 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_enabled" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_disabled"} // prettier-ignore
                onClick={() => HandleUnitDistanceChange(1)} //prettier-ignore
              >
                x1
              </div>
              <div
                className= {unit_distance_number === 5 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_enabled" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_disabled"} // prettier-ignore
                onClick={() => HandleUnitDistanceChange(5)} //prettier-ignore
              >
                x5
              </div>
              {/* prettier-ignore */}
              <input className="canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_button_right" type="text" value={test} onChange={testowanie} onFocus={(e) => e.target.select()} placeholder="custom / disabled"/>
            </div>
          </div>
        </div>
        <div className="canvas_models_placing_settings_content_row">
          <div className="canvas_models_placing_settings_height_level_container">
            <div className="canvas_models_placing_settings_height_level_description">build height:</div>
            <div className="canvas_models_placing_settings_height_level_buttons_container">
              <div
                className="canvas_models_placing_settings_height_level_button canvas_models_placing_settings_button_left"
                onClick={() => {HandleModelBuildHeightLevelChange(-1)}} //prettier-ignore
              >
                -
              </div>
              {/* prettier-ignore */}
              <div className="canvas_models_placing_settings_height_level_button" style={{ pointerEvents: "none" }}>{model_build_height_level / 2}</div>
              <div
                className="canvas_models_placing_settings_height_level_button canvas_models_placing_settings_button_right"
                onClick={() => {HandleModelBuildHeightLevelChange(+1)}} //prettier-ignore
              >
                +
              </div>
            </div>
          </div>
          <div className="canvas_models_placing_settings_pivot_controls_container">
            <div className="canvas_models_placing_settings_pivot_controls_description">pivot controls:</div>
            <div className="canvas_models_placing_settings_pivot_controls_buttons_container">
              <div
                className= { pivot_controls_enabled.x ? "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_enabled canvas_models_placing_settings_button_left" : "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_disabled canvas_models_placing_settings_button_left"} //prettier-ignore
                onClick={() => {handlePivotControlsChange("x")}} //prettier-ignore
              >
                X
              </div>
              <div
                className= { pivot_controls_enabled.y ? "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_enabled" : "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_disabled"} //prettier-ignore
                onClick={() => {handlePivotControlsChange("y")}} //prettier-ignore
              >
                Y
              </div>
              <div
                className= { pivot_controls_enabled.z ? "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_enabled canvas_models_placing_settings_button_right" : "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_disabled canvas_models_placing_settings_button_right"} //prettier-ignore
                onClick={() => {handlePivotControlsChange("z")}} //prettier-ignore
              >
                Z
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return {
    symmetry_enabled,
    unit_distance_number,
    model_build_height_level,
    pivot_controls_enabled,
    ModelPlacingSettingsMainContainer,
  };
}
