import { configureStore, createSlice } from "@reduxjs/toolkit";

const toolbarSlice = createSlice({
  name: "toolbar",
  initialState: {
    page_mode: "overview",
  },
  reducers: {
    set_page_mode: (state, action) => {
      state.page_mode = action.payload;
    },
  },
});

export const { set_page_mode } = toolbarSlice.actions;

export const store = configureStore({
  reducer: {
    PageMode: toolbarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
