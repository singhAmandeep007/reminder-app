import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { selectQueryParams, selectReminderGroups, remindersApiSlice } from "./reminders";

import { TAppDispatch, TRootState } from "./types";

/**
 * Custom typesafe hook to access the redux dispatch function.
 */
export const useAppDispatch: () => TAppDispatch = useDispatch;
/**
 * Custom typesafe hook to use selector to access redux store's state.
 */
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useSelectQueryParams = () => useAppSelector(selectQueryParams);

export const useSelectReminderGroups = () => useAppSelector(selectReminderGroups());

export const {
  useGetRemindersQuery,
  useCreateReminderMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
  useGetReminderGroupsQuery,
} = remindersApiSlice;
