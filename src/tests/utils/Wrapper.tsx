import { FC, PropsWithChildren, ReactNode } from "react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { setupStore, TRootState } from "shared";
import { Toaster } from "components";

import { ThemeProvider } from "modules/theme";

import { initTestI18n } from "./initTestI18n";

type TProvider<T = any> = {
  Provider: FC<PropsWithChildren<T>>;
  props: Record<string, unknown>;
};

const addProviders = (providers: TProvider[] = [], component: ReactNode) => {
  if (!providers.length) {
    return component;
  }

  const [first, ...rest] = providers;

  const { Provider, props } = first;

  return <Provider {...props}>{addProviders(rest, component)}</Provider>;
};

export type TWrapperProps = {
  config?: {
    withI18n?: boolean;
    withStore?: boolean;
    preloadedState?: Partial<TRootState>;
  };
};

export const Wrapper: FC<PropsWithChildren<TWrapperProps>> = ({
  children,
  config = {
    withI18n: true,
    withStore: true,
  },
}) => {
  const providers: TProvider[] = [];

  if (config?.withI18n) {
    initTestI18n();
  }

  if (config?.withStore) {
    const store = setupStore(config?.preloadedState);
    providers.push({ Provider, props: { store } });
  }

  providers.push({ Provider: ThemeProvider, props: {} });
  providers.push({ Provider: MemoryRouter, props: {} });

  return (
    <>
      {addProviders(providers, children)}
      <Toaster />
    </>
  );
};
