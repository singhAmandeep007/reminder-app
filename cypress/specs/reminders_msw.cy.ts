import { http, HttpResponse } from "msw";
import { format } from "date-fns";

import { urlPrefix } from "shared";

import { buildScenarios } from "services/mocker/msw";
import { MOCKER_TYPE } from "services/mocker";

import { remindersElements } from "../pages";

describe("Reminders Page", () => {
  before(function () {
    cy.skipIf(Cypress.env("REACT_APP_MOCKER") !== MOCKER_TYPE.msw, this);
  });

  it("should be able to create a reminder under a reminder group and add a due date", () => {
    const reminderTitle = "Learn Cypress";

    cy.visit("/reminders");

    remindersElements.root.should("exist");

    remindersElements.createReminderGroup("Reminder group title");

    remindersElements.root.findByText("Reminder group title").click();

    remindersElements.reminderListTitle.should("have.text", "Reminder group title");

    remindersElements.createReminder(reminderTitle);

    remindersElements.getReminderItemByText(reminderTitle).should("exist");

    remindersElements.getReminderMenuBtnByText(reminderTitle).click();

    remindersElements.reminderDueDateMenuItem.click();

    const dueDate = new Date();

    remindersElements.reminderDueDateDialog.findByRole("gridcell", { name: dueDate.getDate().toString() }).click();

    remindersElements.reminderDueDateTimeInput.type(format(dueDate, "HH:mm"));

    remindersElements.saveReminderDueDateBtn.click();

    remindersElements.getReminderItemByText(reminderTitle).should("not.contain", "Reminder group title");

    remindersElements.getReminderItemByText(reminderTitle).contains(format(dueDate, "MMM d, yyyy, h:mm a"));
  });

  it("should handle negative scenario for create reminder", () => {
    cy.interceptMswRequest(
      http.post(
        urlPrefix("/reminders"),
        () => {
          return HttpResponse.json(null, { status: 500 });
        },
        { once: true }
      )
    );

    cy.getMswDb().then((db) => {
      buildScenarios(db)
        .withReminders(5)
        .withReminderGroups({ reminderGroups: ["Personal"], remindersPerGroup: 2 });
    });

    cy.visit("/reminders");

    remindersElements.root.should("exist");

    remindersElements.getReminderGroupItemByText("Personal").findByText("Personal").click();

    remindersElements.createReminder("Learn Cypress");

    cy.contains("Error creating reminder");

    remindersElements.createReminder("Learn Cypress");

    remindersElements.getReminderItemByText("Learn Cypress").should("exist");
  });
});
