import { subDays, addMinutes } from "date-fns";

import { TReminder } from "types";

import { generateUniqueRandomNumbers } from "shared";

export function generateRandomFocusSessions(
  numberOfEntries: number,
  maxDaysInPast: number = 30
): TReminder["focusSessions"] {
  const now = new Date();
  const history: TReminder["focusSessions"] = [];

  const randomPastDays = generateUniqueRandomNumbers(numberOfEntries, 1, maxDaysInPast);

  for (let i = 0; i < numberOfEntries; i++) {
    // Generate a random start date within the last maxDaysInPast days
    const startDate = subDays(now, randomPastDays[i]);

    // Add a random number of minutes (0 to 120) to get the end time
    const randomMinutes = Math.floor(Math.random() * 121);
    const endDate = addMinutes(startDate, randomMinutes);

    // Ensure the end time is not in the future
    const adjustedEndDate = endDate > now ? now : endDate;

    const entry: TReminder["focusSessions"][number] = {
      startTime: startDate.toISOString(),
      endTime: adjustedEndDate.toISOString(),
    };

    history.push(entry);
  }

  // Sort the history by start time, most recent last
  return history.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}
