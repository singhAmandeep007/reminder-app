import { type Locator, type Page } from "@playwright/test";

import { LayoutElements } from "./Layout";

export class HomeElements extends LayoutElements {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.root = page.getByTestId("home-page");
  }

  async goto() {
    await this.page.goto("/");
  }
}
