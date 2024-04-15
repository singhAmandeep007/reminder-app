import { TAppMockServer } from "../types";

export function buildScenarios(server: TAppMockServer) {
  const builder = {
    withReminders: (n: number = 10) => {
      server.createList("reminder", n);
      return builder;
    },
    withReminderGroups: (n: number = 5) => {
      const workGroup = server.create("reminderGroup", { name: "Work" });
      const homeGroup = server.create("reminderGroup", { name: "Home" });
      const personalGroup = server.create("reminderGroup", { name: "Personal" });

      server.createList("reminder", n, { group: workGroup });
      server.createList("reminder", n, { group: homeGroup });
      server.createList("reminder", n, { group: personalGroup });

      return builder;
    },
  };
  return builder;
}
