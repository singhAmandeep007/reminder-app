// eslint-disable-next-line import/no-unresolved
import { ModelDefinition } from "miragejs/-types";
import { Model, hasMany } from "miragejs";

import { TReminderGroup } from "types";

export const reminderGroup: ModelDefinition<TReminderGroup> = Model.extend({
  reminders: hasMany(),
});
