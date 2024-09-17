import { useState } from "react";

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
  set_enable_model_textures,
  set_bloom_state,
  set_better_lighting_state,
  set_ssao_state,
  set_antialiasing_state,
  set_audio,
} from "../../Store.tsx";

import { AudioPlayer } from "./AudioPlayer.tsx";
import menu_sound from "../../audio/menu_sound.mp3";

import controls_sound from "../../audio/controls_sound.mp3";
import buttons_sound from "../../audio/buttons_sound.mp3";

//? ----------------------------------------------------------------------------------------------------

//? This component provides access to multiple settings related to the app, divided into different sections:
//? - UI settings
//? - Audio
//? - Performance | System
//? - Postprocessing | Visuals
//? - more in the future

//? ----------------------------------------------------------------------------------------------------

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
  const active_models_state = useSelector((state: RootState) => state.pageSettings.active_models_state); //prettier-ignore
  const camera_fov = useSelector((state: RootState) => state.pageSettings.camera_fov); //prettier-ignore

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const better_lighting_state = useSelector((state: RootState) => state.pageSettings.better_lighting_state); //prettier-ignore
  const ssao_state = useSelector((state: RootState) => state.pageSettings.ssao_state); //prettier-ignore
  const antialiasing_state = useSelector((state: RootState) => state.pageSettings.antialiasing_state); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

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
    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  function ControlsButtonClick() {
    set_controls_button_click(!controls_button_click);
    set_settings_button_click(false);
    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  function HandleHintsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_hints(true));
    } else if (!toggle) {
      dispatch(set_enable_hints(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandlePresetsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_presets(true));
    } else if (!toggle) {
      dispatch(set_enable_presets(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleCamerasSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_cameras(true));
    } else if (!toggle) {
      dispatch(set_enable_cameras(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleStructuresVisibilitySwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_structures_visibility(true));
    } else if (!toggle) {
      dispatch(set_enable_structures_visibility(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleResourceCounterSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_resource_container(true));
    } else if (!toggle) {
      dispatch(set_enable_resource_container(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleModelControlsSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_model_transform_controls(true));
    } else if (!toggle) {
      dispatch(set_enable_model_transform_controls(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleActiveModelsStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_active_models_state(true));
    } else if (!toggle) {
      dispatch(set_active_models_state(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleEnableModelTexturesSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_enable_model_textures(true));
    } else if (!toggle) {
      dispatch(set_enable_model_textures(false));
    }

    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandleAudioSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_audio(true));
    } else if (!toggle) {
      dispatch(set_audio(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandlePerformanceMonitorStateSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_performance_monitor_state(true));
    } else if (!toggle) {
      dispatch(set_performance_monitor_state(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  }

  function HandlePerformanceModeSwitch(toggle: boolean) {
    if (toggle) {
      dispatch(set_performance_mode(true));

      dispatch(set_bloom_state(false));
      dispatch(set_better_lighting_state(false));
      dispatch(set_ssao_state(false));
      dispatch(set_antialiasing_state(false));
    } else if (!toggle) {
      dispatch(set_performance_mode(false));

      dispatch(set_bloom_state(true));
      dispatch(set_better_lighting_state(true));
      dispatch(set_ssao_state(false));
      dispatch(set_antialiasing_state(false));
    }
    if (audio) {
      AudioPlayer(buttons_sound);
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
    if (audio) {
      AudioPlayer(buttons_sound);
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
    if (audio) {
      AudioPlayer(buttons_sound);
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
    if (audio) {
      AudioPlayer(buttons_sound);
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
    if (audio) {
      AudioPlayer(buttons_sound);
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
        <div className="settings_segment_title">audio:</div>

        <div className="settings_element">
          <div className="settings_element_description">audio:</div>
          <div className="settings_element_buttons_container">
            <div
              onClick={() => HandleAudioSwitch(true)}
              className={
                audio
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_left"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_left"
              }
            >
              {!audio ? "enable" : "enabled"}
            </div>
            <div
              onClick={() => HandleAudioSwitch(false)}
              className={
                !audio
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {audio ? "disable" : "disabled"}
            </div>
          </div>
        </div>

        <div className="settings_segment_title">performance | system</div>

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
                !enable_model_textures
                  ? "settings_element_buttons settings_element_buttons_enable settings_element_buttons_right"
                  : "settings_element_buttons settings_element_buttons_disable settings_element_buttons_right"
              }
            >
              {enable_model_textures ? "disable" : "disabled"}
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
        <div className="controls_settings_description_container_text">settings</div>
        <div className="controls_settings_description_container_text">controls</div>
      </div>
    </>
  );
};

export default Settings;
