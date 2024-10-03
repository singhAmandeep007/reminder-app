import { FC, PropsWithChildren, useState } from "react";

import { RefreshCcw } from "lucide-react";

import { Button, Typography } from "components";

import { ReminderItem } from "../ReminderItem";
import { AddButton, AddUpdateItem } from "../components";

import { useRemindersList } from "./useRemindersList";
import { useRemindersNotification } from "./useRemindersNotification";

export type TRemindersListProps = Record<string, never>;

export const RemindersList: FC<PropsWithChildren<TRemindersListProps>> = () => {
  const { reminders, refetchReminders, reminderGroup, handleOnSave } = useRemindersList();

  useRemindersNotification({ reminders });

  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Typography
          variant={"h4"}
          className="flex items-center justify-between overflow-x-scroll text-nowrap py-2 "
          data-testid="reminder-list-title"
        >
          {reminderGroup?.name || "All"}
        </Typography>
        <div className="flex gap-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-primary"
            data-testid="reminder-refetch-btn"
          >
            <RefreshCcw
              className="icon"
              onClick={refetchReminders}
            />
          </Button>

          <AddButton
            size={"icon"}
            onClick={() => setIsCreating((isCreating) => !isCreating)}
            disabled={isCreating}
            data-testid="reminder-create-btn"
          />
        </div>
      </div>

      {reminders && (
        <div className="flex-1 overflow-scroll">
          <ul className="divide divide-y">
            {reminders
              ?.slice()
              .sort((a, b) => {
                return a.isPinned ? -1 : b.isPinned ? 1 : 0;
              })
              .map((reminder) => {
                return (
                  <li key={reminder.id}>
                    <ReminderItem
                      reminder={reminder}
                      listName={reminderGroup?.name}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      {isCreating && (
        <AddUpdateItem
          onCancel={() => setIsCreating(false)}
          onSave={(title) => {
            handleOnSave({ title: title, groupId: reminderGroup?.id });
            setIsCreating(false);
          }}
          testIds={{
            cancel: `reminder-item-create-cancel`,
            save: `reminder-item-create-save`,
            text: `reminder-item-create-text`,
          }}
        />
      )}
    </div>
  );
};
