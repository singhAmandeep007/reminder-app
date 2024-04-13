export const REMINDER_STATE = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
} as const;

export type TReminderState = (typeof REMINDER_STATE)[keyof typeof REMINDER_STATE];

export type TReminder = {
  id: string;
  title: string;
  state: TReminderState;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  group?: TReminderGroup;
};

export type TReminderGroup = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Reminder
 */
export type TGetRemindersQueryParams = Partial<{
  groupId: TReminderGroup["id"];
  state: TReminder["state"];
}>;

export type TGetRemindersResponsePayload = {
  data: TReminder[];
};

export type TCreateReminderRequestPayload = Pick<TReminder, "title"> & Partial<{ groupId: TReminderGroup["id"] }>;

export type TCreateReminderResponsePayload = {
  data: TReminder;
};

export type TUpdateReminderRequestPayload = Pick<TReminder, "id"> &
  Partial<Pick<TReminder, "title" | "state" | "isPinned"> & { groupId: TReminderGroup["id"] }>;

export type TUpdateReminderResponsePayload = {
  data: TReminder;
};

export type TDeleteReminderRequestPayload = TReminder["id"];

export type TDeleteReminderResponsePayload = {};

/**
 * Reminder Group
 */
export type TGetReminderGroupsResponsePayload = {
  data: TReminderGroup[];
};

export type TCreateReminderGroupRequestPayload = Pick<TReminderGroup, "name">;

export type TCreateReminderGroupResponsePayload = {
  data: TReminderGroup;
};

export type TUpdateReminderGroupRequestPayload = Pick<TReminderGroup, "id"> & Partial<Pick<TReminderGroup, "name">>;

export type TUpdateReminderGroupResponsePayload = {
  data: TReminderGroup;
};

export type TDeleteReminderGroupRequestPayload = TReminderGroup["id"];

export type TDeleteReminderGroupResponsePayload = {};
