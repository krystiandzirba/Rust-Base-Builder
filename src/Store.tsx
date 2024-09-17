import { configureStore, createSlice } from "@reduxjs/toolkit";

const pageModeSlice = createSlice({
  name: "page mode",
  initialState: {
    page_mode: "overview",
  },
  reducers: {
    set_page_mode: (state, action) => {
      return { ...state, page_mode: action.payload };
    },
  },
});

const hardwareSlice = createSlice({
  name: "hardware parameters",
  initialState: {
    hardware_gpu: "",
    hardware_tier: "",
    hardware_is_mobile: false,
    hardware_monitor_resolution: {},
  },
  reducers: {
    set_hardware_gpu: (state, action) => {
      return { ...state, hardware_gpu: action.payload };
    },
    set_hardware_tier: (state, action) => {
      return { ...state, hardware_tier: action.payload };
    },
    set_hardware_is_mobile: (state, action) => {
      return { ...state, hardware_is_mobile: action.payload };
    },
    set_hardware_monitor_resolution: (state, action) => {
      return { ...state, hardware_monitor_resolution: action.payload };
    },
  },
});

const camerasSettingsSlice = createSlice({
  name: "camera type",
  initialState: {
    camera_type: "camera_3d",

    camera_3d_reset: false,
    camera_3d_direction: "north",

    camera_2d_direction: "",
    camera_2d_position: [0, 0, 45],
  },
  reducers: {
    set_camera_type: (state, action) => {
      return { ...state, camera_type: action.payload };
    },

    set_camera_3d_reset: (state, action) => {
      return { ...state, camera_3d_reset: action.payload };
    },
    set_camera_3d_direction: (state, action) => {
      return { ...state, camera_3d_direction: action.payload };
    },

    set_camera_2d_direction: (state, action) => {
      return { ...state, camera_2d_direction: action.payload };
    },
    set_camera_2d_position: (state, action) => {
      return { ...state, camera_2d_position: action.payload };
    },
  },
});

const cursorTypeSlice = createSlice({
  name: "cursor type",
  initialState: {
    cursor_type: "default",
  },
  reducers: {
    set_cursor_type: (state, action) => {
      return { ...state, cursor_type: action.payload };
    },
  },
});

const canvasModelsArraySlice = createSlice({
  name: "canvas models array",
  initialState: {
    canvas_models_array: [],
  },
  reducers: {
    set_canvas_models_array: (state, action) => {
      return { ...state, canvas_models_array: action.payload };
    },
  },
});

const controlsInputSlice = createSlice({
  name: "controls input",
  initialState: {
    object_distance_multiplier: 1,

    button_input: "",
    button_trigger: 0,
    object_rotation_degree: 90,

    delete_object_mode: "none",
    delete_object_mouse_trigger: 0,
  },
  reducers: {
    set_object_distance_multiplier: (state, action) => {
      return { ...state, object_distance_multiplier: action.payload };
    },
    set_button_input: (state, action) => {
      return { ...state, button_input: action.payload };
    },
    set_button_trigger: (state, action) => {
      return { ...state, button_trigger: action.payload };
    },
    set_object_rotation_degree: (state, action) => {
      return { ...state, object_rotation_degree: action.payload };
    },

    set_delete_object_mode: (state, action) => {
      return { ...state, delete_object_mode: action.payload };
    },
    set_delete_object_mouse_trigger: (state, action) => {
      return { ...state, delete_object_mouse_trigger: action.payload };
    },
  },
});

const modelsDataSlice = createSlice({
  name: "models data",
  initialState: {
    model_type_to_create: "",
    model_creation_state: false,

    object_selected: false,
    selected_model_id: "empty",
    selected_object_list: -1,

    models_xray_active: false,

    foundations_active: true,
    walls_active: true,
    floors_active: true,
    stairs_active: true,
    doors_active: true,
    frames_active: true,
    roofs_active: true,
    miscs_active: true,

    model_to_destroy: "none",
    model_upgrade_trigger: 0,
    model_downgrade_trigger: 0,
    model_tier_change: "",
    model_destroy_trigger: 0,
    reset_raid_models: false,

    create_prebuilt_base_state: false,

    prebuilt_base_objects_set: [],

    allow_canvas_interaction_after_first_load: false,
  },
  reducers: {
    set_model_type_to_create: (state, action) => {
      return { ...state, model_type_to_create: action.payload };
    },
    set_model_creation_state: (state, action) => {
      return { ...state, model_creation_state: action.payload };
    },

    set_object_selected: (state, action) => {
      return { ...state, object_selected: action.payload };
    },
    set_selected_model_id: (state, action) => {
      return { ...state, selected_model_id: action.payload };
    },
    set_selected_object_list: (state, action) => {
      return { ...state, selected_object_list: action.payload };
    },

    set_models_xray_active: (state, action) => {
      return { ...state, models_xray_active: action.payload };
    },

    set_foundations_active: (state, action) => {
      return { ...state, foundations_active: action.payload };
    },
    set_walls_active: (state, action) => {
      return { ...state, walls_active: action.payload };
    },
    set_floors_active: (state, action) => {
      return { ...state, floors_active: action.payload };
    },
    set_stairs_active: (state, action) => {
      return { ...state, stairs_active: action.payload };
    },
    set_doors_active: (state, action) => {
      return { ...state, doors_active: action.payload };
    },
    set_frames_active: (state, action) => {
      return { ...state, frames_active: action.payload };
    },
    set_roofs_active: (state, action) => {
      return { ...state, roofs_active: action.payload };
    },
    set_miscs_active: (state, action) => {
      return { ...state, miscs_active: action.payload };
    },

    set_model_to_destroy: (state, action) => {
      return { ...state, model_to_destroy: action.payload };
    },

    set_model_upgrade_trigger: (state, action) => {
      return { ...state, model_upgrade_trigger: action.payload };
    },

    set_model_downgrade_trigger: (state, action) => {
      return { ...state, model_downgrade_trigger: action.payload };
    },

    set_model_tier_change: (state, action) => {
      return { ...state, model_tier_change: action.payload };
    },

    set_model_destroy_trigger: (state, action) => {
      return { ...state, model_destroy_trigger: action.payload };
    },
    set_reset_raid_models: (state, action) => {
      return { ...state, reset_raid_models: action.payload };
    },
    set_create_prebuilt_base_state: (state, action) => {
      return { ...state, create_prebuilt_base_state: action.payload };
    },

    set_prebuilt_base_objects_set: (state, action) => {
      return { ...state, prebuilt_base_objects_set: action.payload };
    },

    set_allow_canvas_interaction_after_first_load: (state, action) => {
      return { ...state, allow_canvas_interaction_after_first_load: action.payload };
    },
  },
});

const pageSettingsSlice = createSlice({
  name: "page settings",
  initialState: {
    enable_hints: true,
    enable_presets: true,
    enable_cameras: true,
    enable_structures_visibility: true,
    enable_resource_container: true,
    enable_model_transform_controls: true,

    performance_mode: false,
    performance_monitor_state: false,
    active_models_state: false,
    camera_fov: 90,

    enable_model_textures: true,
    bloom_state: true,
    better_lighting_state: true,
    ssao_state: true,
    antialiasing_state: false,

    audio: true,
  },
  reducers: {
    set_enable_hints: (state, action) => {
      return { ...state, enable_hints: action.payload };
    },
    set_enable_presets: (state, action) => {
      return { ...state, enable_presets: action.payload };
    },
    set_enable_cameras: (state, action) => {
      return { ...state, enable_cameras: action.payload };
    },
    set_enable_structures_visibility: (state, action) => {
      return { ...state, enable_structures_visibility: action.payload };
    },
    set_enable_resource_container: (state, action) => {
      return { ...state, enable_resource_container: action.payload };
    },
    set_enable_model_transform_controls: (state, action) => {
      return { ...state, enable_model_transform_controls: action.payload };
    },

    set_performance_mode: (state, action) => {
      return { ...state, performance_mode: action.payload };
    },
    set_performance_monitor_state: (state, action) => {
      return { ...state, performance_monitor_state: action.payload };
    },
    set_active_models_state: (state, action) => {
      return { ...state, active_models_state: action.payload };
    },
    set_camera_fov: (state, action) => {
      return { ...state, camera_fov: action.payload };
    },

    set_bloom_state: (state, action) => {
      return { ...state, bloom_state: action.payload };
    },
    set_better_lighting_state: (state, action) => {
      return { ...state, better_lighting_state: action.payload };
    },
    set_ssao_state: (state, action) => {
      return { ...state, ssao_state: action.payload };
    },
    set_antialiasing_state: (state, action) => {
      return { ...state, antialiasing_state: action.payload };
    },
    set_enable_model_textures: (state, action) => {
      return { ...state, enable_model_textures: action.payload };
    },

    set_audio: (state, action) => {
      return { ...state, audio: action.payload };
    },
  },
});

export const { set_page_mode } = pageModeSlice.actions;

export const { set_hardware_gpu, set_hardware_tier, set_hardware_is_mobile, set_hardware_monitor_resolution } =
  hardwareSlice.actions;

export const { set_canvas_models_array } = canvasModelsArraySlice.actions;

export const {
  set_camera_type,
  set_camera_2d_position,
  set_camera_2d_direction,
  set_camera_3d_reset,
  set_camera_3d_direction,
} = camerasSettingsSlice.actions;

export const {
  set_object_distance_multiplier,
  set_button_input,
  set_button_trigger,
  set_object_rotation_degree,
  set_delete_object_mode,
  set_delete_object_mouse_trigger,
} = controlsInputSlice.actions;
export const {
  set_model_type_to_create,
  set_model_creation_state,
  set_object_selected,
  set_selected_model_id,
  set_selected_object_list,
  set_models_xray_active,
  set_foundations_active,
  set_walls_active,
  set_floors_active,
  set_stairs_active,
  set_doors_active,
  set_frames_active,
  set_roofs_active,
  set_miscs_active,
  set_model_to_destroy,
  set_model_upgrade_trigger,
  set_model_downgrade_trigger,
  set_model_tier_change,
  set_model_destroy_trigger,
  set_reset_raid_models,
  set_create_prebuilt_base_state,
  set_prebuilt_base_objects_set,
  set_allow_canvas_interaction_after_first_load,
} = modelsDataSlice.actions;

export const {
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

  set_bloom_state,
  set_better_lighting_state,
  set_ssao_state,
  set_antialiasing_state,
  set_enable_model_textures,
  set_audio,
} = pageSettingsSlice.actions;

export const { set_cursor_type } = cursorTypeSlice.actions;

export const store = configureStore({
  reducer: {
    pageMode: pageModeSlice.reducer,
    hardware: hardwareSlice.reducer,
    canvasModelsArray: canvasModelsArraySlice.reducer,
    cursorType: cursorTypeSlice.reducer,
    camerasSettings: camerasSettingsSlice.reducer,
    controlsInput: controlsInputSlice.reducer,
    modelsData: modelsDataSlice.reducer,
    pageSettings: pageSettingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
