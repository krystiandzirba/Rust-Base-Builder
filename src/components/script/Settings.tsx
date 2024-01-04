import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Slider } from "@mui/material";

import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import {
  set_enable_hints,
  set_enable_presets,
  set_enable_cameras,
  set_enable_structures_visibility,
  set_enable_resource_container,
  set_enable_model_transform_controls,
  set_performance_monitor_state,
  set_model_textures_state,
  set_model_hover_color_state,
  set_model_click_color_state,
  set_active_models_state,
  set_camera_fov,
} from "../../Store.tsx";

const Settings = () => {
  const dispatch = useDispatch();
  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_presets = useSelector((state: RootState) => state.pageSettings.enable_presets);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const model_textures_state = useSelector((state: RootState) => state.pageSettings.model_textures_state); //prettier-ignore
  const model_hover_color_state = useSelector((state: RootState) => state.pageSettings.model_hover_color_state); //prettier-ignore
  const model_click_color_state = useSelector((state: RootState) => state.pageSettings.model_click_color_state); //prettier-ignore
  const active_models_state = useSelector((state: RootState) => state.pageSettings.active_models_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore

  const [settings_button_click, set_settings_button_click] = useState<boolean>(false);
  const [settings_button_hover, set_settings_button_hover] = useState<boolean>(false);

  function SettingsButtonClick() {
    set_settings_button_click(!settings_button_click);
  }

  function SettingsButtonEnter() {
    set_settings_button_hover(true);
  }

  function SettingsButtonLeave() {
    set_settings_button_hover(false);
  }

  function HandleHintsSwitch() {
    dispatch(set_enable_hints(!enable_hints));
  }

  function HandlePresetsSwitch() {
    dispatch(set_enable_presets(!enable_presets));
  }

  function HandleCamerasSwitch() {
    dispatch(set_enable_cameras(!enable_cameras));
  }

  function HandleStructuresVisibilitySwitch() {
    dispatch(set_enable_structures_visibility(!enable_structures_visibility));
  }

  function HandleResourceCounterSwitch() {
    dispatch(set_enable_resource_container(!enable_resource_container));
  }

  function HandleModelControlsSwitch() {
    dispatch(set_enable_model_transform_controls(!model_transform_controls));
  }

  function HandlePerformanceMonitorStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_performance_monitor_state(true));
    } else if (!toggle) {
      dispatch(set_performance_monitor_state(false));
    }
  }

  function HandleModelTexturesStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_model_textures_state(true));
    } else if (!toggle) {
      dispatch(set_model_textures_state(false));
    }
  }

  function HandleModelHoverColorStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_model_hover_color_state(true));
    } else if (!toggle) {
      dispatch(set_model_hover_color_state(false));
    }
  }

  function HandleModelClickColorStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_model_hover_color_state(true));
    } else if (!toggle) {
      dispatch(set_model_hover_color_state(false));
    }
  }

  function HandleActiveModelsStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_active_models_state(true));
    } else if (!toggle) {
      dispatch(set_active_models_state(false));
    }
  }

  const HandleCameraFovChange = (_event: Event, newValue: number | number[]) => {
    dispatch(set_camera_fov(newValue as number));
  };

  return (
    <>
      <div
        className={
          settings_button_click
            ? "settings_container settings_container_displayed"
            : "settings_container settings_container_hidden"
        }
      >
        <div className="settings_segment_title"> UI settings</div>
        <div className="settings_segment settings_ui_segment">
          <div>
            <FormControlLabel
              onChange={() => {
                HandleHintsSwitch();
              }}
              control={<Checkbox />}
              label="disable hints"
            />
          </div>
          <div>
            <FormControlLabel
              onChange={() => {
                HandlePresetsSwitch();
              }}
              control={<Checkbox />}
              label="disable presets"
            />
          </div>
          <div>
            <FormControlLabel
              onChange={() => {
                HandleCamerasSwitch();
              }}
              control={<Checkbox />}
              label="disable cameras"
            />
          </div>
          <div>
            <FormControlLabel
              onChange={() => {
                HandleStructuresVisibilitySwitch();
              }}
              control={<Checkbox />}
              label="disable structures visibility"
            />
          </div>
          <div>
            <FormControlLabel
              onChange={() => {
                HandleResourceCounterSwitch();
              }}
              control={<Checkbox />}
              label="disable resource counter"
            />
          </div>
          <div>
            <FormControlLabel
              onChange={() => {
                HandleModelControlsSwitch();
              }}
              control={<Checkbox />}
              label="disable mouse model controls"
            />
          </div>
          {/* <div className="">disable active models</div> */}
        </div>
        <div className="settings_segment_title">performace / system</div>
        <div className="settings_segment settings_performance_segment">
          <div className="settings_element">
            <div className="settings_element_description">enable performance monitor</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandlePerformanceMonitorStateSwitch(true)}
                className="settings_element_buttons settings_element_buttons_enable"
              >
                enable
              </div>
              <div
                onClick={() => HandlePerformanceMonitorStateSwitch(false)}
                className="settings_element_buttons settings_element_buttons_disable"
              >
                disable
              </div>
            </div>
          </div>
          {/* <div className="settings_element">
            <div className="settings_element_description">disable model textures in overview mode</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleModelTexturesStateSwitch(true)}
                className="settings_element_buttons settings_element_buttons_enable"
              >
                enable
              </div>
              <div
                onClick={() => HandleModelTexturesStateSwitch(false)}
                className="settings_element_buttons settings_element_buttons_disable"
              >
                disable
              </div>
            </div>
          </div> */}

          {/* <div className="settings_element">
            <div className="settings_element_description">disable model color on mouse hover</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleModelHoverColorStateSwitch(true)}
                className="settings_element_buttons settings_element_buttons_enable"
              >
                enable
              </div>
              <div
                onClick={() => HandleModelHoverColorStateSwitch(false)}
                className="settings_element_buttons settings_element_buttons_disable"
              >
                disable
              </div>
            </div>
          </div> */}

          {/* <div className="settings_element">
            <div className="settings_element_description">disable model color on mouse click</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleModelClickColorStateSwitch(true)}
                className="settings_element_buttons settings_element_buttons_enable"
              >
                enable
              </div>
              <div
                onClick={() => HandleModelClickColorStateSwitch(false)}
                className="settings_element_buttons settings_element_buttons_disable"
              >
                disable
              </div>
            </div>
          </div> */}

          <div className="settings_element">
            <div className="settings_element_description">disable active models</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleActiveModelsStateSwitch(true)}
                className="settings_element_buttons settings_element_buttons_enable"
              >
                enable
              </div>
              <div
                onClick={() => HandleActiveModelsStateSwitch(false)}
                className="settings_element_buttons settings_element_buttons_disable"
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">3d camera fov slider</div>
            <Slider
              aria-label="Volume"
              value={camera_fov}
              min={60}
              max={120}
              step={5}
              onChange={HandleCameraFovChange}
            />
          </div>
        </div>
      </div>

      <div className="settings_button_container">
        <button
          className="settings_button"
          onClick={() => SettingsButtonClick()}
          onMouseEnter={() => SettingsButtonEnter()}
          onMouseLeave={() => SettingsButtonLeave()}
        >
          {!settings_button_click && <FontAwesomeIcon icon={faGear} size="3x" style={{ color: "#a8a8a8" }} />}
          {
            settings_button_click && <FontAwesomeIcon icon={faGear} spin size="3x" style={{ color: "#d4d4d4" }}/> //prettier-ignore
          }
        </button>
      </div>
    </>
  );
};

export default Settings;
