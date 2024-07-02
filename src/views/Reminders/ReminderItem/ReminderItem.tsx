import { FC, PropsWithChildren, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash, Pin, CalendarClock } from "lucide-react";
import { format } from "date-fns";

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
  DateTimePicker,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogClose,
  Badge,
} from "components";

import { cn } from "shared";

import { AddUpdateItem } from "../components";

import { useReminderItem } from "./useReminderItem";

export type TReminderItemProps = {
  reminder: TReminder;
  listName?: string;
};

export const ReminderItem: FC<PropsWithChildren<TReminderItemProps>> = ({ reminder, listName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { handleOnDelete, handleOnUpdate, isLoading } = useReminderItem({
    reminder,
  });

  const isMenuDisabled = isLoading;

  const isCompleted = reminder.state === REMINDER_STATE.COMPLETED;

  const isOverdue = reminder.dueDate && new Date(reminder.dueDate) < new Date();

  return (
    <div
      className="flex flex-col py-2"
      data-testid={`reminder-item-${reminder.id}`}
    >
      {isUpdating && (
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
      )}

      {!isUpdating && (
        <>
          <div className="flex items-center justify-between gap-2">
            <Checkbox
              checked={isCompleted}
              className="peer"
              onClick={() =>
                handleOnUpdate({
                  id: reminder.id,
                  state: isCompleted ? REMINDER_STATE.INACTIVE : REMINDER_STATE.COMPLETED,
                })
              }
            />
            <Typography
              variant={"p"}
              affects={"withoutPMargin"}
              className={cn(
                "flex-1 overflow-x-scroll text-nowrap py-2 peer-aria-[checked=true]:text-muted-foreground peer-aria-[checked=true]:line-through"
              )}
            >
              {reminder.title}
            </Typography>
            <Dialog>
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                // NOTE: https://github.com/radix-ui/primitives/issues/1241#issuecomment-1580887090
                modal={false}
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
                    data-testid={`reminder-item-pin-${reminder.id}`}
                    onClick={() =>
                      handleOnUpdate({
                        id: reminder.id,
                        isPinned: !reminder.isPinned,
                      })
                    }
                    className={cn("group", {
                      "bg-primary text-secondary": reminder.isPinned,
                    })}
                    disabled={isCompleted}
                  >
                    <Pin
                      size={20}
                      className={cn("group-hover:text-primary")}
                      role="button"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className="group"
                      disabled={isCompleted}
                    >
                      <CalendarClock
                        size={20}
                        className="group-hover:text-primary"
                        role="button"
                      />
                    </DropdownMenuItem>
                  </DialogTrigger>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    data-testid={`reminder-item-edit-${reminder.id}`}
                    onClick={() => setIsUpdating(true)}
                    className="group"
                    disabled={isCompleted}
                  >
                    <Pencil
                      size={20}
                      className="group-hover:text-primary"
                      role="button"
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
                      role="button"
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="w-max">
                <DialogHeader>
                  <DialogTitle className="text-left">Schedule your reminder</DialogTitle>
                  <DialogDescription className="text-left">Select reminder's due date and time</DialogDescription>
                </DialogHeader>

                <DateTimePicker
                  isLoading={isLoading}
                  date={reminder.dueDate ? new Date(reminder.dueDate) : undefined}
                >
                  {({ selectedDateTime }) => {
                    return (
                      <DialogClose asChild>
                        <Button
                          size="full"
                          onClick={() => {
                            if (selectedDateTime) {
                              const dueDate = selectedDateTime.toISOString();
                              handleOnUpdate({ id: reminder.id, dueDate });
                            }
                          }}
                          className={cn(isLoading && "cursor-not-allowed")}
                          disabled={!selectedDateTime || isLoading}
                        >
                          Save
                        </Button>
                      </DialogClose>
                    );
                  }}
                </DateTimePicker>
              </DialogContent>
            </Dialog>
          </div>

          {!isCompleted && (
            <div className="ml-6 mr-10 flex flex-wrap gap-2">
              {!listName && reminder.group?.name && <Badge variant="default">{reminder.group.name}</Badge>}
              {reminder?.dueDate && (
                <Badge variant={isOverdue ? "destructive" : "default"}>
                  Due: {format(new Date(reminder.dueDate), "PPp")}
                </Badge>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
