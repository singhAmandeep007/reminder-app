import { format } from "date-fns";

import { Response as MirageResponse } from "miragejs";

import { urlPrefix } from "shared";

import { buildScenarios, runServer, TServer } from "services/mocker/mirage";
import { MOCKER_TYPE } from "services/mocker";

import { remindersElements } from "../pages";

describe("Reminders Page", () => {
  before(function () {
    cy.skipIf(Cypress.env("REACT_APP_MOCKER") !== MOCKER_TYPE.mirage, this);
    cy.setupMirageApiProxy();
  });

  let server: TServer;

  beforeEach(() => {
    server = runServer({ logging: true });
  });

  afterEach(() => {
    server.shutdown();
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

    remindersElements.reminderDialog.findByRole("gridcell", { name: dueDate.getDate().toString() }).click();

    remindersElements.reminderDueDateTimeInput.type(format(dueDate, "HH:mm"));

    remindersElements.saveReminderDueDateBtn.click();

    remindersElements.getReminderItemByText(reminderTitle).should("not.contain", "Reminder group title");

    remindersElements.getReminderItemByText(reminderTitle).contains(format(dueDate, "MMM d, yyyy, h:mm a"));
  });

  it("should be able handle negative case when creating a reminder", () => {
    buildScenarios(server)
      .withReminders(5)
      .withReminderGroups({ reminderGroups: ["Personal"], remindersPerGroup: 2 });

    cy.visit("/reminders");

    remindersElements.root.should("exist");

    remindersElements.getReminderGroupItemByText("Personal").findByText("Personal").click();

    remindersElements.createReminder("Learn Cypress");

    server.post(urlPrefix("/reminders"), () => {
      return new MirageResponse(500, {});
    });

    cy.contains("Error creating reminder");

    cy.resetMirageApiHandlers(server);

    remindersElements.createReminder("Learn Cypress");

    remindersElements.getReminderItemByText("Learn Cypress").should("exist");
  });
});
