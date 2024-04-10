export type TRoute = {
  path: string;
  childRoutes?: TRoutes<TRoute>;
} & Record<string, any>;

export type TRoutes<T extends TRoute = TRoute> = Record<string, T>;
