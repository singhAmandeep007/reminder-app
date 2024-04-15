import { createServer } from "miragejs";

import { createRoutes } from "./routes";
import * as models from "./models";
import * as factories from "./factories";
import { buildScenarios } from "./scenarios";

import { TAppMockServer } from "./types";

export type TRunMirageServerConfig = {
  environment?: string;
  logging?: boolean;
  timing?: number;
};

export function runServer(config: TRunMirageServerConfig = {}): TAppMockServer {
  return createServer({
    logging: config.logging || true,
    environment: config?.environment || "development",
    models,
    factories,
    // mirage's seeds are loaded on initialization
    seeds(server) {
      buildScenarios(server).withReminders(5).withReminderGroups(3);
    },

    routes() {
      this.timing = config.timing || 100;

      createRoutes.call(this);

      this.passthrough();
    },
  });
}
