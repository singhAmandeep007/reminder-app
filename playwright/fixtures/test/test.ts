import { test as base, expect } from "@playwright/test";

import { type HttpHandler } from "msw";

import { db } from "services/mocker/msw/db";
import { setupHandlers } from "services/mocker/msw/handlers";

import { handleRoute } from "./utils";

const handlers = setupHandlers({ db });

type TMocker = {
  start: () => Promise<void>;
  resetHandlers: () => Promise<void>;
  interceptRequest: (...customRequestHandlers: HttpHandler[]) => Promise<void>;
};

const test = base.extend<{ mocker: TMocker }>({
  mocker: [
    async ({ page }, use, testInfo) => {
      // this code runs before all the tests.
      // eslint-disable-next-line no-console
      console.log("before all the tests");

      const start = async () => {
        await page.route(`${process.env.REACT_APP_API_URL}**`, async (route, request) => {
          await handleRoute({ route, handlers });
        });
      };

      const resetHandlers = async () => {};

      const interceptRequest = async (...customRequestHandlers: HttpHandler[]) => {};

      await use({ start, resetHandlers, interceptRequest });
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
