import { setupReminderGroupsController, setupRemindersController, TSetupController } from "./controllers";

import { db } from "./db";

export const setupHandlers = (config: Parameters<TSetupController>[0]) => [
  ...setupReminderGroupsController(config),
  ...setupRemindersController(config),
];

export const handlers = setupHandlers({ db });
