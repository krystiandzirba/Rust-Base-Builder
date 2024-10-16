import { useEffect, useState } from "react";
import { useAudioPlayer } from "./AudioPlayer.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState, set_object_selected, set_selected_model_id, set_symmetry_x_enabled, set_symmetry_z_enabled, set_unit_distance_number, set_model_build_height_level, set_pivot_controls_x_enabled, set_pivot_controls_y_enabled, set_pivot_controls_z_enabled } from "../../Store.tsx"; //prettier-ignore

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component Component that provides a symmetrical (X+Z) models placing, models transform unit change (fixed+dynamic)
//Component height on which the models are created and pivot controls over every axis (x+y+z)
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function CanvasModelsPlacingSettings() {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const symmetry_x_enabled = useSelector((state: RootState) => state.modelsPlacementSettings.symmetry_x_enabled); //prettier-ignore
  const symmetry_z_enabled = useSelector((state: RootState) => state.modelsPlacementSettings.symmetry_z_enabled); //prettier-ignore
  const unit_distance_number = useSelector((state: RootState) => state.modelsPlacementSettings.unit_distance_number); //prettier-ignore
  const model_build_height_level = useSelector((state: RootState) => state.modelsPlacementSettings.model_build_height_level); //prettier-ignore
  const pivot_controls_x_enabled = useSelector((state: RootState) => state.modelsPlacementSettings.pivot_controls_x_enabled); //prettier-ignore
  const pivot_controls_y_enabled = useSelector((state: RootState) => state.modelsPlacementSettings.pivot_controls_y_enabled); //prettier-ignore
  const pivot_controls_z_enabled = useSelector((state: RootState) => state.modelsPlacementSettings.pivot_controls_z_enabled); //prettier-ignore

  const [custom_unit_distance_number, set_custom_unit_distance_number] = useState<string>("");
  const [initial_render, set_initial_render] = useState<boolean>(false);

  function HandleSymmetryStateChange(symmetry_axis: string) {
    if (symmetry_axis === "x") {
      dispatch(set_symmetry_x_enabled(!symmetry_x_enabled));
    } else if (symmetry_axis === "z") {
      dispatch(set_symmetry_z_enabled(!symmetry_z_enabled));
    }
    playSound("menu_sound");
  }

  function HandleUnitDistanceChange(value: number) {
    playSound("menu_sound");
    dispatch(set_unit_distance_number(value));
  }

  const HandleCustomUnitDistanceChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    set_custom_unit_distance_number(e.target.value);
    playSound("menu_sound");
  };

  function HandleModelBuildHeightLevelChange(value: number) {
    const new_model_build_height_level = model_build_height_level + value;

    if (new_model_build_height_level >= 0) {
      dispatch(set_model_build_height_level(new_model_build_height_level));
      playSound("buttons_sound");
    }
  }

  function handlePivotControlsChange(pivot_axis: string) {
    if (pivot_axis === "x") {
      dispatch(set_pivot_controls_x_enabled(!pivot_controls_x_enabled));
    } else if (pivot_axis === "y") {
      dispatch(set_pivot_controls_y_enabled(!pivot_controls_y_enabled));
    } else if (pivot_axis === "z") {
      dispatch(set_pivot_controls_z_enabled(!pivot_controls_z_enabled));
    }
    playSound("menu_sound");
  }

  useEffect(() => {
    if (initial_render) {
      dispatch(set_unit_distance_number(custom_unit_distance_number));
    } else {
      set_initial_render(true);
    }
  }, [custom_unit_distance_number]);

  return (
    <div className="canvas_models_placing_settings_main_container">
      <div className="canvas_models_placing_settings_content_row">
        <div className="canvas_models_placing_settings_symmetry_container">
          <div className="canvas_models_placing_settings_symmetry_container_description">symmetry:</div>
          <div className="canvas_models_placing_settings_symmetry_buttons_container">
            <div
              className={symmetry_x_enabled ? "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_enabled canvas_models_placing_settings_button_left" : "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_disabled canvas_models_placing_settings_button_left"} // prettier-ignore
              onClick={() => HandleSymmetryStateChange("x")} //prettier-ignore
            >
              X
            </div>
            <div
              className={symmetry_z_enabled ? "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_enabled canvas_models_placing_settings_button_right" : "canvas_models_placing_settings_symmetry_button canvas_models_placing_settings_symmetry_button_disabled canvas_models_placing_settings_button_right"} // prettier-ignore
              onClick={() => HandleSymmetryStateChange("z")} //prettier-ignore
            >
              Z
            </div>
          </div>
        </div>
        <div className="canvas_models_placing_settings_distance_units_container">
          <div className="canvas_models_placing_settings_distance_units_description">distance unit:</div>
          <div className="canvas_models_placing_settings_distance_units_buttons_container">
            <div
              className= {unit_distance_number === 0.125 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_enabled canvas_models_placing_settings_button_left" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_disabled canvas_models_placing_settings_button_left"} // prettier-ignore
              onClick={() => HandleUnitDistanceChange(0.125)} //prettier-ignore
            >
              0.125
            </div>
            <div
              className= {unit_distance_number === 1 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_enabled" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_disabled"} // prettier-ignore
              onClick={() => HandleUnitDistanceChange(1)} //prettier-ignore
            >
              1
            </div>
            <div
              className= {unit_distance_number === 5 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_enabled" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_distance_units_button_disabled"} // prettier-ignore
              onClick={() => HandleUnitDistanceChange(5)} //prettier-ignore
            >
              5
            </div>
            {/* prettier-ignore */}
            <input min={0} max={50} style={{ width: '32.5%' }} type="number" value={custom_unit_distance_number} onChange={HandleCustomUnitDistanceChange} onFocus={(e) => e.target.select()} placeholder="custom" className={unit_distance_number !== 0.125 && unit_distance_number !== 1 && unit_distance_number !== 5 ? "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_pivot_controls_button_enabled canvas_models_placing_settings_button_right" : "canvas_models_placing_settings_distance_units_button canvas_models_placing_settings_pivot_controls_button_disabled canvas_models_placing_settings_button_right"}/>
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
              className= { pivot_controls_x_enabled ? "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_enabled canvas_models_placing_settings_button_left" : "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_disabled canvas_models_placing_settings_button_left"} //prettier-ignore
              onClick={() => {handlePivotControlsChange("x")}} //prettier-ignore
            >
              X
            </div>
            <div
              className= { pivot_controls_y_enabled ? "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_enabled" : "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_disabled"} //prettier-ignore
              onClick={() => {handlePivotControlsChange("y")}} //prettier-ignore
            >
              Y
            </div>
            <div
              className= { pivot_controls_z_enabled ? "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_enabled canvas_models_placing_settings_button_right" : "canvas_models_placing_settings_pivot_controls_button canvas_models_placing_settings_pivot_controls_button_disabled canvas_models_placing_settings_button_right"} //prettier-ignore
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
