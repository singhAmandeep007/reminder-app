import { ThunkAction, Action } from "@reduxjs/toolkit";

import { TStore } from "./store";

export type TAppDispatch = TStore["dispatch"];
export type TRootState = ReturnType<TStore["getState"]>;
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>;
