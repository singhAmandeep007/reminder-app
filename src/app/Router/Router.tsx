import { FC, PropsWithChildren } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ErrorFallback } from "views/ErrorFallback";

import { NotFound } from "views/NotFound";

import { BaseLayout } from "views/Layout";

import { Home } from "views/Home";

import { Reminders } from "views/Reminders";

import { HOME_ROUTE_BY_PATH, ROUTE_BY_PATH } from "./consts";

export type TRouterProps = Record<string, never>;

const router = createBrowserRouter([
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
        element: <Reminders />,
      },
      {
        path: ROUTE_BY_PATH.notFound,
        element: <NotFound />,
      },
    ],
  },
]);

export const Router: FC<PropsWithChildren<TRouterProps>> = () => <RouterProvider router={router} />;
