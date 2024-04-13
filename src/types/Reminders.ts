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
  group?: TRemindersGroup;
};

export type TRemindersGroup = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TGetRemindersQueryParams = Partial<{
  groupId: TRemindersGroup["id"];
  state: TReminder["state"];
}>;

export type TGetRemindersResponsePayload = {
  data: TReminder[];
};

export type TGetRemindersGroupsResponsePayload = {
  data: TRemindersGroup[];
};

export type TCreateReminderRequestPayload = Pick<TReminder, "title"> & Partial<{ groupId: TRemindersGroup["id"] }>;

export type TCreateReminderResponsePayload = {
  data: TReminder;
};

export type TUpdateReminderRequestPayload = Pick<TReminder, "id"> &
  Partial<Pick<TReminder, "title" | "state" | "isPinned"> & { groupId: TRemindersGroup["id"] }>;

export type TUpdateReminderResponsePayload = {
  data: TReminder;
};

export type TDeleteReminderRequestPayload = TReminder["id"];

export type TDeleteReminderResponsePayload = {};
