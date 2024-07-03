import { setupWorker } from "msw/browser";

import { db, buildScenarios } from "./db";

import { setupHandlers } from "./handlers";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const runServer = () => {
  // NOTE: seed data
  buildScenarios(db).withReminders(5).withReminderGroups({ remindersPerGroup: 2 });

  const handlers = setupHandlers(db);

  const worker = setupWorker(...handlers);

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${PUBLIC_URL}mockServiceWorker.js`,
    },
  });
};
