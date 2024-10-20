import {
  TReminderGroup,
  TGetReminderGroupsResponsePayload,
  TGetReminderGroupRequestPathParams,
  TGetReminderGroupResponsePayload,
  TCreateReminderGroupRequestPayload,
  TCreateReminderGroupResponsePayload,
  TUpdateReminderGroupRequestPayload,
  TUpdateReminderGroupResponsePayload,
  TDeleteReminderGroupRequestPathParams,
  TDeleteReminderGroupResponsePayload,
} from "types";

import { apiSlice } from "../apiSlice";

import { TRootState } from "../types";

import { setQueryParams } from "./remindersSlice";

export const reminderGroupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReminderGroups: builder.query<TReminderGroup[], void>({
      query: () => "/reminder-groups",
      transformResponse: (response: TGetReminderGroupsResponsePayload) => response.data,
      providesTags: (result) =>
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "ReminderGroups", id }) as const),
              { type: "ReminderGroups", id: "LIST" },
            ]
          : // an error occurred,
            [{ type: "ReminderGroups", id: "LIST" }],
    }),
    getReminderGroup: builder.query<TReminderGroup, TGetReminderGroupRequestPathParams>({
      query: (id) => `/reminder-groups/${id}`,
      transformResponse: (response: TGetReminderGroupResponsePayload) => response.data,
      providesTags: (result, error, id) => [{ type: "ReminderGroups", id }],
    }),
    deleteReminderGroup: builder.mutation<TDeleteReminderGroupResponsePayload, TDeleteReminderGroupRequestPathParams>({
      query: (id) => ({
        url: `/reminder-groups/${id}`,
        method: "DELETE",
      }),
      // causes a re-fetch of the list of reminder groups and reminders
      invalidatesTags: (result, error, id) => [
        { type: "ReminderGroups", id: "LIST" },
        { type: "Reminders", id: "LIST" },
      ],
      onQueryStarted(id, { dispatch, getState }) {
        const selectedGroupId = (getState() as TRootState)["reminders"]["queryParams"]["groupId"];
        // if the reminder group which is being deleted is equal to current selected reminder group, unset the selected reminder group in store
        if (selectedGroupId === id) {
          dispatch(setQueryParams({ groupId: undefined }));
        }
      },
    }),
    updateReminderGroup: builder.mutation<TReminderGroup, TUpdateReminderGroupRequestPayload>({
      query: ({ id, ...body }) => ({
        url: `/reminder-groups/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: TUpdateReminderGroupResponsePayload) => response.data,
      invalidatesTags: (response, error, { id }) => [{ type: "ReminderGroups", id }],
    }),
    createReminderGroup: builder.mutation<TReminderGroup, TCreateReminderGroupRequestPayload>({
      query: (body) => ({
        url: "/reminder-groups",
        method: "POST",
        body,
      }),
      transformResponse: (response: TCreateReminderGroupResponsePayload) => response.data,
      invalidatesTags: [{ type: "ReminderGroups", id: "LIST" }],
    }),
  }),
});

export const selectReminderGroups = () => reminderGroupsApiSlice.endpoints.getReminderGroups.select();
