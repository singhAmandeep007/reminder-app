import { http, HttpResponse } from "msw";

import { urlPrefix } from "services/mocker/msw";

import { remindersElements } from "../pages";

describe("Reminders Page", () => {
  it("should render reminders page content", () => {
    cy.interceptRequest(
      http.get(
        urlPrefix("/reminders"),
        () => {
          return HttpResponse.json(null, { status: 500 });
        },
        {
          once: false,
        }
      )
    );

    cy.visit("/reminders");

    remindersElements.root.should("exist");
  });
});
