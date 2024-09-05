import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/admin";
import authReducer from "./slices/authSlice";
import generalReducer from "./slices/generalSlice";
import userSlice  from "./slices/userManagment"

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      general: generalReducer,
      admin: adminReducer,
      alluser: userSlice
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;