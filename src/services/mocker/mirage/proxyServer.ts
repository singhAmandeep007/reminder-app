import { Response as MirageResponse, createServer, Request as MirageRequest } from "miragejs";

import { urlPrefix } from "utils";

import { TRunMirageServerConfig } from "./server";

export type TMirageRequest = Request & MirageRequest;

export type THandleProxyMirageServerRequest = (
  request: TMirageRequest
) => Promise<ReturnType<MirageResponse["toRackResponse"]>>;

declare global {
  // eslint-disable-next-line
  interface Window {
    handleProxyMirageServerRequest?: THandleProxyMirageServerRequest;
  }
}

export const startProxyMirageServer = function (config: Omit<TRunMirageServerConfig, "withDefaultScenario"> = {}) {
  const methods = ["get", "put", "patch", "post", "delete"];

  const server = createServer({
    logging: config.logging || true,
    trackRequests: config?.trackRequests || false,
    environment: config?.environment || "development",
    routes() {
      this.timing = config.timing || 0;

      for (const domain of [urlPrefix("/")]) {
        for (const method of methods) {
          // @ts-ignore
          this[method](`${domain}*`, async (_, request: TMirageRequest) => {
            // check if the window object has the handleProxyMirageServerRequest function before calling it
            if (window.handleProxyMirageServerRequest) {
              const [status, headers, body] = await window.handleProxyMirageServerRequest(request);

              return new MirageResponse(status, headers, body);
            }
          });
        }
      }

      this.passthrough();
    },
  });
  return server;
};
