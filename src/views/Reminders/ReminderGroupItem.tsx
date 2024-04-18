import { FC, PropsWithChildren, useCallback } from "react";

import { TReminderGroup } from "types";

import { Typography } from "components";

import {
  useAppDispatch,
  setQueryParams,
  useAppSelector,
  selectQueryParams,
  cn,
  useDeleteReminderGroupMutation,
  handleAsync,
} from "shared";

import { DeleteButton } from "./components";

export type TReminderGroupItemProps = {
  reminderGroup?: TReminderGroup;
};

export const ReminderGroupItem: FC<PropsWithChildren<TReminderGroupItemProps>> = ({ reminderGroup }) => {
  const dispatch = useAppDispatch();

  const { groupId } = useAppSelector(selectQueryParams);

  const [deleteReminderGroup, result] = useDeleteReminderGroupMutation();

  const isSelected = groupId === reminderGroup?.id;

  const className = cn("py-2 flex items-center justify-between cursor-pointer gap-2");

  const titleClassName = cn("text-nowrap overflow-x-scroll py-2", isSelected && "text-primary");

  const handleOnItemClick = useCallback(
    (queryParams: Parameters<typeof setQueryParams>[0]) => {
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

  if (!reminderGroup) {
    return (
      <div
        className={className}
        data-testid="reminder-group-item-all"
        onClick={() => handleOnItemClick({ groupId: undefined })}
      >
        <Typography
          variant={"p"}
          className={titleClassName}
        >
          All
        </Typography>
      </div>
    );
  }

  return (
    <div
      className={className}
      data-testid={`reminder-group-item-${reminderGroup.id}`}
    >
      <Typography
        variant={"p"}
        className={titleClassName}
        onClick={() => handleOnItemClick({ groupId: reminderGroup.id })}
      >
        {reminderGroup.name}
      </Typography>

      <DeleteButton
        data-testid={`delete-reminder-group-item-${reminderGroup.id}`}
        onClick={() => handleOnDelete(reminderGroup.id)}
        disabled={result.isLoading}
      />
    </div>
  );
};
