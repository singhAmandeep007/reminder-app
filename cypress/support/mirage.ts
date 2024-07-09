import { createRoutes, TServer } from "services/mocker/mirage";
import { THandleProxyMirageServerRequest } from "services/mocker/mirage/proxyServer";

type TCypressWindow = Window & {
  handleProxyMirageServerRequest: THandleProxyMirageServerRequest;
};

declare global {
  namespace Cypress {
    // eslint-disable-next-line
    interface Chainable {
      setupMirageApiProxy(): void;

      resetMirageApiHandlers(server: TServer): void;
    }
  }
}

Cypress.Commands.add("setupMirageApiProxy", () => {
  Cypress.on("window:before:load", (window: TCypressWindow) => {
    // NOTE: defines a `handleProxyMirageServerRequest` function on your application's window object
    window.handleProxyMirageServerRequest = function (request) {
      return fetch(request.url, {
        method: request.method,
        headers: request.requestHeaders,
        body: request.requestBody,
      }).then(async (res) => {
        let body: any;

        if (res.headers.get("content-type")?.includes("application/json")) {
          body = await res.json();
        } else {
          body = await res.text();
        }

        // FIX: plain strings as json type
        if (typeof body === "string") {
          body = `"${body}"`;
        }

        const { status, headers } = res;

        return new Promise((resolve) => {
          resolve([status, headers as unknown as Record<string, string>, body]);
        });
      });
    };
  });
});

Cypress.Commands.add("resetMirageApiHandlers", (server) => {
  createRoutes.call(server);
});
