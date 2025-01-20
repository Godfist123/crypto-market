import { configureStore } from "@reduxjs/toolkit";

import PinReducer from "./slices/PinSlice";
export const store = configureStore({
  reducer: {
    pin: PinReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
