import { configureStore, createSlice } from "@reduxjs/toolkit";

const StorageSlice = createSlice({
  name: "toolbar",
  initialState: {
    page_mode: "overview",
    transform_model_axis: null,
  },
  reducers: {
    set_page_mode: (state, action) => {
      state.page_mode = action.payload;
    },
    set_transform_model_axis: (state, action) => {
      state.transform_model_axis = action.payload;
    },
  },
});

export const { set_page_mode } = StorageSlice.actions;
export const { set_transform_model_axis } = StorageSlice.actions;

export const store = configureStore({
  reducer: {
    PageMode: StorageSlice.reducer,
    TransformAxis: StorageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
