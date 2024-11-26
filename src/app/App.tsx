import { FC } from "react";

import { Provider } from "react-redux";

import { setupStore } from "store";

import { ThemeProvider } from "modules/theme";

import { Toaster } from "components";

import { Router } from "./Router";

export type TAppProps = Record<string, never>;

export const App: FC<TAppProps> = () => {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};
