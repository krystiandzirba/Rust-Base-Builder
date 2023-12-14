import { configureStore, createSlice } from "@reduxjs/toolkit";

const pageModeSlice = createSlice({
  name: "pageMode",
  initialState: {
    page_mode: "overview",
  },
  reducers: {
    set_page_mode: (state, action) => {
      return { ...state, page_mode: action.payload };
    },
  },
});

const transformAxisSlice = createSlice({
  name: "transformAxis",
  initialState: {
    transform_model_axis: null,
  },
  reducers: {
    set_transform_model_axis: (state, action) => {
      return { ...state, transform_model_axis: action.payload };
    },
  },
});

const cameraTypeSlice = createSlice({
  name: "cameraType",
  initialState: {
    camera_type: "3D_PerspectiveCamera",
  },
  reducers: {
    set_camera_type: (state, action) => {
      return { ...state, camera_type: action.payload };
    },
  },
});

const ortographicCameraPositionSlice = createSlice({
  name: "ortographicCameraPosition",
  initialState: {
    ortographic_camera_position: [0, 0, 45],
  },
  reducers: {
    set_ortographic_camera_position: (state, action) => {
      return { ...state, ortographic_camera_position: action.payload };
    },
  },
});

const ortographicCameraDirectionSlice = createSlice({
  name: "ortographicCameraDirection",
  initialState: {
    ortographic_camera_direction: "",
  },
  reducers: {
    set_ortographic_camera_direction: (state, action) => {
      return { ...state, ortographic_camera_direction: action.payload };
    },
  },
});

const perspectiveCameraResetSlice = createSlice({
  name: "perspectiveCameraReset",
  initialState: {
    perspective_camera_reset: false,
  },
  reducers: {
    set_perspective_camera_reset: (state, action) => {
      return { ...state, perspective_camera_reset: action.payload };
    },
  },
});

const cursorTypeSlice = createSlice({
  name: "cursorType",
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
  name: "canvasModelsArray",
  initialState: {
    canvas_models_array: [],
  },
  reducers: {
    set_canvas_models_array: (state, action) => {
      return { ...state, canvas_models_array: action.payload };
    },
  },
});

export const { set_page_mode } = pageModeSlice.actions;
export const { set_transform_model_axis } = transformAxisSlice.actions;
export const { set_camera_type } = cameraTypeSlice.actions;
export const { set_ortographic_camera_position } = ortographicCameraPositionSlice.actions;
export const { set_ortographic_camera_direction } = ortographicCameraDirectionSlice.actions;
export const { set_perspective_camera_reset } = perspectiveCameraResetSlice.actions;
export const { set_cursor_type } = cursorTypeSlice.actions;
export const { set_canvas_models_array } = canvasModelsArraySlice.actions;

export const store = configureStore({
  reducer: {
    pageMode: pageModeSlice.reducer,
    transformAxis: transformAxisSlice.reducer,
    cameraType: cameraTypeSlice.reducer,
    ortographicCameraPosition: ortographicCameraPositionSlice.reducer,
    ortographicCameraDirection: ortographicCameraDirectionSlice.reducer,
    perspectiveCameraReset: perspectiveCameraResetSlice.reducer,
    cursorType: cursorTypeSlice.reducer,
    canvasModelsArray: canvasModelsArraySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
