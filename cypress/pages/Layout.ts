export class LayoutElements {
  get header() {
    return cy.findByTestId("header");
  }

  get footer() {
    return cy.findByTestId("footer");
  }

  get content() {
    return cy.findByTestId("content");
  }

  get themeToggler() {
    return this.header.findByTestId("theme-toggler");
  }

  get langToggler() {
    return this.header.findByTestId("lang-toggler");
  }

  get langTogglerMenu() {
    return cy.findByTestId("lang-toggler-menu");
  }
}
