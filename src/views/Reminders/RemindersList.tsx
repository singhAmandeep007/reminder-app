import { FC, PropsWithChildren } from "react";

import { RefreshCcw } from "lucide-react";

import { Button, Typography } from "components";

import { useGetRemindersQuery, useSelectQueryParams, useGetReminderGroupQuery } from "shared";

import { ReminderItem } from "./ReminderItem";
import { AddButton } from "./components";

export type TRemindersListProps = Record<string, never>;

export const RemindersList: FC<PropsWithChildren<TRemindersListProps>> = () => {
  const queryParams = useSelectQueryParams();

  const { currentData: reminders, refetch } = useGetRemindersQuery(queryParams);

  const { currentData: reminderGroup } = useGetReminderGroupQuery(queryParams.groupId as string, {
    skip: !queryParams.groupId,
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Typography
          variant={"h4"}
          className="flex items-center justify-between overflow-x-scroll text-nowrap py-2 "
          data-testid="active-list-title"
        >
          {reminderGroup?.name || "All"}
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

          <AddButton size={"icon"} />
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
