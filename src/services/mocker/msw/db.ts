import { factory, nullable, oneOf, primaryKey, drop } from "@mswjs/data";

import { uuid } from "shared";

import { REMINDER_STATE } from "types";

export const db = factory({
  reminder: {
    id: primaryKey(uuid),
    title: () => {
      return `Reminder ${uuid({ simple: true })}`;
    },

    isPinned: () => false,
    state: () => REMINDER_STATE.INACTIVE,
    group: nullable(oneOf("reminderGroup")),
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
    dueDate: nullable<string>(() => null),
  },

  reminderGroup: {
    id: primaryKey(uuid),
    name: () => `Reminder Group ${uuid({ simple: true })}`,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
});

export type TDb = typeof db;

export const dropDb = (db: TDb) => {
  drop(db);
};
