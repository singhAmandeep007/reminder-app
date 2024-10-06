import { FC, PropsWithChildren, useMemo, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";

import { TReminderGroup } from "types";

import {
  Button,
  Typography,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "components";

import { cn } from "utils";

import { AddUpdateItem } from "../components";

import { useReminderGroupItem } from "./useReminderGroupItem";

export type TReminderGroupItemProps = {
  reminderGroup?: TReminderGroup;
};

export const ReminderGroupItem: FC<PropsWithChildren<TReminderGroupItemProps>> = ({ reminderGroup }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { handleOnDelete, handleOnItemClick, handleOnSave, isLoading, isSelected } = useReminderGroupItem({
    reminderGroup,
  });

  const isMenuDisabled = isLoading;

  const renderItem = useMemo(() => {
    if (reminderGroup && isUpdating) {
      return (
        <AddUpdateItem
          className="flex-1"
          defaultValue={reminderGroup.name}
          onCancel={() => setIsUpdating(false)}
          onSave={(name) => {
            handleOnSave({ id: reminderGroup.id, name });
            setIsUpdating(false);
          }}
          testIds={{
            cancel: `reminder-group-item-update-cancel-${reminderGroup.id}`,
            save: `reminder-group-item-update-save-${reminderGroup.id}`,
          }}
        />
      );
    }

    return (
      <Typography
        variant={"p"}
        className={cn("flex-1 cursor-pointer overflow-x-scroll text-nowrap py-2", isSelected && "text-primary")}
        onClick={() => handleOnItemClick({ groupId: reminderGroup ? reminderGroup.id : undefined })}
      >
        {reminderGroup ? reminderGroup.name : "All"}
      </Typography>
    );
  }, [isSelected, handleOnItemClick, isUpdating, reminderGroup, handleOnSave]);

  return (
    <div
      className={cn("flex cursor-pointer items-center justify-between gap-2 px-1 py-2")}
      data-testid={`reminder-group-item-${reminderGroup ? reminderGroup.name : "all"}`}
    >
      {renderItem}

      {reminderGroup && !isUpdating && (
        <DropdownMenu
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              data-testid={`reminder-group-item-menu-btn`}
              disabled={isMenuDisabled}
            >
              {isDropdownOpen ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onInteractOutside={() => setIsDropdownOpen(false)}
            className="min-w-min"
            data-testid={`reminder-group-item-menu`}
          >
            <DropdownMenuItem
              onClick={() => setIsUpdating(true)}
              data-testid={`reminder-group-item-update-${reminderGroup.name}`}
              className="group"
            >
              <Pencil
                size={20}
                className="group-hover:text-primary"
                role="button"
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleOnDelete(reminderGroup.id)}
              data-testid={`reminder-group-item-delete-${reminderGroup.name}`}
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
      )}
    </div>
  );
};
