import { TAppMockServer } from "../types";

import { generateRandomFocusSessions } from "../../utils";

import { TScenariosBuilder } from "../../types";

export function buildScenarios(server: TAppMockServer) {
  const builder: TScenariosBuilder = {
    // create reminders without any group
    withReminders: (n = 10) => {
      server.createList("reminder", n);
      return builder;
    },
    // create reminders with groups
    withReminderGroups: ({ reminderGroups = ["Work", "Home", "Personal"], remindersPerGroup = 10 }) => {
      reminderGroups.forEach((groupName) => {
        const group = server.create("reminderGroup", { name: groupName });
        server.createList("reminder", remindersPerGroup, { group });
      });

      return builder;
    },

    withFocusSessions: () => {
      server.db.reminders.forEach((reminder) => {
        const n = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

        const focusSessions = generateRandomFocusSessions(n) as never[];

        server.db.reminders.update(reminder.id, {
          focusSessions,
        });
      });

      return builder;
    },
  };
  return builder;
}
