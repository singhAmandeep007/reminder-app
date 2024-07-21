import { TNonEmptyArray } from "types";

export type TScenariosBuilder = {
  withReminders: (n: number) => any;
  withReminderGroups: (options: { reminderGroups: TNonEmptyArray<string>; remindersPerGroup: number }) => any;
  withFocusSessions?: () => any;
};
