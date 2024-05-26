// eslint-disable-next-line import/no-unresolved
import { BelongsTo, ModelDefinition } from "miragejs/-types";
import { Model, belongsTo } from "miragejs";

import { TReminder } from "types";

type TModelReminder = {
  group: BelongsTo<"reminderGroup">;
  getAttributes: () => TReminder;
};

export const reminder: ModelDefinition<TModelReminder> = Model.extend({
  // NOTE: the association's name is group and it is associated with model named reminderGroup.
  group: belongsTo("reminderGroup"),

  getAttributes() {
    // NOTE: this.attrs is the object that contains the attributes of the model.
    // NOTE: this.fks is array of foreign keys of the model.
    const { groupId, ...reminderAttributes } = (this as any).attrs;
    // NOTE: populate the group attribute if the reminder is associated with a group.
    if (groupId) {
      reminderAttributes.group = (this as any).group.attrs;
    }

    return reminderAttributes as TReminder;
  },
});
