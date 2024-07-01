import { HttpResponse, http } from "msw";

import {
  TCreateReminderGroupRequestPayload,
  TCreateReminderGroupResponsePayload,
  TDeleteReminderGroupRequestPayload,
  TDeleteReminderGroupResponsePayload,
  TUpdateReminderGroupRequestPayload,
  TUpdateReminderGroupResponsePayload,
  TGetReminderGroupRequestPayload,
  TGetReminderGroupResponsePayload,
  TReminderGroup,
  THTTPError,
} from "types";

import { db } from "../db";

import { urlPrefix } from "../utils";

export const getReminderGroups = http.get(urlPrefix("/reminder-groups"), () => {
  return HttpResponse.json({ data: db.reminderGroup.getAll() }, { status: 200 });
});

export const getReminderGroup = http.get<
  { id: TGetReminderGroupRequestPayload },
  never,
  TGetReminderGroupResponsePayload | THTTPError
>(urlPrefix("/reminder-groups/:id"), ({ params }) => {
  const reminderGroup = db.reminderGroup.findFirst({
    where: {
      id: {
        equals: params.id,
      },
    },
  });

  if (!reminderGroup) {
    return HttpResponse.json({ message: `Reminder Group with id ${params.id} not found!` }, { status: 404 });
  }

  return HttpResponse.json({ data: reminderGroup }, { status: 200 });
});

export const createReminderGroup = http.post<
  never,
  TCreateReminderGroupRequestPayload,
  TCreateReminderGroupResponsePayload | THTTPError
>(urlPrefix("/reminder-groups"), async ({ request }) => {
  const requestBody = await request.json();

  const reminderGroup = db.reminderGroup.create({
    ...requestBody,
  });

  return HttpResponse.json({ data: reminderGroup }, { status: 201 });
});

export const deleteReminderGroup = http.delete<
  { id: TDeleteReminderGroupRequestPayload },
  never,
  TDeleteReminderGroupResponsePayload | THTTPError
>(urlPrefix("/reminder-groups/:id"), ({ params }) => {
  const reminderGroup = db.reminderGroup.findFirst({
    where: {
      id: {
        equals: params.id,
      },
    },
  });

  if (!reminderGroup) {
    return HttpResponse.json({ message: `Reminder Group with id ${params.id} not found!` }, { status: 404 });
  }

  db.reminderGroup.delete({
    where: {
      id: {
        equals: params.id,
      },
    },
  });

  return HttpResponse.json({ message: `Reminder Group with id ${params.id} deleted!` }, { status: 200 });
});

export const updateReminderGroup = http.patch<
  { id: TUpdateReminderGroupRequestPayload["id"] },
  TUpdateReminderGroupRequestPayload,
  TUpdateReminderGroupResponsePayload | THTTPError
>(urlPrefix("/reminder-groups/:id"), async ({ request, params }) => {
  const requestBody = await request.json();

  const reminderGroup = db.reminderGroup.findFirst({
    where: {
      id: {
        equals: params.id,
      },
    },
  });

  if (!reminderGroup) {
    return HttpResponse.json({ message: `Reminder Group with id ${params.id} not found!` }, { status: 404 });
  }

  const updatedReminder = db.reminderGroup.update({
    where: {
      id: {
        equals: params.id,
      },
    },
    data: {
      ...requestBody,
    },
  }) as TReminderGroup;

  return HttpResponse.json({ data: updatedReminder }, { status: 200 });
});
