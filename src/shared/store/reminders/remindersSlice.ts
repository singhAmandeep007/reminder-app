import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  TReminder,
  TReminderGroup,
  TGetRemindersQueryParams,
  TGetRemindersResponsePayload,
  TGetReminderGroupsResponsePayload,
  TCreateReminderResponsePayload,
  TCreateReminderRequestPayload,
  TUpdateReminderRequestPayload,
  TDeleteReminderRequestPayload,
  TDeleteReminderResponsePayload,
} from "types";

import { appendQueryParams } from "shared/utils/url";

import { apiSlice } from "../apiSlice";

export const remindersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReminders: builder.query<TReminder[], TGetRemindersQueryParams>({
      query: (queryParams) => {
        return appendQueryParams("/reminders", queryParams);
      },
      transformResponse: (response: TGetRemindersResponsePayload) => response.data,
      providesTags: ["Reminders"],
    }),
    getReminderGroups: builder.query<TReminderGroup[], void>({
      query: () => "/reminder-groups",
      transformResponse: (response: TGetReminderGroupsResponsePayload) => response.data,
      providesTags: ["ReminderGroups"],
    }),
    createReminder: builder.mutation<TReminder, TCreateReminderRequestPayload>({
      query: (body) => ({
        url: "/reminders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reminders"],
      transformResponse: (response: TCreateReminderResponsePayload) => response.data,
    }),
    updateReminder: builder.mutation<TReminder, TUpdateReminderRequestPayload>({
      query: ({ id, ...body }) => ({
        url: `/reminders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Reminders"],
      transformResponse: (response: TCreateReminderResponsePayload) => response.data,
    }),
    deleteReminder: builder.mutation<TDeleteReminderResponsePayload, TDeleteReminderRequestPayload>({
      query: (id) => ({
        url: `/reminders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reminders"],
    }),
  }),
});

export const selectReminderGroups = () => remindersApiSlice.endpoints.getReminderGroups.select();

const initialRemindersSliceState = {
  queryParams: {
    groupId: undefined,
    state: undefined,
  } as TGetRemindersQueryParams,
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState: initialRemindersSliceState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<TGetRemindersQueryParams>) => {
      state.queryParams = action.payload;
    },
  },
  selectors: {
    selectQueryParams: (state) => state.queryParams,
  },
});

export const { setQueryParams } = remindersSlice.actions;
export const { selectQueryParams } = remindersSlice.selectors;
