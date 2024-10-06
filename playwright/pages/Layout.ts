import { type Page } from "@playwright/test";

export class LayoutElements {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return this.page.getByTestId("header");
  }

  get footer() {
    return this.page.getByTestId("footer");
  }

  get content() {
    return this.page.getByTestId("content");
  }

  get themeToggler() {
    return this.header.getByTestId("theme-toggler");
  }

  get langToggler() {
    return this.header.getByTestId("lang-toggler");
  }

  get langTogglerMenu() {
    return this.page.getByTestId("lang-toggler-menu");
  }
}
