import { useCallback } from "react";

import { useGetReminderGroupsQuery, useCreateReminderGroupMutation, handleAsync } from "shared";

export const useReminderGroupsList = () => {
  const { data: reminderGroups } = useGetReminderGroupsQuery();

  const [createReminderGroup, createReminderGroupResult] = useCreateReminderGroupMutation();

  const isLoading = createReminderGroupResult.isLoading;

  const isErrored = createReminderGroupResult.isError;

  const handleOnSave = useCallback(
    async (props: Parameters<typeof createReminderGroup>[0]) => {
      await handleAsync(() =>
        createReminderGroup({
          name: props.name,
        })
      );
    },
    [createReminderGroup]
  );

  return {
    reminderGroups,
    handleOnSave,
    isLoading,
    isErrored,
  };
};
