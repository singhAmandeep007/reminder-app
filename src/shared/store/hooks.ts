import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { TAppDispatch, TRootState } from "./types";

/**
 * Custom typesafe hook to access the redux dispatch function.
 */
export const useAppDispatch: () => TAppDispatch = useDispatch;
/**
 * Custom typesafe hook to use selector to access redux store's state.
 */
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
