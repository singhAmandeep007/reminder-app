import { screen, waitFor } from "@testing-library/react";

import { Response } from "miragejs";
import userEvent from "@testing-library/user-event";

import { urlPrefix } from "shared";

import { buildScenarios } from "services/mocker/mirage";

import { render, TRenderProps, createTestMirageServer } from "tests/utils";

import { RemindersList } from "./RemindersList";

const testMirageServer = createTestMirageServer();

describe("RemindersList", () => {
  const setup = (setupProps: { config?: TRenderProps["config"] } = {}) => {
    const getAddItemBtn = () => screen.getByTestId("reminder-create-btn");
    const getSaveBtn = () => screen.getByTestId("reminder-item-create-save");
    const getCancelBtn = () => screen.getByTestId("reminder-item-create-cancel");
    const getTextInput = () => screen.getByTestId("reminder-item-create-text");

    return {
      result: render(<RemindersList />, {
        ...(setupProps?.config ? { config: setupProps?.config } : {}),
      }),
      getAddItemBtn,
      getSaveBtn,
      getCancelBtn,
      getTextInput,
    };
  };

  it("should render reminders list", async () => {
    buildScenarios(testMirageServer).withReminders(5);

    setup();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeInTheDocument();
    });

    await waitFor(() => {
      return expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });
  });

  it("should handle negative scenario for fetching reminders", async () => {
    testMirageServer.get(urlPrefix("/reminders"), () => new Response(404));

    setup();

    await waitFor(() => {
      expect(screen.getByText("Error fetching reminders")).toBeInTheDocument();
    });
  });

  it("should handle positive scenario for reminders and negative scenario for fetching reminder group", async () => {
    const reminderGroup = testMirageServer.create("reminderGroup", { name: "Group 1" });
    testMirageServer.createList("reminder", 5, { group: reminderGroup });

    const groupId = reminderGroup.id;
    const config = {
      preloadedState: {
        reminders: {
          queryParams: {
            groupId,
          },
        },
      },
      withStore: true,
      withToaster: true,
    };

    testMirageServer.get(urlPrefix(`/reminder-groups/${groupId}`), () => new Response(500));

    setup({ config });

    await waitFor(() => {
      return expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });

    await waitFor(() => {
      expect(screen.getByText("Error fetching reminder group")).toBeInTheDocument();
    });
  });

  it("should be able to add a reminder", async () => {
    const { getAddItemBtn, getSaveBtn, getTextInput } = setup();

    await userEvent.click(getAddItemBtn());

    await waitFor(() => {
      expect(getTextInput()).toBeInTheDocument();
    });

    await userEvent.type(getTextInput(), "New reminder");

    await userEvent.click(getSaveBtn());

    await waitFor(() => {
      expect(screen.getByText("New reminder")).toBeInTheDocument();
    });
  });

  it("should handle negative scenario for adding a reminder", async () => {
    testMirageServer.post(urlPrefix(`/reminders`), () => new Response(500));

    const { getAddItemBtn, getSaveBtn, getTextInput } = setup();

    await userEvent.click(getAddItemBtn());

    await waitFor(() => {
      expect(getTextInput()).toBeInTheDocument();
    });

    await userEvent.type(getTextInput(), "New reminder");

    await userEvent.click(getSaveBtn());

    await waitFor(() => {
      expect(screen.getByText("Error creating reminder")).toBeInTheDocument();
    });
  });
});
