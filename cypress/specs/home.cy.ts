import { homeElements, layoutElements, remindersElements } from "../pages";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.url().should("include", "/");
  });

  it("should render home page content and navigate to reminders page", () => {
    homeElements.root.should("exist");

    homeElements.root.findByRole("heading", { name: "A production grade reminder app" }).should("exist");

    homeElements.root.findByRole("heading", { name: "Tech Stack", level: 2 }).should("exist");

    homeElements.root.findByRole("heading", { name: "Folder Structure", level: 2 }).should("exist");

    layoutElements.footer.contains("Copyright © 2024Amandeep Singh").should("exist");

    layoutElements.footer
      .findByRole("link", { name: "Amandeep Singh" })
      .should("have.attr", "href")
      .and("include", "https://github.com/singhAmandeep007");

    layoutElements.header.findByRole("link", { name: "Reminders" }).click();

    remindersElements.root.should("exist");

    homeElements.root.should("not.exist");
  });

  it("should be able to change theme and language", () => {
    layoutElements.themeToggler.click();

    cy.document().its("documentElement").should("have.class", "light");

    layoutElements.themeToggler.click();

    cy.document().its("documentElement").should("have.class", "dark");

    layoutElements.langToggler.click();

    layoutElements.langTogglerMenu.findByRole("menuitem", { name: "English" }).click();

    cy.document().its("documentElement").should("have.attr", "lang", "en-US");

    layoutElements.langTogglerMenu.findByRole("menuitem", { name: "Japanese" }).click();

    cy.document().its("documentElement").should("have.attr", "lang", "ja-JP");

    homeElements.root.findByRole("heading", { name: "プロダクショングレードのリマインダーアプリ" }).should("exist");
  });
});
