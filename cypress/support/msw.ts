import { setupWorker, type SetupWorker } from "msw/browser";
import { RequestHandler } from "msw";

import { setupHandlers, db } from "services/mocker/msw";
import { MOCKER_TYPE } from "services/mocker";

declare global {
  namespace Cypress {
    // eslint-disable-next-line
    interface Chainable {
      interceptMswRequest(...handlers: RequestHandler[]): void;

      getMswDb(): Promise<typeof db>;
    }
  }
}

let mswWorker: SetupWorker;

before(() => {
  if (Cypress.env("REACT_APP_MOCKER") === MOCKER_TYPE.msw) {
    mswWorker = setupWorker(...setupHandlers({ db }));

    cy.wrap(
      mswWorker.start({
        onUnhandledRequest: "bypass",
        // NOTE: causing CORS issue
        // serviceWorker: {
        //   url: `${Cypress.env("REACT_APP_PUBLIC_URL")}/mockServiceWorker.js`,
        // },
      }),
      { log: true }
    );
  }
});

Cypress.on("test:before:run", () => {
  if (mswWorker) {
    mswWorker.resetHandlers();
  }
});

Cypress.Commands.add("interceptMswRequest", (...handlers: RequestHandler[]) => {
  if (!mswWorker) throw new Error("MSW worker is not initialized");
  mswWorker.use(...handlers);
});

Cypress.Commands.add("getMswDb", () => {
  if (!mswWorker) throw new Error("MSW worker is not initialized");
  return Promise.resolve(db);
});
