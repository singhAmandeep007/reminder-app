import { createServer } from "miragejs";

import { createRoutes } from "./routes";
import * as models from "./models";
import * as factories from "./factories";

import { TAppMockServer } from "./types";
import { IdentityManager } from "./identityManager";
import { buildScenarios } from "./scenarios";

export type TRunMirageServerConfig = {
  environment?: string;
  logging?: boolean;
  timing?: number;
  trackRequests?: boolean;
  withDefaultScenario?: boolean;
};

export function runServer(config: TRunMirageServerConfig = {}): TAppMockServer {
  const server = createServer({
    logging: config.logging || true,
    trackRequests: config?.trackRequests || false,
    environment: config?.environment || "development",
    models,
    factories,
    identityManagers: {
      application: IdentityManager,
    },
    // mirage's seeds are loaded on initialization
    seeds(server) {
      if (config?.withDefaultScenario) {
        buildScenarios(server).withReminders(5).withReminderGroups({ remindersPerGroup: 2 });
      }
    },

    routes() {
      this.timing = config.timing || 100;

      createRoutes.call(this);

      this.passthrough();
    },
  });

  return server;
}

export type TServer = ReturnType<typeof runServer>;
