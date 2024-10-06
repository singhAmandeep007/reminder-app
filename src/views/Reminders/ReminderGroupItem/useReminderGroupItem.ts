import { useCallback } from "react";

import {
  useAppDispatch,
  setQueryParams,
  useAppSelector,
  selectQueryParams,
  useDeleteReminderGroupMutation,
  useUpdateReminderGroupMutation,
} from "shared";
import { handleAsync } from "utils";
import { TReminderGroup } from "types";

export type TUseReminderGroupItemProps = {
  reminderGroup?: TReminderGroup;
};

export const useReminderGroupItem = ({ reminderGroup }: TUseReminderGroupItemProps) => {
  const { groupId } = useAppSelector(selectQueryParams);
  const isSelected = groupId === reminderGroup?.id;

  const [deleteReminderGroup, deleteReminderGroupResult] = useDeleteReminderGroupMutation();
  const [updateReminderGroup, updateReminderGroupResult] = useUpdateReminderGroupMutation();

  const dispatch = useAppDispatch();

  const isLoading = deleteReminderGroupResult.isLoading || updateReminderGroupResult.isLoading;

  const isErrored = deleteReminderGroupResult.isError || updateReminderGroupResult.isError;

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

  const handleOnSave = useCallback(
    async (props: Parameters<typeof updateReminderGroup>[0]) => {
      await handleAsync(() =>
        updateReminderGroup({
          id: props.id,
          name: props.name,
        })
      );
    },
    [updateReminderGroup]
  );

  return {
    isSelected,
    isLoading,
    isErrored,
    handleOnItemClick,
    handleOnDelete,

    handleOnSave,
  };
};
