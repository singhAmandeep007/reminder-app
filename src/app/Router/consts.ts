import { getRoutesList, getRoutesPathByName, getRoutesPropByKeyList } from "utils";

import { TRoutes } from "types";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const BASENAME = new URL(PUBLIC_URL).pathname;

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

/**
 * An array of all root route paths.
 */
export const ROUTE_PATHS = getRoutesPropByKeyList(ROUTES, "path");

/**
 * An array of all root route objects.
 */
export const ROUTE_LIST = getRoutesList(ROUTES);

/**
 * An object with all root route keys with value as their corresponding paths.
 */
export const ROUTE_BY_PATH = getRoutesPathByName(ROUTES);

/**
 * An object with all home route's keys with value as their corresponding paths.
 */
export const HOME_ROUTE_BY_PATH = getRoutesPathByName(ROUTES.home.childRoutes);

/**
 * An array of all home route objects.
 */
export const HOME_ROUTE_LIST = getRoutesList(ROUTES.home.childRoutes);
