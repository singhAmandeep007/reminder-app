import { Response } from "miragejs";

import { TAppMockServer } from "../types";

import { urlPrefix } from "./utils";

export function reminderRoutes(this: TAppMockServer) {
  this.get(urlPrefix("/reminders"), (schema, request) => {
    let reminders; // Collection<Instantiate<TAppRegistry, "reminder">>;
    const queryParams = request.queryParams;
    // queryParams = { groupId: "group-id-1" }

    if (queryParams) {
      reminders = schema.where("reminder", queryParams);
    } else {
      reminders = schema.all("reminder");
    }

    return {
      data: reminders.models.map((reminder) => reminder.getAttributes()),
    };
  });

  this.post(urlPrefix("/reminders"), (schema, request) => {
    const attrs = JSON.parse(request.requestBody);

    const reminder = schema.create("reminder", attrs);

    return {
      data: reminder.attrs,
    };
  });

  // NOTE: :segmentName to define a dynamic segment in the URL for a route handler
  this.delete(urlPrefix("/reminders/:id"), (schema, request) => {
    // NOTE: Access dynamic segments via request.params.segmentName
    const id = request.params.id;

    const reminder = schema.find("reminder", id);

    reminder?.destroy();

    // NOTE: use Response class to return a custom response
    return new Response(
      reminder === null ? 404 : 200,
      {},
      { message: reminder === null ? `Reminder with id ${id} not found!` : `Reminder with id ${id} deleted!` }
    );
  });
}
