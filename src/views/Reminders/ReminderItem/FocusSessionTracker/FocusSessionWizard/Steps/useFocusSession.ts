import { useCallback, useEffect } from "react";

import { addSeconds } from "date-fns";

import { useUpdateReminderMutation } from "shared";

import { handleAsync } from "utils";

import { useTimer } from "hooks/useTimer";

import { useFocusSessionWizardContext } from "../context";

export type TUseFocusSessionProps = Record<string, never>;

export const useFocusSession = () => {
  const [updateReminder, updateReminderResult] = useUpdateReminderMutation();

  const isLoading = updateReminderResult.isLoading;

  const isErrored = updateReminderResult.isError;

  const { reminder, focusSessionDuration: totalTicks } = useFocusSessionWizardContext();

  const { id: reminderId } = reminder;

  const handleOnFinish = useCallback(async () => {
    if (!reminder.currentFocusSession) return;

    const newFocusSession = reminder.currentFocusSession;

    await handleAsync(() =>
      updateReminder({
        id: reminder.id,
        currentFocusSession: null,
        focusSessions: [...reminder.focusSessions, newFocusSession],
      })
    );
  }, [updateReminder, reminder]);

  const { isRunning, elapsedTicks, start, stop } = useTimer(totalTicks, {
    onFinish: handleOnFinish,
  });

  const progress = (elapsedTicks / totalTicks) * 100;

  const handleOnStart = useCallback(async () => {
    const currentDate = new Date();

    const { error } = await handleAsync(() =>
      updateReminder({
        id: reminderId,
        currentFocusSession: {
          startTime: new Date().toISOString(),
          endTime: addSeconds(currentDate, totalTicks).toISOString(),
        },
      })
    );

    if (!error) {
      start();
    }
  }, [updateReminder, reminderId, totalTicks, start]);

  const handleOnStop = useCallback(async () => {
    if (!reminder.currentFocusSession) {
      return;
    }
    const newFocusSession = {
      startTime: reminder.currentFocusSession.startTime,
      endTime: new Date().toISOString(),
    };

    const { error } = await handleAsync(() => {
      return updateReminder({
        id: reminder.id,
        currentFocusSession: null,
        focusSessions: [...reminder.focusSessions, newFocusSession],
      });
    });

    if (!error) {
      stop();
    }
  }, [updateReminder, reminder, stop]);

  useEffect(() => {
    // on unmount save the current focus session
    return () => {
      if (isRunning) {
        handleOnStop();
      }
    };
  }, [isRunning, handleOnStop]);

  return {
    isLoading,
    isErrored,

    onStart: handleOnStart,
    onStop: handleOnStop,
    onFinish: handleOnFinish,

    isRunning,
    progress,
    /**
     * duration of the focus session in seconds
     */
    elapsedDuration: elapsedTicks,
    reminder,
  };
};
