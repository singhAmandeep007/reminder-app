import { setupServer } from "msw/node";

import { beforeAll, afterEach, afterAll } from "@jest/globals";

import { handlers } from "services/mocker/msw/handlers";

const runTestServer = () => {
  return setupServer(...handlers);
};

export const testServer = runTestServer();

beforeAll(() => testServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());
// NOTE: simple outgoing request listener logger
testServer.events.on("request:start", ({ request }) => {
  // eslint-disable-next-line no-console
  console.log("MSW intercepted:", request.method, request.url);
});

export { db, buildScenarios, urlPrefix } from "services/mocker/msw";

export { HttpResponse, http } from "msw";
