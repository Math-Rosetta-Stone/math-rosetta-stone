// store.js
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Create a slice of state
const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    setData: (state, action) => action.payload,
  },
});

export const { setData } = dataSlice.actions;

// Configure the store
export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});
