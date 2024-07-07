import { setupWorker, type SetupWorker } from "msw/browser";
import { RequestHandler } from "msw";

import { setupHandlers, db } from "services/mocker/msw";

declare global {
  namespace Cypress {
    // eslint-disable-next-line
    interface Chainable {
      interceptRequest(...handlers: RequestHandler[]): void;

      getMswDb(): Promise<typeof db>;
    }
  }
}

let worker: SetupWorker;

before(() => {
  worker = setupWorker(...setupHandlers(db));

  cy.wrap(
    worker.start({
      onUnhandledRequest: "bypass",
      // NOTE: causing CORS issue
      // serviceWorker: {
      //   url: `${Cypress.env("REACT_APP_PUBLIC_URL")}/mockServiceWorker.js`,
      // },
    }),
    { log: true }
  );
});

Cypress.on("test:before:run", () => {
  if (!worker) return;

  worker.resetHandlers();
});

Cypress.Commands.add("interceptRequest", (...handlers: RequestHandler[]) => {
  worker.use(...handlers);
});

Cypress.Commands.add("getMswDb", () => {
  return Promise.resolve(db);
});
