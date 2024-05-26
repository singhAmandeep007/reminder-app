import { FC, PropsWithChildren, useCallback, useMemo, useRef, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash, Check, X } from "lucide-react";

import { TReminderGroup } from "types";

import { Button, Typography, DropdownMenu, Input } from "components";

import {
  useAppDispatch,
  setQueryParams,
  useAppSelector,
  selectQueryParams,
  cn,
  useDeleteReminderGroupMutation,
  useUpdateReminderGroupMutation,
  handleAsync,
} from "shared";

import { IconButton } from "../components";

export type TReminderGroupItemProps = {
  reminderGroup?: TReminderGroup;
};

export const ReminderGroupItem: FC<PropsWithChildren<TReminderGroupItemProps>> = ({ reminderGroup }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const [deleteReminderGroup, deleteReminderGroupResult] = useDeleteReminderGroupMutation();
  const [updateReminderGroup, updateReminderGroupResult] = useUpdateReminderGroupMutation();
  const { groupId } = useAppSelector(selectQueryParams);
  const isSelected = groupId === reminderGroup?.id;
  const isMenuDisabled = deleteReminderGroupResult.isLoading || updateReminderGroupResult.isLoading;

  const className = cn("py-2 flex items-center justify-between cursor-pointer gap-2");

  const handleOnItemClick = useCallback(
    (queryParams: Parameters<typeof setQueryParams>[0]) => {
      // update the query params value in store, causing a re-fetch of the reminders
      dispatch(setQueryParams(queryParams));
    },
    [dispatch]
  );

  const handleOnDelete = useCallback(
    async (id: Parameters<typeof deleteReminderGroup>[0]) => {
      await handleAsync(() => deleteReminderGroup(id));
    },
    [deleteReminderGroup]
  );

  const handleOnEdit = useCallback(
    async (payload: Parameters<typeof updateReminderGroup>[0]) => {
      await handleAsync(() => updateReminderGroup(payload));
      setIsEditing(false);
    },
    [updateReminderGroup]
  );

  const renderItem = useMemo(() => {
    if (reminderGroup && isEditing) {
      return (
        <div className="flex flex-1 items-center justify-between">
          <Input
            className="ml-1 mr-2"
            defaultValue={reminderGroup.name}
            ref={inputRef}
            autoFocus
          />
          <div className="flex items-center gap-1">
            <IconButton onClick={() => handleOnEdit({ id: reminderGroup.id, name: inputRef.current!.value })}>
              <Check className="icon" />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)}>
              <X className="icon text-destructive" />
            </IconButton>
          </div>
        </div>
      );
    }

    return (
      <Typography
        variant={"p"}
        className={cn("overflow-x-scroll text-nowrap py-2", isSelected && "text-primary")}
        onClick={() => handleOnItemClick({ groupId: reminderGroup ? reminderGroup.id : undefined })}
      >
        {reminderGroup ? reminderGroup.name : "All"}
      </Typography>
    );
  }, [reminderGroup, isEditing, isSelected, handleOnItemClick, handleOnEdit]);

  return (
    <div
      className={`${className}`}
      data-testid={`reminder-group-item-${reminderGroup ? reminderGroup.id : "all"}`}
    >
      {renderItem}

      {reminderGroup && !isEditing && (
        <DropdownMenu
          data={[
            {
              id: "edit",
              component: () => (
                <IconButton
                  data-testid={`reminder-group-item-edit-${reminderGroup.id}`}
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
                  data-testid={`reminder-group-item-delete-${reminderGroup.id}`}
                  onClick={() => handleOnDelete(reminderGroup.id)}
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
              data-testid={`reminder-group-item-menu-${reminderGroup.id}`}
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
