import { TNonEmptyArray } from "types";

import { TAppMockServer } from "../types";

export function buildScenarios(server: TAppMockServer) {
  const builder = {
    // create reminders without any group
    withReminders: (n: number = 10) => {
      server.createList("reminder", n);
      return builder;
    },
    // create reminders with groups
    withReminderGroups: ({
      reminderGroups = ["Work", "Home", "Personal"],
      remindersPerGroup = 10,
    }: {
      reminderGroups?: TNonEmptyArray<string>;
      remindersPerGroup?: number;
    }) => {
      reminderGroups.forEach((groupName) => {
        const group = server.create("reminderGroup", { name: groupName });
        server.createList("reminder", remindersPerGroup, { group });
      });

      return builder;
    },
  };
  return builder;
}
