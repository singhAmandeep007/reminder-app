import { setupReminderGroupsController, setupRemindersController, TSetupController } from "./controllers";

export const setupHandlers = (config: Parameters<TSetupController>[0]) => [
  ...setupReminderGroupsController(config),
  ...setupRemindersController(config),
];
