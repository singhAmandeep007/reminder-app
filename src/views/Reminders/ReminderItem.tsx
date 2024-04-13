import { FC, PropsWithChildren } from "react";

import { TReminder } from "types";

import { DeleteButton } from "./components";

export type TReminderItemProps = {
  reminder: TReminder;
};

export const ReminderItem: FC<PropsWithChildren<TReminderItemProps>> = ({ reminder }) => {
  return (
    <div
      className="flex flex-1 items-center justify-between gap-2 py-2"
      data-testid={`reminder-item-${reminder.id}`}
    >
      <div>{reminder.title}</div>
      <DeleteButton data-testid={`delete-reminder-item-${reminder.id}`} />
    </div>
  );
};
