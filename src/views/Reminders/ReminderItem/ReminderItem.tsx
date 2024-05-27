import { FC, PropsWithChildren, useCallback, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";

import { TReminder } from "types";
import { Typography, DropdownMenu, Button } from "components";

import { handleAsync, useDeleteReminderMutation } from "shared";

import { IconButton } from "../components";

import { useCreateUpdateItem } from "../useCreateUpdateItem";

export type TReminderItemProps = {
  reminder: TReminder;
};

export const ReminderItem: FC<PropsWithChildren<TReminderItemProps>> = ({ reminder }) => {
  const [deleteReminder, deleteReminderResult] = useDeleteReminderMutation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { ItemComponent, result: updateReminderResult } = useCreateUpdateItem({
    type: "reminder",
    mode: "update",
    id: reminder.id,
    onCancel: () => setIsEditing(false),
    onSave: () => setIsEditing(false),
    value: reminder.title,
  });

  const handleOnDelete = useCallback(
    async (id: Parameters<typeof deleteReminder>[0]) => {
      await handleAsync(() => deleteReminder(id));
    },
    [deleteReminder]
  );

  const isMenuDisabled = deleteReminderResult.isLoading || updateReminderResult.isLoading;

  return (
    <div
      className="flex items-center justify-between gap-2 py-2"
      data-testid={`reminder-item-${reminder.id}`}
    >
      {isEditing ? (
        <ItemComponent className="flex-1" />
      ) : (
        <Typography
          variant={"p"}
          className="overflow-x-scroll text-nowrap py-2"
        >
          {reminder.title}
        </Typography>
      )}

      {!isEditing && (
        <DropdownMenu
          data={[
            {
              id: "edit",
              component: () => (
                <IconButton
                  data-testid={`reminder-item-edit-${reminder.id}`}
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="icon" />
                </IconButton>
              ),
            },
            {
              id: "delete",
              component: () => (
                <IconButton
                  data-testid={`reminder-item-delete-${reminder.id}`}
                  onClick={() => handleOnDelete(reminder.id)}
                  className="hover:text-destructive"
                >
                  <Trash className="icon" />
                </IconButton>
              ),
            },
          ]}
          triggerer={(props) => (
            <Button
              variant="secondary"
              size="icon"
              data-testid={`reminder-item-menu-${reminder.id}`}
              disabled={isMenuDisabled}
              {...props}
            >
              {isDropdownOpen ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
            </Button>
          )}
          isOpen={isDropdownOpen}
          onToggle={setIsDropdownOpen}
          itemRenderer={(item) => item.component()}
          position="bottom-right"
        />
      )}
    </div>
  );
};
