import { generateRandomFocusSessions } from "../utils";

import { TScenariosBuilder } from "../types";

import { TDb } from "./db";

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
