import { FC, PropsWithChildren, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash, Pin, CalendarClock, Timer } from "lucide-react";

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
} from "components";

import { cn } from "shared";

import { AddUpdateItem } from "../components";

import { useReminderItem } from "./useReminderItem";

import { Badges } from "./Badges";
import { FocusSessionTracker } from "./FocusSessionTracker";

export type TReminderItemProps = {
  reminder: TReminder;
  listName?: string;
};

const DIALOGS = {
  DUE_DATE: "DUE_DATE",
  FOCUS_SESSION: "FOCUS_SESSION",
} as const;

type TDialog = (typeof DIALOGS)[keyof typeof DIALOGS] | null;

export const ReminderItem: FC<PropsWithChildren<TReminderItemProps>> = ({ reminder, listName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialog, setDialog] = useState<TDialog>(null);

  const { handleOnDelete, handleOnUpdate, isLoading } = useReminderItem({
    reminder,
  });

  const isMenuDisabled = isLoading;

  const isCompleted = reminder.state === REMINDER_STATE.COMPLETED;

  return (
    <div
      className="flex flex-col py-2"
      data-testid={`reminder-item-${reminder.title}`}
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
            cancel: `reminder-update-cancel`,
            save: `reminder-update-save`,
            text: `reminder-update-text`,
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
              data-testid={`reminder-item-checkbox`}
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
                    data-testid={`reminder-item-menu-btn`}
                    disabled={isMenuDisabled}
                  >
                    {isDropdownOpen ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-min"
                  align="end"
                  onInteractOutside={() => setIsDropdownOpen(false)}
                  data-testid={`reminder-item-menu`}
                >
                  <DropdownMenuItem
                    data-testid={`reminder-item-menuitem-pin`}
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

                  <DialogTrigger
                    asChild
                    onClick={() => {
                      setDialog(DIALOGS.FOCUS_SESSION);
                    }}
                  >
                    <DropdownMenuItem
                      className={cn("group")}
                      disabled={isCompleted}
                      data-testid={`reminder-item-menuitem-focus-session`}
                    >
                      <Timer
                        size={20}
                        className={cn("group-hover:text-primary")}
                        role="button"
                      />
                    </DropdownMenuItem>
                  </DialogTrigger>

                  <DropdownMenuSeparator />

                  <DialogTrigger
                    asChild
                    onClick={() => {
                      setDialog(DIALOGS.DUE_DATE);
                    }}
                  >
                    <DropdownMenuItem
                      className="group"
                      disabled={isCompleted}
                      data-testid={`reminder-item-menuitem-due-date`}
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
                    data-testid={`reminder-item-menuitem-edit`}
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
                    data-testid={`reminder-item-menuitem-delete`}
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

              <DialogContent
                className="w-max"
                data-testid="reminder-item-dialog"
              >
                {dialog === DIALOGS.DUE_DATE && (
                  <>
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
                              data-testid={`reminder-item-save-due-date-btn`}
                            >
                              Save
                            </Button>
                          </DialogClose>
                        );
                      }}
                    </DateTimePicker>
                  </>
                )}
                {dialog === DIALOGS.FOCUS_SESSION && <FocusSessionTracker reminder={reminder} />}
              </DialogContent>
            </Dialog>
          </div>

          {!isCompleted && (
            <Badges
              reminder={reminder}
              listName={listName}
            />
          )}
        </>
      )}
    </div>
  );
};
