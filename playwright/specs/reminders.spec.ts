import { test, expect } from "../fixtures";

import { RemindersElements } from "../pages";

test.describe("Reminders Page", () => {
  test("should have title", async ({ page }) => {
    const remindersElements = new RemindersElements(page);
    await remindersElements.goto();

    await expect(remindersElements.page).toHaveTitle(/Reminder App/);
  });

  test("should render reminders page and able to create reminder group", async ({ page, mocker }) => {
    await mocker.start();

    const remindersElements = new RemindersElements(page);
    await remindersElements.goto();

    await expect(remindersElements.root).toBeVisible();

    remindersElements.createReminderGroup("Test Group");

    await expect(remindersElements.getReminderGroupItemByText("Test Group")).toBeVisible();
  });
});
