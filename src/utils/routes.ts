import { TRoute, TRoutes } from "types";

/**
 * Retrieves an array of all route objects from the given routes object.
 *
 * @template T - The type of the routes object.
 * @param {T} routes - The routes object.
 * @returns - An array of all route objects.
 */
export const getRoutesList = <T extends TRoutes>(routes: T) => {
  return (Object.keys(routes) as Array<keyof T>).map((route) => routes[route]);
};

/**
 * Retrieves a specific property from each route object in the given routes object.
 *
 * @template T - The type of the routes object.
 * @template K - The type of the property to retrieve from each route object.
 * @param {T} routes - The routes object.
 * @param {K} key - The key of the property to retrieve.
 * @returns {Array<T[K]>} - An array of the specified property values from each route object.
 */
export const getRoutesPropByKeyList = <T extends TRoutes, K extends keyof TRoute>(routes: T, key: K) => {
  return (Object.keys(routes) as Array<keyof T>).map((route) => routes[route][key]);
};

/**
 *
 * @template T - The type of the routes object.
 * @param {T} routes - The routes object.
 * @returns {{ [k in keyof T]: T[k]["path"] }} - An object with route keys and their corresponding paths.
 */
export const getRoutesPathByName = <T extends TRoutes>(routes: T) =>
  Object.entries(routes).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: value.path,
      };
    },
    {} as {
      [k in keyof T]: T[k]["path"];
    }
  );
