import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  TReminder,
  TRemindersGroup,
  TGetRemindersQueryParams,
  TGetRemindersResponsePayload,
  TGetRemindersGroupsResponsePayload,
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
    getRemindersGroups: builder.query<TRemindersGroup[], void>({
      query: () => "/remindersGroups",
      transformResponse: (response: TGetRemindersGroupsResponsePayload) => response.data,
      providesTags: ["RemindersGroups"],
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

export const {
  useGetRemindersQuery,
  useCreateReminderMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
  useGetRemindersGroupsQuery,
} = remindersApiSlice;

export const selectRemindersGroups = () => remindersApiSlice.endpoints.getRemindersGroups.select();

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
