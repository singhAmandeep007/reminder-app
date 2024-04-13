import { FC, PropsWithChildren } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ErrorFallback } from "views/ErrorFallback";

import { NotFound } from "views/NotFound";

import { BaseLayout } from "views/Layout";

import { Home } from "views/Home";

import { HOME_ROUTE_BY_PATH, ROUTE_BY_PATH, BASENAME } from "./consts";

export type TRouterProps = Record<string, never>;

const router = createBrowserRouter(
  [
    {
      errorElement: <ErrorFallback />,
      element: <BaseLayout />,
      children: [
        {
          path: ROUTE_BY_PATH.home,
          index: true,
          element: <Home />,
        },
        {
          path: HOME_ROUTE_BY_PATH.reminders,
          lazy: async () => {
            const { Reminders } = await import("views/Reminders");
            return {
              Component: Reminders,
            };
          },
        },
        {
          path: ROUTE_BY_PATH.notFound,
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: BASENAME,
  }
);

export const Router: FC<PropsWithChildren<TRouterProps>> = () => <RouterProvider router={router} />;
