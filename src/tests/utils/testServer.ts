import { setupServer } from "msw/node";

import { beforeAll, afterEach, afterAll } from "@jest/globals";

import { runServer, createRoutes } from "services/mocker/mirage";

import { setupHandlers, db, dropDb } from "services/mocker/msw";

export const createTestMswServer = (logging: boolean = false) => {
  const testMswServer = setupServer(...setupHandlers({ db }));

  beforeAll(() => {
    testMswServer.listen({
      onUnhandledRequest(request) {
        // eslint-disable-next-line no-console
        console.log("Unhandled %s %s", request.method, request.url);
      },
    });
  });

  afterEach(() => {
    testMswServer.resetHandlers();
    dropDb(db);
  });

  afterAll(() => {
    testMswServer.close();
  });

  if (logging) {
    // NOTE: simple outgoing request listener logger
    testMswServer.events.on("request:start", ({ request }) => {
      // eslint-disable-next-line no-console
      console.log("MSW intercepted:", request.method, request.url);
    });
  }

  return testMswServer;
};

export const createTestMirageServer = () => {
  const testMirageServer = runServer({
    environment: "test",
    trackRequests: true,
    logging: false,
  });

  afterEach(() => {
    createRoutes.call(testMirageServer);
    testMirageServer.db.emptyData();
  });

  afterAll(() => {
    testMirageServer.shutdown();
  });

  return testMirageServer;
};

export { HttpResponse, http } from "msw";

// NOTE: Alternative
// let testMirageServer: TAppMockServer;

// beforeEach(() => {
//   testMirageServer = runServer({
//     environment: "test",
//   });
// });

// afterEach(() => {
//   testMirageServer.shutdown();
// });
