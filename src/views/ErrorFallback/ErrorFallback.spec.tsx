import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { render, mockLocation } from "tests/utils";

import { ErrorFallback, TErrorFallbackProps } from "./ErrorFallback";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}));

describe("ErrorFallback", () => {
  const setup = (props: TErrorFallbackProps & { error?: any } = {}) => {
    (useRouteError as jest.Mock).mockReturnValue(props.error);

    mockLocation({ href: "" });

    return {
      result: render(<ErrorFallback {...props} />),
    };
  };

  test("renders with default caption and content", () => {
    setup();

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();

    expect(screen.getByText("(Please click reload to load the app again!)")).toBeInTheDocument();
  });

  test("renders with custom caption", () => {
    setup({
      caption: "Custom Caption",
    });

    expect(screen.getByText("Custom Caption")).toBeInTheDocument();
  });

  test("displays Error instance message", () => {
    const errorMessage = "Test error message";
    setup({
      error: new Error(errorMessage),
    });

    expect(screen.getByText(`(${errorMessage})`)).toBeInTheDocument();
  });

  test("displays string error", () => {
    const errorMessage = "String error message";
    setup({
      error: new Error(errorMessage),
    });
    expect(screen.getByText(`(${errorMessage})`)).toBeInTheDocument();
  });

  test("display route error response", () => {
    const error = { status: 404, statusText: "Not Found" };

    (isRouteErrorResponse as any as jest.Mock).mockReturnValue(error);

    setup({
      error,
    });

    expect(screen.getByText("(404 Not Found)")).toBeInTheDocument();
  });

  test("reload button redirects to home page", async () => {
    setup();

    const reloadButton = screen.getByText("Reload App");

    await userEvent.click(reloadButton);

    expect(window.location.href).toBe("/");
  });
});
