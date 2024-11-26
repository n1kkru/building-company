import { combineReducers, configureStore } from "@reduxjs/toolkit";
import objectReducers from "./objectsSlice";
import reportsReducers from "./reportsSlice";
import userReducers from "./userSlice";

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
