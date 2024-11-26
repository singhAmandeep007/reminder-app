import { FC } from "react";

import { Play, Square } from "lucide-react";

import { truncateText } from "utils";

import { DialogDescription, DialogHeader, DialogTitle, Button } from "components";

import { useFocusSession } from "./useFocusSession";

const FormattedFocusedTime = ({ totalSeconds }: { totalSeconds: number }) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return (
    <div className="flex gap-2 text-sm">
      {hours > 0 && <span>{hours} hr</span>}
      {minutes > 0 && <span>{minutes} min</span>}
      <span>{remainingSeconds} sec</span>
    </div>
  );
};

export type TFocusSessionProps = Record<string, never>;

export const FocusSession: FC<TFocusSessionProps> = () => {
  const { isRunning, progress, onStart, onStop, elapsedDuration, reminder } = useFocusSession();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">Ready, set, focus!</DialogTitle>
        <DialogDescription className="max-w-xs text-left">
          🎯 {truncateText(reminder.title, { maxLength: 100 })}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center gap-2">
        <FocusTimer
          isRunning={isRunning}
          progress={progress}
          onStart={onStart}
          onStop={onStop}
          size={240}
        >
          <FormattedFocusedTime totalSeconds={elapsedDuration} />
        </FocusTimer>
      </div>
    </>
  );
};

export type TFocusTimerProps = {
  /**
   * Progress in range [0-100]
   */
  progress: number;
  /**
   * Size of the svg
   */
  size?: number;
  /**
   * Whether the timer is running
   */
  isRunning: boolean;
  onStart?: () => void;
  onStop?: () => void;
  children?: React.ReactNode;
};

const FocusTimer: React.FC<TFocusTimerProps> = ({ progress, size = 144, onStart, onStop, isRunning, children }) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = Math.max(circumference - (progress / 100) * circumference, 0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
        >
          <circle
            className="stroke-muted"
            fill="none"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="stroke-primary"
            fill="none"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              strokeLinecap: "round",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      </div>
      <Button
        onClick={isRunning ? onStop : onStart}
        className="h-max rounded-full p-3"
      >
        {isRunning ? (
          <Square
            size={16}
            className={"!pointer-events-none fill-current"}
          />
        ) : (
          <Play
            size={16}
            className={"!pointer-events-none fill-current"}
          />
        )}
      </Button>
    </div>
  );
};
