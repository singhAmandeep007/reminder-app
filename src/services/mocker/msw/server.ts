import { setupWorker } from "msw/browser";

import { db, buildScenarios } from "./controllers/db";

import { handlers } from "./handlers";

buildScenarios(db).withReminders(5).withReminderGroups({ remindersPerGroup: 2 });

const worker = setupWorker(...handlers);

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const runServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${PUBLIC_URL}mockServiceWorker.js`,
    },
  });
};
