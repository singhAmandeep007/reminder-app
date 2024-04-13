import { Factory } from "miragejs";
// eslint-disable-next-line import/no-unresolved
import { FactoryDefinition } from "miragejs/-types";

// import { TReminderGroup } from "types";

export const reminderGroup: FactoryDefinition = Factory.extend({
  name(i) {
    return `Reminder Group ${i}`;
  },
  createdAt() {
    return new Date().toISOString();
  },
  updatedAt() {
    return new Date().toISOString();
  },
});
