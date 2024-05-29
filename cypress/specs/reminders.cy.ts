import { remindersElements } from "../pages";

describe("Reminders Page", () => {
  beforeEach(() => {
    cy.visit("/reminders");

    cy.url().should("include", "/reminders");
  });

  it("should render reminders page content", () => {
    remindersElements.root.should("exist");

    remindersElements.root.findByRole("heading", { name: "Reminders", level: 2 }).should("exist");
  });
});
