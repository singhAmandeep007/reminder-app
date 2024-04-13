import { HttpResponse, http } from "msw";

import { TCreateReminderRequestPayload, TReminder, TRemindersGroup } from "types";

import { uuid, getUrlSearchParams } from "shared";

import { urlPrefix } from "./utils";

const group1: TRemindersGroup = {
  id: uuid(),
  name: "group 1",
  createdAt: "2021-09-01T00:00:00Z",
  updatedAt: "2021-09-01T00:00:00Z",
};
const group2: TRemindersGroup = {
  id: uuid(),
  name: "group 2",
  createdAt: "2021-09-03T00:00:00Z",
  updatedAt: "2021-09-03T00:00:00Z",
};

const remindersGroup: TRemindersGroup[] = [group1, group2];

const reminders: TReminder[] = [
  {
    id: uuid(),
    state: "ACTIVE",
    title: "task 1.1",
    isPinned: false,
    group: group1,
    createdAt: "2021-09-02T00:00:00Z",
    updatedAt: "2021-09-02T00:00:00Z",
  },
  {
    id: uuid(),
    state: "ACTIVE",
    title: "task 1.2",
    isPinned: false,
    group: group1,
    createdAt: "2021-10-04T00:00:00Z",
    updatedAt: "2021-10-04T00:00:00Z",
  },

  {
    id: uuid(),
    state: "ACTIVE",
    title: "task 2.2",
    isPinned: false,
    group: group2,
    createdAt: "2021-10-04T00:00:00Z",
    updatedAt: "2021-10-04T00:00:00Z",
  },
  {
    id: uuid(),
    state: "ACTIVE",
    title: "task 3.1",
    isPinned: false,
    createdAt: "2021-10-05T00:00:00Z",
    updatedAt: "2021-10-05T00:00:00Z",
  },
  {
    id: uuid(),
    state: "ACTIVE",
    title: "task 3.2",
    isPinned: false,
    createdAt: "2021-10-05T00:00:00Z",
    updatedAt: "2021-10-05T00:00:00Z",
  },
];

export const getReminders = http.get(urlPrefix("/reminders"), ({ request }) => {
  const searchParams = getUrlSearchParams(request.url);

  let data = structuredClone(reminders) as TReminder[];

  if (searchParams["groupId"]) {
    data = data.filter((reminder) => reminder?.group?.id === searchParams["groupId"]);
  }

  if (searchParams["state"]) {
    data = data.filter((reminder) => reminder.state === searchParams["state"]);
  }

  return HttpResponse.json({ data }, { status: 200 });
});

export const getRemindersGroups = http.get(urlPrefix("/remindersGroups"), () => {
  return HttpResponse.json({ data: remindersGroup }, { status: 200 });
});

export const createReminder = http.post<never, TCreateReminderRequestPayload>(
  urlPrefix("/reminders"),
  async ({ request }) => {
    const { title, groupId } = await request.json();

    const group = remindersGroup.find((group) => group.id === groupId);

    if (groupId && !group) {
      return HttpResponse.json({ message: `Reminders Group with id ${groupId} not found!` }, { status: 404 });
    }

    const newReminder: TReminder = {
      id: uuid(),
      state: "ACTIVE",
      title: title,
      isPinned: false,
      ...(groupId ? group : {}),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reminders.push(newReminder);

    return HttpResponse.json({ data: newReminder }, { status: 201 });
  }
);
