import { useCallback } from "react";

import { toast } from "sonner";

import { useGetReminderGroupsQuery, useCreateReminderGroupMutation } from "store";
import { handleAsync } from "utils";

export const useReminderGroupsList = () => {
  const getReminderGroupsResult = useGetReminderGroupsQuery();

  const [createReminderGroup, createReminderGroupResult] = useCreateReminderGroupMutation();

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

  if (getReminderGroupsResult.isError) {
    toast.error("Error fetching reminder groups");
  }

  return {
    reminderGroups: getReminderGroupsResult.data,
    handleOnSave,
  };
};
