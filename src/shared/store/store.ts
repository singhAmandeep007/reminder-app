import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./apiSlice";

import { remindersSlice } from "./reminders";

export type TStore = typeof store;

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [remindersSlice.reducerPath]: remindersSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
