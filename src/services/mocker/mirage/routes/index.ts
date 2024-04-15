import { TAppMockServer } from "../types";

import { reminderRoutes } from "./reminder";
import { reminderGroupRoutes } from "./reminderGroup";

export function createRoutes(this: TAppMockServer) {
  reminderRoutes.call(this);
  reminderGroupRoutes.call(this);
}
