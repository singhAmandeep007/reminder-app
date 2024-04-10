import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "./reducer";

export type TStore = typeof store;

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});
