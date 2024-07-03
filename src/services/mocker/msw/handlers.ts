import * as controllers from "./controllers";
import { TDb } from "./db";

export const setupHandlers = (db: TDb) => [
  ...controllers.setupReminderGroupsController(db),
  ...controllers.setupRemindersController(db),
];
