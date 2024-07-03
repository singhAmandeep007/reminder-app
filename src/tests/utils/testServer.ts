import { setupServer } from "msw/node";

import { beforeAll, afterEach, afterAll } from "@jest/globals";

import { setupHandlers, db, dropDb } from "services/mocker/msw";

export const testServer = setupServer(...setupHandlers(db));

beforeAll(() =>
  testServer.listen({
    onUnhandledRequest(request) {
      // eslint-disable-next-line no-console
      console.log("Unhandled %s %s", request.method, request.url);
    },
  })
);

afterEach(() => {
  testServer.resetHandlers();
  dropDb(db);
});

afterAll(() => {
  testServer.close();
});

// NOTE: simple outgoing request listener logger
testServer.events.on("request:start", ({ request }) => {
  // eslint-disable-next-line no-console
  console.log("MSW intercepted:", request.method, request.url);
});

export { HttpResponse, http } from "msw";
