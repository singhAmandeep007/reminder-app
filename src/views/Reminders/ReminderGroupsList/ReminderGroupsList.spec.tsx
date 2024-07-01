import { screen, waitFor } from "@testing-library/react";

import { render, testServer, HttpResponse, http, db, buildScenarios, urlPrefix } from "tests/utils";

import { ReminderGroupsList } from "./ReminderGroupsList";

describe("ReminderGroupsList", () => {
  const setup = () => {
    const getAddListBtn = () => screen.getByRole("button", { name: "Add List" });

    buildScenarios(db).withReminders(5).withReminderGroups({ remindersPerGroup: 2 });

    return {
      result: render(<ReminderGroupsList />),
      getAddListBtn,
    };
  };

  it("should render reminder groups list", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("All")).toBeInTheDocument();
    });
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
});
