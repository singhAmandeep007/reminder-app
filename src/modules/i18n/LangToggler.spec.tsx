import { screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { render } from "tests/utils";

import { LangToggler } from "./LangToggler";

let changeLanguageSpy: jest.SpyInstance;

jest.mock("react-i18next", () => ({
  // preserve the original module
  ...jest.requireActual("react-i18next"),
  // mock useTranslation
  useTranslation: () => {
    // get the original module
    const originalModule = jest.requireActual("react-i18next");
    // return the original t and i18n function
    const { t, i18n } = originalModule.useTranslation("common", { keyPrefix: "lang" });

    // spy on changeLanguage method to check if it's called
    changeLanguageSpy = jest.spyOn(i18n, "changeLanguage");

    return { t, i18n };
  },
}));

describe("LangToggler", () => {
  it("opens the dropdown menu when clicked and shows language options", async () => {
    render(<LangToggler />);

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      return expect(screen.getByTestId("lang-toggler-menu")).toBeInTheDocument();
    });

    expect(screen.getByText("English")).toBeInTheDocument();

    expect(screen.getByText("Japanese")).toBeInTheDocument();
  });

  it("changes language when a language option is clicked", async () => {
    render(<LangToggler />);

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      expect(screen.getByTestId("lang-toggler-menu")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Japanese"));

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("ja-JP");
    });

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      expect(screen.getByText("Japanese")).toHaveClass("text-primary");
    });
  });

  it("closes the dropdown when clicking outside", async () => {
    render(<LangToggler />);

    await userEvent.click(screen.getByTestId("lang-toggler"));

    await waitFor(() => {
      expect(screen.getByTestId("lang-toggler-menu")).toBeInTheDocument();
    });

    // READ-MORE: https://github.com/testing-library/user-event/issues/662
    await userEvent.click(document.body, { pointerEventsCheck: 0 });

    await waitFor(() => {
      expect(screen.queryByTestId("lang-toggler-menu")).not.toBeInTheDocument();
    });
  });
});
