export const REMINDER_STATE = {
  INACTIVE: "INACTIVE",
  INPROGRESS: "INPROGRESS",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
} as const;

export type TReminderState = (typeof REMINDER_STATE)[keyof typeof REMINDER_STATE];

export type TReminderFocusSession = {
  startTime: string;
  endTime: string;
};

export type TReminder = {
  id: string;
  title: string;
  /**
   * Current state of the reminder.
   *
   * @example "IN_ACTIVE" | "IN_PROGRESS" | "COMPLETED"
   */
  state: TReminderState;
  /**
   * Indicates if the reminder is pinned on top.
   */
  isPinned: boolean;
  /**
   * Date and time the reminder was created. (ISO 8601 format)
   */
  createdAt: string;
  /**
   * Date and time the reminder was last updated. (ISO 8601 format)
   */
  updatedAt: string;
  /**
   * Optional reminder group this reminder belongs to.
   */
  group: TReminderGroup | null;
  /**
   * Due date and time for the reminder. (ISO 8601 format)
   *
   * @example "2021-09-30T00:00:00.000Z"
   */
  dueDate: string | null;
  /**
   * Number of times to repeat the reminder.
   *
   * @default 1
   */
  repeatTimes: number | null;
  /**
   * Interval to repeat the reminder. (in milliseconds)
   *
   * @default 300000 (5 minutes)
   */
  repeatInterval: number | null;

  /**
   * Current focus session for this reminder.
   */
  currentFocusSession: {
    /**
     * date and time when focus session was started for this reminder. (ISO 8601 format)
     */
    startTime: string;
    /**
     * date and time the focus session stopped for this reminder. (ISO 8601 format)
     */
    endTime: string;
  } | null;
  /**
   * Array to store history of multiple focus sessions for this reminder.
   * Each session includes start time and end time.
   */
  focusSessions: TReminderFocusSession[];
};

export type TReminderGroup = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TMessageResponsePayload = {
  message: string;
};

export type TDataResponsePayload<T> = {
  data: T;
};

/**
 * Error
 */
export type THTTPError = {
  message: string;
};

/**
 * Reminder
 */
export type TGetRemindersRequestQueryParams = Partial<{
  groupId: TReminderGroup["id"];
  state: TReminder["state"];
}>;

export type TGetRemindersResponsePayload = TDataResponsePayload<TReminder[]>;

export type TGetReminderRequestPathParams = TReminder["id"];

export type TGetReminderResponsePayload = TDataResponsePayload<TReminder>;

export type TCreateReminderRequestPayload = Pick<TReminder, "title"> & Partial<{ groupId: TReminderGroup["id"] }>;

export type TCreateReminderResponsePayload = TDataResponsePayload<TReminder>;

export type TUpdateReminderRequestPayload = Pick<TReminder, "id"> &
  Partial<
    Pick<
      TReminder,
      | "title"
      | "state"
      | "isPinned"
      | "dueDate"
      | "currentFocusSession"
      | "focusSessions"
      | "repeatTimes"
      | "repeatInterval"
    > & {
      groupId: TReminderGroup["id"];
    }
  >;

export type TUpdateReminderResponsePayload = TDataResponsePayload<TReminder>;

export type TDeleteReminderRequestPathParams = TReminder["id"];

export type TDeleteReminderResponsePayload = TMessageResponsePayload;

/**
 * Reminder Group
 */
export type TGetReminderGroupsResponsePayload = TDataResponsePayload<TReminderGroup[]>;

export type TGetReminderGroupRequestPathParams = TReminderGroup["id"];

export type TGetReminderGroupResponsePayload = TDataResponsePayload<TReminderGroup>;

export type TCreateReminderGroupRequestPayload = Pick<TReminderGroup, "name">;

export type TCreateReminderGroupResponsePayload = TDataResponsePayload<TReminderGroup>;

export type TUpdateReminderGroupRequestPayload = Pick<TReminderGroup, "id"> & Partial<Pick<TReminderGroup, "name">>;

export type TUpdateReminderGroupResponsePayload = TDataResponsePayload<TReminderGroup>;

export type TDeleteReminderGroupRequestPathParams = TReminderGroup["id"];

export type TDeleteReminderGroupResponsePayload = TMessageResponsePayload;
