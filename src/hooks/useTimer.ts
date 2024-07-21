import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Configuration options for the useTimer hook.
 */
export type TUseTimerConfig = {
  /**
   * Determines whether the timer should start automatically.
   * @defaultValue `false`
   */
  autoStart?: boolean;

  /**
   * The interval in milliseconds at which the remaining ticks should update.
   * @defaultValue `1000`
   */
  interval?: number;

  /**
   * A callback function that will be called when the timer ticks with the remaining ticks as an argument.
   */
  onTick?: (remainingTick: number) => void;

  /**
   * A callback function that will be called when the timer finishes.
   */
  onFinish?: () => void;

  /**
   * A callback function that will be called when the timer starts.
   */
  onStart?: () => void;
};

export type TUseTimerProps = {
  totalTicks: number;
  config: TUseTimerConfig;
};

/**
 * Custom hook for a timer. Use to control the number of ticks remaining, tick completion duration, handle timer completion and start events.
 * @param totalTicks - The inital total number of ticks.
 * @param {UseTimerConfig} options - Optional configuration for the timer.
 * @returns {Object} - An object containing the remaining ticks, timer controllers and timer running state.
 */
export const useTimer = (
  totalTicks: TUseTimerProps["totalTicks"],
  { autoStart = false, interval = 1000, onTick, onFinish, onStart }: TUseTimerProps["config"] = {}
) => {
  // eslint-disable-next-line no-console
  if (totalTicks < 1) console.warn("total ticks is 0");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const [remainingTicks, setRemainingTicks] = useState(totalTicks);
  const [isRunning, setIsRunning] = useState(autoStart);

  const elapsedTicks = totalTicks - remainingTicks;

  // const savedCallback = useRef<typeof onTick>();

  const start = useCallback(() => {
    if (isRunning) return;
    const isFirstTick = remainingTicks === totalTicks;
    const hasTimerEnded = remainingTicks === 0;
    // timer not running
    setIsRunning(true);
    // restart the timer
    if (hasTimerEnded) {
      setRemainingTicks(totalTicks);
    }
    // call the onStart callback if the timer is starting or restarting
    if (isFirstTick || hasTimerEnded) {
      onStart?.();
    }
  }, [totalTicks, onStart, isRunning, remainingTicks]);

  const stop = useCallback(() => {
    if (!isRunning) return;
    // timer is running
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsRunning(false);
    setRemainingTicks(totalTicks);
  }, [isRunning, totalTicks]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    // timer is running
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsRunning(false);
  }, [isRunning]);

  useEffect(() => {
    if (autoStart) {
      onStart?.();
    }
  }, [autoStart, onStart]);

  useEffect(() => {
    if (!isRunning) return;
    const currentTick = totalTicks - remainingTicks + 1;
    // timer is running
    if (remainingTicks > 0) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setRemainingTicks((ticks) => ticks - 1);
        onTick?.(currentTick);
      }, interval);
    } else {
      setIsRunning(false);
      onFinish?.();
    }
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [remainingTicks, isRunning, interval, totalTicks, onFinish, onTick]);

  return { remainingTicks, elapsedTicks, isRunning, start, pause, stop };
};
