import { FC, PropsWithChildren } from "react";

import { TReminder } from "types";
import { Typography } from "components";

import { useDeleteReminderMutation } from "shared";

import { DeleteButton } from "./components";

export type TReminderItemProps = {
  reminder: TReminder;
};

export const ReminderItem: FC<PropsWithChildren<TReminderItemProps>> = ({ reminder }) => {
  const [deleteReminder] = useDeleteReminderMutation();

  return (
    <div
      className="flex items-center justify-between gap-2 py-2"
      data-testid={`reminder-item-${reminder.id}`}
    >
      <Typography
        variant={"p"}
        className="overflow-x-scroll text-nowrap py-2"
      >
        {reminder.title}
      </Typography>
      <DeleteButton
        data-testid={`delete-reminder-item-${reminder.id}`}
        onClick={() => deleteReminder(reminder.id)}
      />
    </div>
  );
};
