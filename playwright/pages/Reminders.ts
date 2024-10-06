import { type Locator, type Page } from "@playwright/test";

import { LayoutElements } from "./Layout";

export class RemindersElements extends LayoutElements {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.root = page.getByTestId("reminders");
  }

  async goto() {
    await this.page.goto("/reminders");
  }

  getReminderGroupItemByText(text: string) {
    return this.root.getByTestId(`reminder-group-item-${text}`).getByText(text);
  }

  getReminderGroupMenuBtnByText(text: string) {
    return this.root.getByTestId(`reminder-group-item-${text}`).getByTestId("reminder-group-item-menu-btn");
  }

  get reminderGroupItemMenu() {
    return this.page.getByTestId("reminder-group-item-menu");
  }

  get createReminderGroupBtn() {
    return this.root.getByTestId("reminder-group-create-btn");
  }

  get reminderGroupCreateSaveBtn() {
    return this.root.getByTestId("reminder-group-create-save");
  }

  get reminderGroupCreateCancelBtn() {
    return this.root.getByTestId("reminder-group-create-cancel");
  }

  get reminderGroupCreateTextInput() {
    return this.page.getByTestId("reminder-group-create-text");
  }

  createReminderGroup(text: string) {
    this.createReminderGroupBtn.click();

    this.reminderGroupCreateTextInput.fill(text);

    this.reminderGroupCreateSaveBtn.click();
  }

  getEditReminderGroupMenuItem(text: string) {
    return this.reminderGroupItemMenu.getByTestId(`reminder-group-item-update-${text}`);
  }
}
