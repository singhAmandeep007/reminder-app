import { factory, nullable, oneOf, primaryKey, drop } from "@mswjs/data";
import { NullableProperty } from "@mswjs/data/lib/nullable";

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
    focusSessions: () => [],
    // FIX: nullable(Object) returning {} instead of null
    currentFocusSession: nullable<any>(
      {
        startTime: () => String,
        endTime: () => String,
      },
      { defaultsToNull: true }
    ) as unknown as NullableProperty<any>,
    dueDate: nullable<string>(() => null),
    repeatInterval: nullable<number>(() => null),
    repeatTimes: nullable<number>(() => null),
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
