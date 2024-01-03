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

const modelPivotAxisSlice = createSlice({
  name: "transform axis",
  initialState: {
    model_pivot_axis: null,
  },
  reducers: {
    set_model_pivot_axis: (state, action) => {
      return { ...state, model_pivot_axis: action.payload };
    },
  },
});

const cameraTypeSlice = createSlice({
  name: "camera type",
  initialState: {
    camera_type: "camera_3d",
  },
  reducers: {
    set_camera_type: (state, action) => {
      return { ...state, camera_type: action.payload };
    },
  },
});

const camera2DSlice = createSlice({
  name: "2d camera",
  initialState: {
    camera_2d_direction: "",
    camera_2d_position: [0, 0, 45],
  },
  reducers: {
    set_camera_2d_direction: (state, action) => {
      return { ...state, camera_2d_direction: action.payload };
    },
    set_camera_2d_position: (state, action) => {
      return { ...state, camera_2d_position: action.payload };
    },
  },
});

const camera3DResetSlice = createSlice({
  name: "3d camera reset",
  initialState: {
    camera_3d_reset: false,
    camera_3d_direction: "north",
  },
  reducers: {
    set_camera_3d_reset: (state, action) => {
      return { ...state, camera_3d_reset: action.payload };
    },
    set_camera_3d_direction: (state, action) => {
      return { ...state, camera_3d_direction: action.payload };
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

const objectListModelCreatorSlice = createSlice({
  name: "object list models creator",
  initialState: {
    model_type_to_create: "",
    model_creation_state: false,
  },
  reducers: {
    set_model_type_to_create: (state, action) => {
      return { ...state, model_type_to_create: action.payload };
    },
    set_model_creation_state: (state, action) => {
      return { ...state, model_creation_state: action.payload };
    },
  },
});

const controlsInputSlice = createSlice({
  name: "keyboard input",
  initialState: {
    keyboard_input: "",
    object_distance_multiplier: 1,
    key_press_trigger: 0,

    button_input: "",
    button_trigger: 0,
    object_rotation_degree: 90,

    delete_object_mode: "none",
    delete_object_trigger: 0,
  },
  reducers: {
    set_keyboard_input: (state, action) => {
      return { ...state, keyboard_input: action.payload };
    },
    set_object_distance_multiplier: (state, action) => {
      return { ...state, object_distance_multiplier: action.payload };
    },
    set_key_press_trigger: (state, action) => {
      return { ...state, key_press_trigger: action.payload };
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
    set_delete_object_trigger: (state, action) => {
      return { ...state, delete_object_trigger: action.payload };
    },
  },
});

const modelsDataSlice = createSlice({
  name: "models data",
  initialState: {
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
  },
  reducers: {
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
  },
});

export const { set_page_mode } = pageModeSlice.actions;
export const { set_model_pivot_axis } = modelPivotAxisSlice.actions;
export const { set_camera_type } = cameraTypeSlice.actions;

export const { set_camera_2d_position, set_camera_2d_direction } = camera2DSlice.actions;

export const { set_camera_3d_reset, set_camera_3d_direction } = camera3DResetSlice.actions;
export const { set_cursor_type } = cursorTypeSlice.actions;
export const { set_canvas_models_array } = canvasModelsArraySlice.actions;
export const { set_model_type_to_create, set_model_creation_state } = objectListModelCreatorSlice.actions;
export const {
  set_keyboard_input,
  set_object_distance_multiplier,
  set_key_press_trigger,
  set_button_input,
  set_button_trigger,
  set_object_rotation_degree,
  set_delete_object_mode,
  set_delete_object_trigger,
} = controlsInputSlice.actions;
export const {
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
} = modelsDataSlice.actions;

export const {
  set_enable_hints,
  set_enable_presets,
  set_enable_cameras,
  set_enable_structures_visibility,
  set_enable_resource_container,
  set_enable_model_transform_controls,
} = pageSettingsSlice.actions;

export const store = configureStore({
  reducer: {
    pageMode: pageModeSlice.reducer,
    modelPivotAxis: modelPivotAxisSlice.reducer,
    cameraType: cameraTypeSlice.reducer,
    camera2D: camera2DSlice.reducer,
    camera3D: camera3DResetSlice.reducer,
    cursorType: cursorTypeSlice.reducer,
    canvasModelsArray: canvasModelsArraySlice.reducer,
    modelTypeToCreate: objectListModelCreatorSlice.reducer,
    controlsInput: controlsInputSlice.reducer,
    modelsData: modelsDataSlice.reducer,
    pageSettings: pageSettingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
