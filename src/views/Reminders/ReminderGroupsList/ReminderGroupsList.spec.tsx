import { screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { db, buildScenarios, urlPrefix } from "services/mocker/msw";

import { render, testServer, HttpResponse, http } from "tests/utils";

import { ReminderGroupsList } from "./ReminderGroupsList";

describe("ReminderGroupsList", () => {
  const setup = () => {
    const getAddListBtn = () => screen.getByRole("button", { name: "Add List" });
    const getSaveBtn = () => screen.getByTestId("reminder-group-item-create-save");
    const getCancelBtn = () => screen.getByTestId("reminder-group-item-create-cancel");
    const getTextInput = () => screen.getByTestId("reminder-group-item-create-text");

    return {
      result: render(<ReminderGroupsList />),
      getAddListBtn,
      getSaveBtn,
      getCancelBtn,
      getTextInput,
    };
  };

  it("should render reminder groups list", async () => {
    buildScenarios(db)
      .withReminders(5)
      .withReminderGroups({ reminderGroups: ["Work", "Home", "Personal"], remindersPerGroup: 2 });

    setup();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("should handle negative scenario for fetching reminder groups", async () => {
    testServer.use(
      http.get(urlPrefix("/reminder-groups"), () => {
        return HttpResponse.json({ message: "Error" }, { status: 404 });
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

  it("should handle negative scenario for adding reminder group", async () => {
    testServer.use(
      http.post(urlPrefix("/reminder-groups"), () => {
        return HttpResponse.json({ message: "Error" }, { status: 404 });
      })
    );

    const { getAddListBtn, getTextInput, getSaveBtn } = setup();

    await userEvent.click(getAddListBtn());

    await waitFor(() => {
      expect(getTextInput()).toBeInTheDocument();
    });

    await userEvent.type(getTextInput(), "New Reminder Group");

    await userEvent.click(getSaveBtn());

    await waitFor(() => {
      expect(screen.getByText("Error creating reminder group")).toBeInTheDocument();
    });
  });
});
