import { TMockServer } from "../types";

import { remindersRoutes } from "./reminders";

export function createRoutes(this: TMockServer) {
  remindersRoutes.call(this);
}
