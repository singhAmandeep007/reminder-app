import { Factory } from "miragejs";
// eslint-disable-next-line import/no-unresolved
import { FactoryDefinition } from "miragejs/-types";

import { TReminderGroup } from "types";

export const reminderGroup: FactoryDefinition = Factory.extend<TReminderGroup>({
  id(n) {
    return `reminder-group-id-${n}`;
  },
  name(n) {
    return `Reminder Group ${n}`;
  },
  createdAt() {
    return new Date().toISOString();
  },
  updatedAt() {
    return new Date().toISOString();
  },
});
