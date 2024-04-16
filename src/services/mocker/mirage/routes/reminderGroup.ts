import { TAppMockServer } from "../types";

import { urlPrefix, resourceNotFoundResponse } from "./utils";

export function reminderGroupRoutes(this: TAppMockServer) {
  this.get(urlPrefix("/reminder-groups"), (schema) => {
    const reminderGroups = schema.all("reminderGroup").models;

    return {
      data: reminderGroups,
    };
  });

  this.get(urlPrefix("/reminder-groups/:id"), (schema, request) => {
    const id = request.params.id;

    const reminderGroup = schema.find("reminderGroup", id);

    if (reminderGroup === null) {
      return resourceNotFoundResponse("Reminder group " + id);
    }

    return {
      data: reminderGroup,
    };
  });

  this.delete(urlPrefix("/reminder-groups/:id"), (schema, request) => {
    const id = request.params.id;

    const reminderGroup = schema.find("reminderGroup", id);

    if (reminderGroup === null) {
      return resourceNotFoundResponse("Reminder group " + id);
    }

    // @ts-expect-error
    const reminders = schema.all("reminder").filter((reminder) => reminder.groupId === id);

    reminders?.destroy();

    reminderGroup?.destroy();

    return {
      message: `Reminder group with id ${id} deleted!`,
    };
  });
}
