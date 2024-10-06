import { setupWorker } from "msw/browser";

import { buildScenarios } from "./buildScenarios";

import { handlers } from "./handlers";

import { db } from "./db";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const startMswWorker = async () => {
  const worker = setupWorker(...handlers);

  return await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${PUBLIC_URL}mockServiceWorker.js`,
    },
  });
};

export const runServer = async (config?: { withDefaultScenario?: boolean }) => {
  if (config?.withDefaultScenario) {
    buildScenarios(db)
      .withReminders(5)
      .withReminderGroups({ reminderGroups: ["Work", "Home", "Personal"], remindersPerGroup: 2 })
      .withFocusSessions();
  }

  return await startMswWorker();
};
