import { FC, PropsWithChildren } from "react";

import { Provider } from "react-redux";

import { store } from "shared";

import { ThemeProvider } from "modules/theme";

import { Router } from "./Router";

export type TAppProps = Record<string, never>;

export const App: FC<PropsWithChildren<TAppProps>> = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};
