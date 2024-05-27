import { useCallback } from "react";

import {
  useGetRemindersQuery,
  useSelectQueryParams,
  useGetReminderGroupQuery,
  useCreateReminderMutation,
  handleAsync,
} from "shared";

export const useRemindersList = () => {
  const queryParams = useSelectQueryParams();

  const { currentData: reminders, refetch } = useGetRemindersQuery(queryParams);

  const { currentData: reminderGroup } = useGetReminderGroupQuery(queryParams.groupId as string, {
    skip: !queryParams.groupId,
  });

  const [createReminder, createReminderResult] = useCreateReminderMutation();

  const isLoading = createReminderResult.isLoading;

  const isErrored = createReminderResult.isError;

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

  return {
    reminders,
    reminderGroup,
    refetchReminders: refetch,
    handleOnSave,
    isLoading,
    isErrored,
  };
};
