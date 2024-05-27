import { FC, PropsWithChildren, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";

import { TReminder, REMINDER_STATE } from "types";

import {
  Button,
  Checkbox,
  Typography,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "components";

import { cn } from "shared";

import { AddUpdateItem } from "../components";

import { useReminderItem } from "./useReminderItem";

export type TReminderItemProps = {
  reminder: TReminder;
};

export const ReminderItem: FC<PropsWithChildren<TReminderItemProps>> = ({ reminder }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { handleOnDelete, handleOnUpdate, isLoading } = useReminderItem({
    reminder,
  });

  const isMenuDisabled = isLoading;

  return (
    <div
      className="flex items-center justify-between gap-2  py-2"
      data-testid={`reminder-item-${reminder.id}`}
    >
      {isUpdating ? (
        <AddUpdateItem
          className="flex-1"
          defaultValue={reminder.title}
          onCancel={() => setIsUpdating(false)}
          onSave={(title) => {
            handleOnUpdate({ id: reminder.id, title });
            setIsUpdating(false);
          }}
          testIds={{
            cancel: `reminder-item-update-cancel-${reminder.id}`,
            save: `reminder-item-update-save-${reminder.id}`,
          }}
        />
      ) : (
        <>
          <Checkbox
            checked={reminder.state === REMINDER_STATE.COMPLETED}
            className="peer"
          />
          <Typography
            variant={"p"}
            affects={"withoutPMargin"}
            className={cn("flex-1 overflow-x-scroll text-nowrap py-2 peer-aria-[checked=true]:line-through")}
          >
            {reminder.title}
          </Typography>
        </>
      )}

      {!isUpdating && (
        <DropdownMenu
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              data-testid={`reminder-item-menu-${reminder.id}`}
              disabled={isMenuDisabled}
            >
              {isDropdownOpen ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-min"
            align="end"
            onInteractOutside={() => setIsDropdownOpen(false)}
          >
            <DropdownMenuItem
              data-testid={`reminder-item-edit-${reminder.id}`}
              onClick={() => setIsUpdating(true)}
              className="group"
            >
              <Pencil
                size={20}
                className="group-hover:text-primary"
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-testid={`reminder-item-delete-${reminder.id}`}
              onClick={() => handleOnDelete(reminder.id)}
              className="group"
            >
              <Trash
                size={20}
                className="group-hover:text-destructive"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
