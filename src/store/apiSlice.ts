import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { i18n } from "modules/i18n";
import { urlPrefix } from "utils";

export const apiSlice = createApi({
  reducerPath: "api",
  // small wrapper around fetch that aims to simplify HTTP requests (like axios)
  baseQuery: fetchBaseQuery({
    baseUrl: urlPrefix("/"),
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", i18n.currentLanguage);
    },
    validateStatus: (response) => {
      return response.status >= 200 && response.status <= 299;
    },
  }),
  tagTypes: ["Reminders", "ReminderGroups"],
  endpoints: (builder) => ({}),
  // keepUnusedDataFor: 60, // time in seconds
});
