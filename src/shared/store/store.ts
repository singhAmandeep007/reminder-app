import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./apiSlice";

import { remindersSlice } from "./reminders";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [remindersSlice.reducerPath]: remindersSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<ReturnType<typeof rootReducer>>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
    // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export type TStore = ReturnType<typeof setupStore>;
