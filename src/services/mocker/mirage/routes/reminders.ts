import { TMockServer } from "../types";

import { urlPrefix } from "./utils";

export function remindersRoutes(this: TMockServer) {
  this.get(urlPrefix("/reminders"), (schema, request) => {
    return schema.all("reminder");
  });
}
