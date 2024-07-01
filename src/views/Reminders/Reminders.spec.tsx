import { screen } from "@testing-library/react";

import { render } from "tests/utils";

import { Reminders } from "./Reminders";

import { RemindersList } from "./RemindersList";

import { ReminderGroupsList } from "./ReminderGroupsList";

jest.mock("./RemindersList");

jest.mock("./ReminderGroupsList");

describe("Reminders", () => {
  const setup = () => {
    (RemindersList as jest.Mock).mockReturnValue(<div data-testid="remindersList" />);
    (ReminderGroupsList as jest.Mock).mockReturnValue(<div data-testid="reminderGroupsList" />);

    return {
      result: render(<Reminders />),
    };
  };

  it("should render Reminders Component", () => {
    setup();

    expect(screen.getByRole("heading", { name: "Reminders", level: 2 })).toBeVisible();

    expect(screen.getByTestId("remindersList")).toBeInTheDocument();

    expect(screen.getByTestId("reminderGroupsList")).toBeInTheDocument();
  });
});
