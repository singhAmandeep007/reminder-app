import { useMemo } from "react";

import { TReminder } from "types";

import { useBrowserNotification, TBrowserNotification } from "hooks";

export const useRemindersNotification = ({ reminders = [] }: { reminders?: TReminder[] }) => {
  const notifications = useMemo(() => {
    return (
      (reminders || []).filter((reminders) => reminders.dueDate) as (TReminder & {
        dueDate: NonNullable<TReminder["dueDate"]>;
      })[]
    ).map((reminder) => {
      return {
        id: reminder.id,
        title: "🔔",
        dueDate: new Date(reminder.dueDate),
        repeatInterval: reminder.repeatInterval,
        repeatTimes: reminder.repeatTimes,
        options: {
          body: `${reminder.title}`,
        },
      } as TBrowserNotification;
    });
  }, [reminders]);

  useBrowserNotification({ notifications });
};
