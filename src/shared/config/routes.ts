import { TRoutes } from "types";

export const ROUTES = {
  home: {
    path: "/",
    childRoutes: {
      reminders: {
        path: "/reminders",
      },
    },
  },
  notFound: {
    path: "*",
  },
} as const satisfies TRoutes;
