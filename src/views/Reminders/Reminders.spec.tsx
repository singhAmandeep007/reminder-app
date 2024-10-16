import { screen } from "@testing-library/react";

import { render } from "tests/utils";

import { Reminders } from "./Reminders";

import { RemindersList } from "./RemindersList";

import { ReminderGroupsList } from "./ReminderGroupsList";

jest.mock("./RemindersList");

jest.mock("./ReminderGroupsList");

describe("Reminders", () => {
  const setup = () => {
    (RemindersList as jest.Mock).mockReturnValue(<div data-testid="reminders-list" />);
    (ReminderGroupsList as jest.Mock).mockReturnValue(<div data-testid="reminder-groups-list" />);

    return {
      result: render(<Reminders />),
    };
  };

  it("should render Reminders Component", () => {
    setup();

    expect(screen.getByTestId("reminders-list")).toBeInTheDocument();

    expect(screen.getByTestId("reminder-groups-list")).toBeInTheDocument();
  });
});
