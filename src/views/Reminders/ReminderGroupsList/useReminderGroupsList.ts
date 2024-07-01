import { useCallback } from "react";

import { toast } from "sonner";

import { useGetReminderGroupsQuery, useCreateReminderGroupMutation, handleAsync } from "shared";

export const useReminderGroupsList = () => {
  const getReminderGroupResult = useGetReminderGroupsQuery();

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

  if (createReminderGroupResult.isError) {
    toast.error("Error creating reminder group");
  }

  if (getReminderGroupResult.isError) {
    toast.error("Error fetching reminder groups");
  }

  return {
    reminderGroups: getReminderGroupResult.data,
    handleOnSave,
    isLoading,
    isErrored,
  };
};
