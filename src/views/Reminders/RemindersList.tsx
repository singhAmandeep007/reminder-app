import { FC, PropsWithChildren } from "react";

import { RefreshCcw } from "lucide-react";

import { Button, Typography } from "components";

import { useGetRemindersQuery, useSelectReminderGroups, useSelectQueryParams } from "shared";

import { ReminderItem } from "./ReminderItem";

export type TRemindersListProps = Record<string, never>;

export const RemindersList: FC<PropsWithChildren<TRemindersListProps>> = () => {
  const queryParams = useSelectQueryParams();

  const { data: reminders, refetch } = useGetRemindersQuery(queryParams);

  const { data: reminderGroups } = useSelectReminderGroups();

  const reminderGroupName =
    reminderGroups && reminderGroups.find((reminderGroup) => reminderGroup.id === queryParams.groupId)?.name;

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2 flex items-center justify-between">
        <Typography
          variant={"h3"}
          className="text-md flex items-center justify-between font-bold leading-none"
          data-testid="active-list-title"
        >
          {reminderGroupName || "All"}
        </Typography>
        <div className="flex gap-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-primary"
            data-testid="refresh-reminder-list"
          >
            <RefreshCcw
              className="icon"
              onClick={refetch}
            />
          </Button>
        </div>
      </div>
      {reminders && (
        <div className="flex-1 overflow-scroll">
          <ul className="divide divide-y">
            {reminders.map((reminder) => {
              return (
                <li key={reminder.id}>
                  <ReminderItem reminder={reminder} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
