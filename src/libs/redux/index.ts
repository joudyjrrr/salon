import { configureStore } from "@reduxjs/toolkit";
import PermissionSlice from "./themSlice";
import themSlice from "./themSlice";

const store = configureStore({
  reducer: {
    them: themSlice.reducer,
  },
});

export const UIActions = themSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
