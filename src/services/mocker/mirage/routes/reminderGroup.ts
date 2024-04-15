import { Response } from "miragejs";

import { TAppMockServer } from "../types";

import { urlPrefix } from "./utils";

export function reminderGroupRoutes(this: TAppMockServer) {
  this.get(urlPrefix("/reminder-groups"), (schema, request) => {
    const reminderGroups = schema.all("reminderGroup").models;
    return {
      data: reminderGroups,
    };
  });

  this.delete(urlPrefix("/reminder-groups/:id"), (schema, request) => {
    const id = request.params.id;

    const reminderGroup = schema.find("reminderGroup", id);

    reminderGroup?.destroy();

    return new Response(
      reminderGroup === null ? 404 : 200,
      {},
      {
        message:
          reminderGroup === null ? `Reminder group with id ${id} not found!` : `Reminder group with id ${id} deleted!`,
      }
    );
  });
}
