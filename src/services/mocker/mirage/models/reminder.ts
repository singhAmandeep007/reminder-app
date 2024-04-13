// eslint-disable-next-line import/no-unresolved
import { ModelDefinition } from "miragejs/-types";
import { Model, belongsTo } from "miragejs";

import { TReminder } from "types";

export const reminder: ModelDefinition<TReminder> = Model.extend({
  reminderGroup: belongsTo(),
});
