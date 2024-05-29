import { LayoutElements } from "./Layout";

export class RemindersElements extends LayoutElements {
  get root() {
    return this.content.findByTestId("reminders");
  }
}

export const remindersElements = new RemindersElements();
