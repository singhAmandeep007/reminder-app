import { useCallback } from "react";

import { toast } from "sonner";

import {
  useGetRemindersQuery,
  useSelectQueryParams,
  useGetReminderGroupQuery,
  useCreateReminderMutation,
  handleAsync,
} from "shared";

export const useRemindersList = () => {
  const queryParams = useSelectQueryParams();

  const getRemindersResult = useGetRemindersQuery(queryParams);

  const getReminderGroupResult = useGetReminderGroupQuery(queryParams.groupId as string, {
    skip: !queryParams.groupId,
  });

  const [createReminder, createReminderResult] = useCreateReminderMutation();

  const handleOnSave = useCallback(
    async (props: Parameters<typeof createReminder>[0]) => {
      await handleAsync(() =>
        createReminder({
          groupId: props.groupId,
          title: props.title,
        })
      );
    },
    [createReminder]
  );

  if (getReminderGroupResult.isError) {
    toast.error("Error fetching reminder group");
  }

  if (getRemindersResult.isError) {
    toast.error("Error fetching reminders");
  }

  if (createReminderResult.isError) {
    toast.error("Error creating reminder");
  }

  return {
    reminders: getRemindersResult.currentData,
    reminderGroup: getReminderGroupResult.currentData,
    refetchReminders: getRemindersResult.refetch,
    handleOnSave,
  };
};
