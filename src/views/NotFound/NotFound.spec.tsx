import { screen } from "@testing-library/react";

import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { ROUTE_BY_PATH } from "app/Router";

import { render } from "tests/utils";

import { NotFound } from "./NotFound";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NotFound", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("should render correctly", () => {
    render(<NotFound />);

    expect(screen.getByText("Not found - Page doesn't exist")).toBeInTheDocument();
  });

  it("should render home link", async () => {
    render(<NotFound />);

    const homeBtn = screen.getByRole("button", { name: "Home" });

    await userEvent.click(homeBtn);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTE_BY_PATH.home, { replace: true });
  });
});
