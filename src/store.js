import { configureStore } from "@reduxjs/toolkit";
import weatherAPISliceReducer from "./weatherAPISlice";

export const store = configureStore({
  reducer: {
    weather: weatherAPISliceReducer,
  },
});
