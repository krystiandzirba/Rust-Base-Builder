import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Slider, ThemeProvider, createTheme } from "@mui/material";

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

  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            color: "#ffd5b3",
          },
          thumb: {
            color: "white",
          },
          mark: {
            backgroundColor: "white",
          },
          markLabel: {
            color: "white",
            fontSize: "1.3vh",
          },
        },
      },
    },
  });

  const marks = [
    {
      value: 60,
      label: "60",
    },
    {
      value: 70,
      label: "70",
    },
    {
      value: 80,
      label: "80",
    },
    {
      value: 90,
      label: "90",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 110,
      label: "110",
    },
    {
      value: 120,
      label: "120",
    },
  ];

  function SettingsButtonClick() {
    set_settings_button_click(!settings_button_click);
  }

  function SettingsButtonEnter() {
    set_settings_button_hover(true);
  }

  function SettingsButtonLeave() {
    set_settings_button_hover(false);
  }

  function HandleHintsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_hints(true));
    } else if (!toggle) {
      dispatch(set_enable_hints(false));
    }
  }

  function HandlePresetsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_presets(true));
    } else if (!toggle) {
      dispatch(set_enable_presets(false));
    }
  }

  function HandleCamerasSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_cameras(true));
    } else if (!toggle) {
      dispatch(set_enable_cameras(false));
    }
  }

  function HandleStructuresVisibilitySwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_structures_visibility(true));
    } else if (!toggle) {
      dispatch(set_enable_structures_visibility(false));
    }
  }

  function HandleResourceCounterSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_resource_container(true));
    } else if (!toggle) {
      dispatch(set_enable_resource_container(false));
    }
  }

  function HandleModelControlsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_model_transform_controls(true));
    } else if (!toggle) {
      dispatch(set_enable_model_transform_controls(false));
    }
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
        <div className="settings_segment_title">UI settings</div>
        <div className="settings_segment settings_ui_segment">
          <div className="settings_element">
            <div className="settings_element_description">display control hints:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleHintsSwitch(true)}
                className={
                  enable_hints
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandleHintsSwitch(false)}
                className={
                  !enable_hints
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">display base presets:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandlePresetsSwitch(true)}
                className={
                  enable_presets
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandlePresetsSwitch(false)}
                className={
                  !enable_presets
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">display 2D | D3 cameras switch:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleCamerasSwitch(true)}
                className={
                  enable_cameras
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandleCamerasSwitch(false)}
                className={
                  !enable_cameras
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">display structure visibility type switch:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleStructuresVisibilitySwitch(true)}
                className={
                  enable_structures_visibility
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandleStructuresVisibilitySwitch(false)}
                className={
                  !enable_structures_visibility
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">display resource counter:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleResourceCounterSwitch(true)}
                className={
                  enable_resource_container
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandleResourceCounterSwitch(false)}
                className={
                  !enable_resource_container
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">display mouse model controls:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleModelControlsSwitch(true)}
                className={
                  model_transform_controls
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandleModelControlsSwitch(false)}
                className={
                  !model_transform_controls
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">display active models:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandleActiveModelsStateSwitch(true)}
                className={
                  active_models_state
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandleActiveModelsStateSwitch(false)}
                className={
                  !active_models_state
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>
        </div>

        <div className="settings_segment_title">performace | system</div>
        <div className="settings_segment settings_performance_segment">
          <div className="settings_element">
            <div className="settings_element_description">display performance monitor:</div>
            <div className="settings_element_buttons_container">
              <div
                onClick={() => HandlePerformanceMonitorStateSwitch(true)}
                className={
                  performance_monitor_state
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
                }
              >
                enable
              </div>
              <div
                onClick={() => HandlePerformanceMonitorStateSwitch(false)}
                className={
                  !performance_monitor_state
                    ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                    : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
                }
              >
                disable
              </div>
            </div>
          </div>

          <div className="settings_element">
            <div className="settings_element_description">3d camera fov:</div>
            <ThemeProvider theme={theme}>
              <Slider
                aria-label="Volume"
                value={camera_fov}
                min={60}
                max={120}
                step={10}
                marks={marks}
                style={{ width: "40%" }}
                onChange={HandleCameraFovChange}
              />
            </ThemeProvider>
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

      <div className="settings_button_container">
        <button
          className="settings_button"
          onClick={() => SettingsButtonClick()}
          onMouseEnter={() => SettingsButtonEnter()}
          onMouseLeave={() => SettingsButtonLeave()}
        >
          {!settings_button_click && <FontAwesomeIcon icon={faGear} size="4x" style={{ color: "#a8a8a8" }} />}
          {
            settings_button_click && <FontAwesomeIcon icon={faGear} spin size="4x" style={{ color: "#ffd5b3" }}/> //prettier-ignore
          }
        </button>
      </div>
    </>
  );
};

export default Settings;