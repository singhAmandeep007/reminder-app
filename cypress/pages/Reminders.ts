import { LayoutElements } from "./Layout";

export class RemindersElements extends LayoutElements {
  get root() {
    return this.content.findByTestId("reminders");
  }

  getReminderGroupItemByText(text: string) {
    return this.root.findByTestId(`reminder-group-item-${text}`).closest("li");
  }

  getReminderGroupMenuBtnByText(text: string) {
    return this.getReminderGroupItemByText(text).findByTestId("reminder-group-item-menu-btn");
  }

  get reminderGroupItemMenu() {
    return cy.findByTestId("reminder-group-item-menu");
  }

  get createReminderGroupBtn() {
    return this.root.findByTestId("reminder-group-create-btn");
  }

  get reminderGroupCreateSaveBtn() {
    return this.root.findByTestId("reminder-group-create-save");
  }

  get reminderGroupCreateCancelBtn() {
    return this.root.findByTestId("reminder-group-create-cancel");
  }

  get reminderGroupCreateTextInput() {
    return this.root.findByTestId("reminder-group-create-text");
  }

  createReminderGroup(text: string) {
    this.createReminderGroupBtn.click();

    this.reminderGroupCreateTextInput.type(text);

    this.reminderGroupCreateSaveBtn.click({ force: true });
  }

  get reminderListTitle() {
    return this.root.findByTestId("reminder-list-title");
  }
  get createReminderBtn() {
    return this.root.findByTestId("reminder-create-btn");
  }

  get reminderCreateSaveBtn() {
    return this.root.findByTestId("reminder-item-create-save");
  }

  get reminderCreateCancelBtn() {
    return this.root.findByTestId("reminder-item-create-cancel");
  }

  get reminderRefetchBtn() {
    return this.root.findByTestId("reminder-refetch-btn");
  }

  get reminderCreateTextInput() {
    return this.root.findByTestId("reminder-item-create-text");
  }

  createReminder(text: string) {
    this.createReminderBtn.click();

    this.reminderCreateTextInput.type(text);

    this.reminderCreateSaveBtn.click({ force: true });
  }

  getReminderItemByText(text: string) {
    return this.root.findByTestId(`reminder-item-${text}`).closest("li");
  }

  getReminderMenuBtnByText(text: string) {
    return this.getReminderItemByText(text).findByTestId("reminder-item-menu-btn");
  }

  get reminderItemMenu() {
    return cy.findByTestId("reminder-item-menu");
  }

  get deleteReminderMenuItem() {
    return this.reminderItemMenu.findByTestId("reminder-item-menuitem-delete");
  }

  get editReminderMenuItem() {
    return this.reminderItemMenu.findByTestId("reminder-item-menuitem-edit");
  }

  get reminderDueDateMenuItem() {
    return this.reminderItemMenu.findByTestId("reminder-item-menuitem-due-date");
  }

  get pinReminderMenuItem() {
    return this.reminderItemMenu.findByTestId("reminder-item-menuitem-pin");
  }

  get saveReminderDueDateBtn() {
    return cy.findByTestId("reminder-item-save-due-date-btn");
  }

  get reminderDueDateDialog() {
    return cy.findByTestId("reminder-item-due-date-dialog");
  }

  get reminderDueDateTimeInput() {
    return this.reminderDueDateDialog.findByTestId("select-time-input");
  }
}

export const remindersElements = new RemindersElements();
