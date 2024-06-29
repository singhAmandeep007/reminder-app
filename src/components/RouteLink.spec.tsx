import { screen } from "@testing-library/react";

import { render } from "tests/utils";

import { RouteLink } from "./RouteLink";

describe("RouteLink", () => {
  it("renders the link with the correct data-testid, provided className and children", () => {
    render(
      <RouteLink
        to="/home"
        className="custom-class"
      >
        <span>Home</span>
      </RouteLink>
    );

    const link = screen.getByTestId("route-link-/home");
    expect(link).toHaveClass("custom-class");

    expect(link).toContainHTML("<span>Home</span>");
  });
});
