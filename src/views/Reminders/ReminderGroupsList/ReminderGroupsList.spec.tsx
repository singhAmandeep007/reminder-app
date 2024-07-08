import { screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { db, buildScenarios } from "services/mocker/msw";

import { urlPrefix } from "shared";

import { render, createTestMswServer, HttpResponse, http } from "tests/utils";

import { ReminderGroupsList } from "./ReminderGroupsList";

const testMswServer = createTestMswServer();

describe("ReminderGroupsList", () => {
  const setup = () => {
    const getAddListBtn = () => screen.getByTestId("reminder-group-create-btn");
    const getSaveBtn = () => screen.getByTestId("reminder-group-create-save");
    const getCancelBtn = () => screen.getByTestId("reminder-group-create-cancel");
    const getTextInput = () => screen.getByTestId("reminder-group-create-text");

    return {
      result: render(<ReminderGroupsList />),
      getAddListBtn,
      getSaveBtn,
      getCancelBtn,
      getTextInput,
    };
  };

  it("should render reminder groups list", async () => {
    buildScenarios(db).withReminderGroups({ reminderGroups: ["Work", "Home", "Personal"], remindersPerGroup: 0 });

    setup();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });
  });

  it("should handle negative scenario for fetching reminder groups", async () => {
    testMswServer.use(
      http.get(urlPrefix("/reminder-groups"), () => {
        return HttpResponse.json({ message: "Error" }, { status: 500 });
      })
    );

    setup();

    await waitFor(() => {
      expect(screen.getByText("Error fetching reminder groups")).toBeInTheDocument();
    });
  });

  it("should be able to add reminder group", async () => {
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
    testMswServer.use(
      http.post(urlPrefix("/reminder-groups"), () => {
        return HttpResponse.json({ message: "Error" }, { status: 500 });
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
