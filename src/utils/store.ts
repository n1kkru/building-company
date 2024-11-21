import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import objectReducers from "./objectsSlice.ts";
import reportsReducers from "./reportsSlice.ts";
import userReducers from "./userSlice.ts";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

const rootReducer = combineReducers({
  reportsReducers: reportsReducers,
  objectReducers: objectReducers,
  userReducers: userReducers,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
