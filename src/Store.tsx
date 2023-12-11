import { configureStore, createSlice } from "@reduxjs/toolkit";

const pageModeSlice = createSlice({
  name: "pageMode",
  initialState: {
    page_mode: "overview",
  },
  reducers: {
    set_page_mode: (state, action) => {
      state.page_mode = action.payload;
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
      state.transform_model_axis = action.payload;
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
      state.camera_type = action.payload;
    },
  },
});

export const { set_page_mode } = pageModeSlice.actions;
export const { set_transform_model_axis } = transformAxisSlice.actions;
export const { set_camera_type } = cameraTypeSlice.actions;

export const store = configureStore({
  reducer: {
    pageMode: pageModeSlice.reducer,
    transformAxis: transformAxisSlice.reducer,
    cameraType: cameraTypeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
