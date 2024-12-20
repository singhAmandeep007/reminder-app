import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  TReminder,
  TGetRemindersRequestQueryParams,
  TGetRemindersResponsePayload,
  TCreateReminderResponsePayload,
  TCreateReminderRequestPayload,
  TUpdateReminderRequestPayload,
  TUpdateReminderResponsePayload,
  TDeleteReminderRequestPathParams,
  TDeleteReminderResponsePayload,
  TGetReminderRequestPathParams,
  TGetReminderResponsePayload,
} from "types";

import { appendQueryParams } from "utils";

import { apiSlice } from "../apiSlice";

export const remindersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReminders: builder.query<TReminder[], TGetRemindersRequestQueryParams>({
      query: (queryParams) => {
        return appendQueryParams("/reminders", queryParams);
      },
      transformResponse: (response: TGetRemindersResponsePayload) => response.data,
      providesTags: (result, error, query) =>
        result
          ? // successful query
            [...result.map(({ id }) => ({ type: "Reminders", id }) as const), { type: "Reminders", id: "LIST" }]
          : // an error occurred,
            [{ type: "Reminders", id: "LIST" }],
    }),
    getReminder: builder.query<TReminder, TGetReminderRequestPathParams>({
      query: (id) => `/reminders/${id}`,
      transformResponse: (response: TGetReminderResponsePayload) => response.data,
      // result, error, request payload
      providesTags: (result, error, id) => [{ type: "Reminders", id }],
    }),
    createReminder: builder.mutation<TReminder, TCreateReminderRequestPayload>({
      query: (body) => ({
        url: "/reminders",
        method: "POST",
        body,
      }),
      transformResponse: (response: TCreateReminderResponsePayload) => response.data,
      invalidatesTags: (result, error) => [{ type: "Reminders", id: "LIST" }],
    }),
    updateReminder: builder.mutation<TReminder, TUpdateReminderRequestPayload>({
      query: ({ id, ...body }) => ({
        url: `/reminders/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: TUpdateReminderResponsePayload) => response.data,
      // invalidates all queries that subscribe to this Reminders `id` only.
      // in this case, `getReminder` will be re-run. `getReminders` *might*  rerun, if this id was under its results.
      invalidatesTags: (response, error, { id }) => [{ type: "Reminders", id }],
    }),
    deleteReminder: builder.mutation<TDeleteReminderResponsePayload, TDeleteReminderRequestPathParams>({
      query: (id) => ({
        url: `/reminders/${id}`,
        method: "DELETE",
      }),
      // invalidates all queries that subscribe to this Reminders `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Reminders", id }],
    }),
  }),
});

const initialRemindersSliceState = {
  queryParams: {
    groupId: undefined,
    state: undefined,
  } as TGetRemindersRequestQueryParams,
};

export const remindersSlice = createSlice({
  name: "reminders",
  initialState: initialRemindersSliceState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<TGetRemindersRequestQueryParams>) => {
      state.queryParams = action.payload;
    },
  },
  selectors: {
    selectQueryParams: (state) => state.queryParams,
  },
});

export const { setQueryParams } = remindersSlice.actions;
export const { selectQueryParams } = remindersSlice.selectors;
