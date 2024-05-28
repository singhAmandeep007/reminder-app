import { factory, oneOf, primaryKey } from "@mswjs/data";

import { uuid } from "shared";

import { REMINDER_STATE } from "types";

export const db = factory({
  reminder: {
    id: primaryKey(uuid),
    title: () => {
      return `Reminder ${uuid({ simple: true })}`;
    },

    isPinned: () => false,
    state: () => REMINDER_STATE.ACTIVE,
    group: oneOf("reminderGroup"),
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },

  reminderGroup: {
    id: primaryKey(uuid),
    name: () => `Reminder Group ${uuid({ simple: true })}`,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
});

export type TDb = typeof db;

export const buildScenarios = (db: TDb) => {
  const builder = {
    withReminders: (n: number = 10) => {
      for (let i = 0; i < n; i++) {
        db.reminder.create();
      }

      return builder;
    },
    withReminderGroups: ({
      reminderGroups = ["Work", "Home", "Personal"],
      remindersPerGroup = 10,
    }: {
      reminderGroups?: string[];
      remindersPerGroup?: number;
    }) => {
      reminderGroups.forEach((groupName) => {
        const group = db.reminderGroup.create({ name: groupName });

        for (let i = 0; i < remindersPerGroup; i++) {
          db.reminder.create({ group });
        }
      });

      return builder;
    },
  };
  return builder;
};
