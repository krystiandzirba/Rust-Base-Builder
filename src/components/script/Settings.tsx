import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGamepad } from "@fortawesome/free-solid-svg-icons";

import { Slider, ThemeProvider, createTheme } from "@mui/material";

import controls_a_Thumbnail from "../../icons/controls_a_thumbnail.png";
import controls_b_Thumbnail from "../../icons/controls_b_thumbnail.png";

import settings_a_Thumbnail from "../../icons/settings_a_thumbnail.png";
import settings_b_Thumbnail from "../../icons/settings_b_thumbnail.png";

import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import {
  set_enable_hints,
  set_enable_presets,
  set_enable_cameras,
  set_enable_structures_visibility,
  set_enable_resource_container,
  set_enable_model_transform_controls,
  set_performance_mode,
  set_performance_monitor_state,
  set_active_models_state,
  set_camera_fov,
  set_pivot_controls_state,
  set_enable_model_textures,
  set_enable_model_material,
  set_bloom_state,
  set_better_lighting_state,
  set_ssao_state,
  set_antialiasing_state,
  set_HDR_state,
} from "../../Store.tsx";

const Settings = () => {
  const dispatch = useDispatch();
  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_presets = useSelector((state: RootState) => state.pageSettings.enable_presets);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  const performance_mode = useSelector((state: RootState) => state.pageSettings.performance_mode); //prettier-ignore
  const performance_monitor_state = useSelector((state: RootState) => state.pageSettings.performance_monitor_state); //prettier-ignore
  const enable_model_textures = useSelector((state: RootState) => state.pageSettings.enable_model_textures); //prettier-ignore
  const enable_model_material= useSelector((state: RootState) => state.pageSettings.enable_model_material); //prettier-ignore
  const active_models_state = useSelector((state: RootState) => state.pageSettings.active_models_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore
  const pivot_controls_state = useSelector((state: RootState) => state.pageSettings.pivot_controls_state); //prettier-ignore

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore
  const ssao_state = useSelector((state: RootState) => state.pageSettings.ssao_state); //prettier-ignore
  const antialiasing_state = useSelector((state: RootState) => state.pageSettings.antialiasing_state); //prettier-ignore
  const HDR_state = useSelector((state: RootState) => state.pageSettings.HDR_state); //prettier-ignore

  const [settings_button_click, set_settings_button_click] = useState<boolean>(false);
  const [controls_button_click, set_controls_button_click] = useState<boolean>(false);

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
    set_controls_button_click(false);
  }

  function ControlsButtonClick() {
    set_controls_button_click(!controls_button_click);
    set_settings_button_click(false);
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

  function HandleActiveModelsStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_active_models_state(true));
    } else if (!toggle) {
      dispatch(set_active_models_state(false));
    }
  }

  function HandlePivotControlsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_pivot_controls_state(true));
    } else if (!toggle) {
      dispatch(set_pivot_controls_state(false));
    }
  }

  function HandleEnableModelTexturesSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_enable_model_textures(true));
      } else if (!toggle) {
        dispatch(set_enable_model_textures(false));
      }
    }
  }

  function HandleModelMaterialSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_enable_model_material(true));
      } else if (!toggle) {
        dispatch(set_enable_model_material(false));
      }
    }
  }

  function HandlePerformanceMonitorStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_performance_monitor_state(true));
    } else if (!toggle) {
      dispatch(set_performance_monitor_state(false));
    }
  }

  function HandlePerformanceModeSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_performance_mode(true));

      dispatch(set_bloom_state(false));
      dispatch(set_better_lighting_state(false));
      dispatch(set_ssao_state(false));
      dispatch(set_antialiasing_state(false));
      dispatch(set_HDR_state(false));
      dispatch(set_enable_model_textures(false));
      dispatch(set_enable_model_material(false));
    } else if (!toggle) {
      dispatch(set_performance_mode(false));

      dispatch(set_bloom_state(true));
      dispatch(set_better_lighting_state(true));
      dispatch(set_ssao_state(false));
      dispatch(set_antialiasing_state(true));
      dispatch(set_HDR_state(false));
      dispatch(set_enable_model_textures(true));
      dispatch(set_enable_model_material(true));
    }
  }

  function HandleBloomStateSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_bloom_state(true));
      } else if (!toggle) {
        dispatch(set_bloom_state(false));
      }
    }
  }

  function HandleBetterLightingStateSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_better_lighting_state(true));
      } else if (!toggle) {
        dispatch(set_better_lighting_state(false));
      }
    }
  }

  function HandleSSAOStateSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_ssao_state(true));
      } else if (!toggle) {
        dispatch(set_ssao_state(false));
      }
    }
  }

  function HandleAntialiasingStateSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_antialiasing_state(true));
      } else if (!toggle) {
        dispatch(set_antialiasing_state(false));
      }
    }
  }

  function HandleHDRStateSwitch(toggle: boolean) {
    if (!performance_mode) {
      if (toggle) {
        dispatch(set_HDR_state(true));
      } else if (!toggle) {
        dispatch(set_HDR_state(false));
      }
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
              {!enable_hints ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleHintsSwitch(false)}
              className={
                !enable_hints
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_hints ? "disable" : "disabled"}
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
              {!enable_presets ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandlePresetsSwitch(false)}
              className={
                !enable_presets
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_presets ? "disable" : "disabled"}
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
              {!enable_cameras ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleCamerasSwitch(false)}
              className={
                !enable_cameras
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_cameras ? "disable" : "disabled"}
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
              {!enable_structures_visibility ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleStructuresVisibilitySwitch(false)}
              className={
                !enable_structures_visibility
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_structures_visibility ? "disable" : "disabled"}
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
              {!enable_resource_container ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleResourceCounterSwitch(false)}
              className={
                !enable_resource_container
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_resource_container ? "disable" : "disabled"}
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
              {!model_transform_controls ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleModelControlsSwitch(false)}
              className={
                !model_transform_controls
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {model_transform_controls ? "disable" : "disabled"}
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
              {!active_models_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleActiveModelsStateSwitch(false)}
              className={
                !active_models_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {active_models_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_element">
          <div className="settings_element_description">model pivot controls:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandlePivotControlsSwitch(true)}
              className={
                pivot_controls_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!pivot_controls_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandlePivotControlsSwitch(false)}
              className={
                !pivot_controls_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {pivot_controls_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_segment_title">performace | system</div>

        <div className="settings_element">
          <div className="settings_element_description">performance mode:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandlePerformanceModeSwitch(true)}
              className={
                performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              performance
            </div>
            <div
              onClick={() => HandlePerformanceModeSwitch(false)}
              className={
                !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              quality
            </div>
          </div>
        </div>

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
              {!performance_monitor_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandlePerformanceMonitorStateSwitch(false)}
              className={
                !performance_monitor_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {performance_monitor_state ? "disable" : "disabled"}
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
        <div className="settings_segment_title">postprocessing | visuals</div>

        <div className="settings_element">
          <div className="settings_element_description">model textures:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleEnableModelTexturesSwitch(true)}
              className={
                enable_model_textures
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!enable_model_textures ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleEnableModelTexturesSwitch(false)}
              className={
                !enable_model_textures && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_model_textures ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_element">
          <div className="settings_element_description">model transparency + color on hover:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleModelMaterialSwitch(true)}
              className={
                enable_model_material
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!enable_model_material ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleModelMaterialSwitch(false)}
              className={
                !enable_model_material && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_model_material ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_element">
          <div className="settings_element_description">bloom:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleBloomStateSwitch(true)}
              className={
                bloom_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!bloom_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleBloomStateSwitch(false)}
              className={
                !bloom_state && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {bloom_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">better lighting:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleBetterLightingStateSwitch(true)}
              className={
                better_lighting_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!better_lighting_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleBetterLightingStateSwitch(false)}
              className={
                !better_lighting_state && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {better_lighting_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_element">
          <div className="settings_element_description">SSAO (screen space ambient occlusion):</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleSSAOStateSwitch(true)}
              className={
                ssao_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!ssao_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleSSAOStateSwitch(false)}
              className={
                !ssao_state && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {ssao_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">antialiasing:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleAntialiasingStateSwitch(true)}
              className={
                antialiasing_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              SMAA
            </div>
            <div
              onClick={() => HandleAntialiasingStateSwitch(false)}
              className={
                !antialiasing_state && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {antialiasing_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_element">
          <div className="settings_element_description">HDR background:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleHDRStateSwitch(true)}
              className={
                HDR_state
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {HDR_state ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleHDRStateSwitch(false)}
              className={
                !HDR_state && !performance_mode
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {HDR_state ? "disable" : "disabled"}
            </div>
          </div>
        </div>
      </div>

      <div
        className="controls_button_container"
        style={{
          backgroundImage: `url(${!controls_button_click ? controls_a_Thumbnail : controls_b_Thumbnail})`,
          backgroundSize: "cover",
        }}
      >
        <button className="settings_button" onClick={() => ControlsButtonClick()}></button>
      </div>

      <div
        className={
          settings_button_click
            ? "settings_button_container settings_button_container_spin"
            : "settings_button_container"
        }
        style={{
          backgroundImage: `url(${!settings_button_click ? settings_a_Thumbnail : settings_b_Thumbnail})`,
          backgroundSize: "cover",
        }}
      >
        <button className="settings_button" onClick={() => SettingsButtonClick()}></button>
      </div>

      <div
        className={
          controls_button_click
            ? "controls_container controls_container_displayed"
            : "controls_container controls_container_hidden"
        }
      >
        <div className="settings_segment_title">Mouse controls 3D mode</div>
        <div className="settings_element">
          <div className="settings_element_description">MB1 | LMB (left mouse button)</div>
          <div className="controls_element">rotate camera</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">MB2 | RMB (right mouse button)</div>
          <div className="controls_element">move camera</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">Mouse wheel | scroll </div>
          <div className="controls_element">zoom in-out camera</div>
        </div>
        <div className="settings_segment_title">Mouse controls 2D mode</div>
        <div className="settings_element">
          <div className="settings_element_description"> MB1 | MB2 | LMB | RMB </div>
          <div className="controls_element">move camera</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">Mouse wheel | scroll </div>
          <div className="controls_element">zoom in-out camera</div>
        </div>
        <div className="settings_segment_title">Keyboard controls ( when model is selected)</div>
        <div className="settings_element">
          <div className="settings_element_description">W | ⇧</div>
          <div className="controls_element">move selected object forward</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">D | ⇨</div>
          <div className="controls_element">move selected object right</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">S | ⇩</div>
          <div className="controls_element">move selected object down</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">A | ⇦</div>
          <div className="controls_element">move selected object left</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">Q</div>
          <div className="controls_element">rotate selected object counter clockwise</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">E</div>
          <div className="controls_element">rotate selected object clockwise</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">SPACE</div>
          <div className="controls_element">move selected object up (height)</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">CTRL</div>
          <div className="controls_element">move selected object down (height)</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">SHIFT</div>
          <div className="controls_element">change the object (moving) distance unit</div>
        </div>
        <div className="settings_element">
          <div className="settings_element_description">DEL | BACKSPACE</div>
          <div className="controls_element">delete selected model</div>
        </div>
      </div>

      <div className="controls_settings_description_container">
        <div className="controls_settings_description_container_text">controls</div>
        <div className="controls_settings_description_container_text">settings</div>
      </div>
    </>
  );
};

export default Settings;
