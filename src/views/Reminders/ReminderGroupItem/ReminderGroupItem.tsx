import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";

import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";

import { TReminderGroup } from "types";

import { Button, Typography, DropdownMenu } from "components";

import {
  useAppDispatch,
  setQueryParams,
  useAppSelector,
  selectQueryParams,
  cn,
  useDeleteReminderGroupMutation,
  handleAsync,
} from "shared";

import { useCreateUpdateItem } from "../useCreateUpdateItem";

import { IconButton } from "../components";

export type TReminderGroupItemProps = {
  reminderGroup?: TReminderGroup;
};

export const ReminderGroupItem: FC<PropsWithChildren<TReminderGroupItemProps>> = ({ reminderGroup }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const [deleteReminderGroup, deleteReminderGroupResult] = useDeleteReminderGroupMutation();
  const { groupId } = useAppSelector(selectQueryParams);
  const isSelected = groupId === reminderGroup?.id;

  const { ItemComponent, result: updateReminderGroupResult } = useCreateUpdateItem({
    type: "reminderGroup",
    mode: "update",
    ...(reminderGroup ? { id: reminderGroup.id } : {}),
    onCancel: () => setIsEditing(false),
    onSave: () => setIsEditing(false),
    value: reminderGroup?.name,
  });

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

  const renderItem = useMemo(() => {
    if (reminderGroup && isEditing) {
      return <ItemComponent />;
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
  }, [isSelected, handleOnItemClick, isEditing, ItemComponent, reminderGroup]);

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
