import { FC, useMemo } from "react";
import { format, intervalToDuration, differenceInMilliseconds } from "date-fns";

import { Badge } from "components";

import { TReminder } from "types";

export type TBadgesProps = {
  reminder: TReminder;

  listName?: string;
};

function formatTimeSpent(milliseconds: number): string {
  const duration = intervalToDuration({ start: 0, end: milliseconds });

  type TDuration = keyof typeof duration;

  const units: TDuration[] = ["hours", "minutes"];

  const format = units
    .map((unit) => {
      const value = duration[unit];

      if (value && value > 0) {
        return `${value}${unit.charAt(0)}`;
      }

      return "";
    })
    .filter(Boolean)
    .join("");

  return format || "0m";
}

export const Badges: FC<TBadgesProps> = ({ reminder, listName }) => {
  const isOverdue = reminder.dueDate && new Date(reminder.dueDate) < new Date();

  const totalDurationMs = useMemo(
    () =>
      reminder.focusSessions.reduce((acc, curr) => {
        const start = new Date(curr.startTime);
        const end = new Date(curr.endTime);
        const duration = differenceInMilliseconds(end, start);

        return acc + duration;
      }, 0),
    [reminder.focusSessions]
  );
  return (
    <div className="ml-6 mr-10 flex flex-wrap gap-2">
      {!listName && reminder.group?.name && <Badge variant="default">{reminder.group.name}</Badge>}

      {reminder.dueDate && (
        <Badge variant={isOverdue ? "destructive" : "default"}>Due: {format(new Date(reminder.dueDate), "PPp")}</Badge>
      )}

      {totalDurationMs > 0 && <Badge variant="default">Time spent: {formatTimeSpent(totalDurationMs)}</Badge>}
    </div>
  );
};
