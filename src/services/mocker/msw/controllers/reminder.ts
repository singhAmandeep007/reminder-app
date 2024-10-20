import { HttpResponse, http } from "msw";

import {
  TCreateReminderRequestPayload,
  TCreateReminderResponsePayload,
  TDeleteReminderRequestPathParams,
  TDeleteReminderResponsePayload,
  TReminder,
  THTTPError,
  TUpdateReminderRequestPayload,
  TUpdateReminderResponsePayload,
} from "types";

import { getUrlSearchParams, urlPrefix } from "utils";

import { TSetupController } from "./types";

export const setupRemindersController: TSetupController = ({ db }) => {
  const getReminders = http.get(urlPrefix("/reminders"), ({ request }) => {
    const reminders = db.reminder.getAll();

    const searchParams = getUrlSearchParams(request.url);

    let data: TReminder[] = reminders;

    if (searchParams["groupId"]) {
      data = data.filter((reminder) => reminder?.group?.id === searchParams["groupId"]);
    }

    if (searchParams["state"]) {
      data = data.filter((reminder) => reminder.state === searchParams["state"]);
    }

    return HttpResponse.json({ data }, { status: 200 });
  });

  const createReminder = http.post<never, TCreateReminderRequestPayload, TCreateReminderResponsePayload | THTTPError>(
    urlPrefix("/reminders"),
    async ({ request }) => {
      const { title, groupId } = await request.json();

      const group = db.reminderGroup.getAll().find((group) => group.id === groupId);

      if (groupId && !group) {
        return HttpResponse.json({ message: `Reminder Group with id ${groupId} not found!` }, { status: 404 });
      }

      const newReminder = db.reminder.create({ title, group });

      return HttpResponse.json({ data: newReminder }, { status: 201 });
    }
  );

  const deleteReminder = http.delete<{ id: TDeleteReminderRequestPathParams }, never, TDeleteReminderResponsePayload>(
    urlPrefix("/reminders/:id"),
    ({ params }) => {
      const reminder = db.reminder.findFirst({
        where: {
          id: {
            equals: params.id,
          },
        },
      });

      if (!reminder) {
        return HttpResponse.json({ message: `Reminder with id ${params.id} not found!` }, { status: 404 });
      }

      db.reminder.delete({
        where: {
          id: {
            equals: params.id,
          },
        },
      });

      return HttpResponse.json({ message: `Reminder with id ${params.id} deleted!` }, { status: 200 });
    }
  );

  const updateReminder = http.patch<
    { id: TUpdateReminderRequestPayload["id"] },
    TUpdateReminderRequestPayload,
    TUpdateReminderResponsePayload | THTTPError
  >(urlPrefix("/reminders/:id"), async ({ request, params }) => {
    const { groupId, ...requestBody } = await request.json();

    const reminder = db.reminder.findFirst({
      where: {
        id: {
          equals: params.id,
        },
      },
    });

    if (!reminder) {
      return HttpResponse.json({ message: `Reminder with id ${params.id} not found!` }, { status: 404 });
    }

    const group = db.reminderGroup.findFirst({
      where: {
        id: {
          equals: groupId,
        },
      },
    });

    if (groupId && !group) {
      return HttpResponse.json({ message: `Reminder Group with id ${groupId} not found!` }, { status: 404 });
    }

    const updatedReminder = db.reminder.update({
      where: {
        id: {
          equals: params.id,
        },
      },
      data: {
        ...(requestBody as any),
      },
    }) as TReminder;

    return HttpResponse.json({ data: updatedReminder }, { status: 200 });
  });

  return [getReminders, createReminder, deleteReminder, updateReminder];
};
