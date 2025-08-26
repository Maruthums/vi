import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../redux/dashboard";
export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
});

// Types
export const dispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
