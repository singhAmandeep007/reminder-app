import { Factory } from "miragejs";
// eslint-disable-next-line import/no-unresolved
import { FactoryDefinition } from "miragejs/-types";

// import { TReminder } from "types";

export const reminder: FactoryDefinition = Factory.extend({
  isPinned: false,
  state: "ACTIVE",
  title(i) {
    return `Reminder ${i}`;
  },
  createdAt() {
    return new Date().toISOString();
  },
  updatedAt() {
    return new Date().toISOString();
  },
});
