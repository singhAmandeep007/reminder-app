import { screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { render, testServer, HttpResponse, http, db, buildScenarios, urlPrefix } from "tests/utils";

import { ReminderGroupsList } from "./ReminderGroupsList";

describe("ReminderGroupsList", () => {
  const setup = () => {
    const getAddListBtn = () => screen.getByRole("button", { name: "Add List" });
    const getSaveBtn = () => screen.getByTestId("reminder-group-item-create-save");
    const getCancelBtn = () => screen.getByTestId("reminder-group-item-create-cancel");
    const getTextInput = () => screen.getByTestId("reminder-group-item-create-text");

    buildScenarios(db)
      .withReminders(5)
      .withReminderGroups({ reminderGroups: ["Work", "Home", "Personal"], remindersPerGroup: 2 });

    return {
      result: render(<ReminderGroupsList />),
      getAddListBtn,
      getSaveBtn,
      getCancelBtn,
      getTextInput,
    };
  };

  it("should render reminder groups list", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("should render toast on error", async () => {
    testServer.use(
      http.get(urlPrefix("/reminder-groups"), () => {
        return HttpResponse.json({ message: "Error fetching reminder groups" }, { status: 404 });
      })
    );

    setup();

    await waitFor(() => {
      expect(screen.getByText("Error fetching reminder groups")).toBeInTheDocument();
    });
  });

  it("should add reminder group", async () => {
    const { getAddListBtn, getTextInput, getSaveBtn } = setup();

    await userEvent.click(getAddListBtn());

    await waitFor(() => {
      expect(getTextInput()).toBeInTheDocument();
    });

    await userEvent.type(getTextInput(), "New Reminder Group");

    await userEvent.click(getSaveBtn());

    await waitFor(() => {
      expect(screen.getByText("New Reminder Group")).toBeInTheDocument();
    });
  });
});
