import { test as base, expect, Route, Request } from "@playwright/test";

import { http, HttpResponse, type HttpHandler } from "msw";

import { handlers as defaultHandlers } from "services/mocker/msw/handlers";

import { handleRoute } from "./utils";

type TMocker = {
  start: () => Promise<void>;
  reset: () => Promise<void>;
  add: (...customRequestHandlers: HttpHandler[]) => Promise<void>;
  http: typeof http;
  HttpResponse: typeof HttpResponse;
};

const test = base.extend<{ mocker: TMocker }>({
  mocker: [
    async ({ page }, use, testInfo) => {
      // this code runs before all the tests.
      // eslint-disable-next-line no-console
      console.log("before all the tests");

      let isMockerStarted = false;

      type TRoutes = Record<
        string,
        {
          register: () => Promise<void>;
          unregister: () => Promise<void>;
        }
      >;
      type TRouteHandler = (route: Route, request: Request) => Promise<void>;

      let routes = {} as TRoutes;

      const handlersByPath = (handlers: HttpHandler[]) => {
        return handlers.reduce(
          (acc, handler) => {
            const path = handler.info.path;
            // NOTE: will mock only if path is of type string
            if (typeof path === "string") {
              if (!acc.hasOwnProperty(path)) {
                acc[path] = [handler];
              } else {
                acc[path] = [...acc[path], handler];
              }
            }
            return acc;
          },
          {} as Record<string, HttpHandler[]>
        );
      };

      const createRoutes = async (handlers: HttpHandler[]) => {
        const groupedHandlers = handlersByPath(handlers);

        // unregister all the existing routes if any before creating new ones
        if (Object.keys(routes).length > 0) {
          await Promise.all(
            Object.values(routes).map((route) => {
              return route.unregister();
            })
          );

          routes = {};
        }

        // create new routes
        routes = Object.keys(groupedHandlers).reduce((acc, path) => {
          const routeHandler: TRouteHandler = async (route, request) => {
            await handleRoute(route, groupedHandlers[path]);
          };

          acc[path] = {
            register: async () => {
              await page.route(path, routeHandler);
            },
            unregister: async () => {
              await page.unroute(path);
            },
          };
          return acc;
        }, {} as TRoutes);

        // register all the routes
        await Promise.all(
          Object.values(routes).map((route) => {
            return route.register();
          })
        );

        return routes;
      };

      const start = async () => {
        if (isMockerStarted) return;

        await createRoutes(defaultHandlers);

        isMockerStarted = true;
      };

      const reset = async () => {
        if (!isMockerStarted) return;

        await createRoutes(defaultHandlers);
      };

      const add = async (...handlers: HttpHandler[]) => {
        if (!isMockerStarted) return;

        await createRoutes([...handlers, ...defaultHandlers]);
      };

      await use({ start, reset, add, http, HttpResponse });

      // this code runs after all the tests.
      // eslint-disable-next-line no-console
      console.log("after all the tests");
    },
    {
      /**
       * scope this fixture on a per test basis to ensure that each test has a
       * fresh copy of mocker. Note: the scope MUST be "test" to be able to use the
       * `page` fixture as it is not possible to access it when scoped to the
       * "worker".
       */
      scope: "test",
      /**
       * auto-initialised fixture even if the test doesn't use it.
       */
      auto: true,
    },
  ],
});

export { test, expect };
