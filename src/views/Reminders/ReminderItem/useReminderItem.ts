import { useCallback } from "react";

import { useDeleteReminderMutation, handleAsync, useUpdateReminderMutation } from "shared";
import { TReminder } from "types";

export type TUseReminderItemProps = {
  reminder: TReminder;
};

export const useReminderItem = ({ reminder }: TUseReminderItemProps) => {
  const [deleteReminder, deleteReminderResult] = useDeleteReminderMutation();
  const [updateReminder, updateReminderResult] = useUpdateReminderMutation();

  const isLoading = deleteReminderResult.isLoading || updateReminderResult.isLoading;

  const isErrored = deleteReminderResult.isError || updateReminderResult.isError;

  const handleOnDelete = useCallback(
    async (id: Parameters<typeof deleteReminder>[0]) => {
      await handleAsync(() => deleteReminder(id));
    },
    [deleteReminder]
  );

  const handleOnUpdate = useCallback(
    async (props: Parameters<typeof updateReminder>[0]) => {
      await handleAsync(() =>
        updateReminder({
          id: props.id,
          groupId: props.groupId,
          title: props.title,
          state: props.state,
        })
      );
    },
    [updateReminder]
  );

  return {
    isLoading,
    isErrored,

    handleOnDelete,
    handleOnUpdate,
  };
};
