import { setupWorker } from "msw/browser";

import { generateRandomFocusSessions } from "../utils";

import { TScenariosBuilder } from "../types";

import { db, TDb } from "./db";

import { setupHandlers } from "./handlers";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const handlers = setupHandlers({ db });

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

export const buildScenarios = (db: TDb) => {
  const builder: TScenariosBuilder = {
    withReminders: (n = 10) => {
      for (let i = 0; i < n; i++) {
        db.reminder.create();
      }

      return builder;
    },
    withReminderGroups: ({ reminderGroups = ["Work", "Home", "Personal"], remindersPerGroup = 10 }) => {
      reminderGroups.forEach((groupName) => {
        const group = db.reminderGroup.create({ name: groupName });

        for (let i = 0; i < remindersPerGroup; i++) {
          db.reminder.create({ group });
        }
      });

      return builder;
    },

    withFocusSessions: () => {
      db.reminder.getAll().forEach((reminder) => {
        const n = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

        const focusSessions = generateRandomFocusSessions(n) as never[];

        db.reminder.update({
          where: {
            id: {
              equals: reminder.id,
            },
          },
          data: {
            ...reminder,
            focusSessions,
          },
        });
      });

      return builder;
    },
  };
  return builder;
};
