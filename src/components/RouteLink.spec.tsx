import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { RouteLink } from "./RouteLink";

describe("RouteLink", () => {
  it("renders the link with the correct data-testid, provided className and children", () => {
    render(
      <MemoryRouter>
        <RouteLink
          to="/home"
          className="custom-class"
        >
          <span>Home</span>
        </RouteLink>
      </MemoryRouter>
    );

    const link = screen.getByTestId("route-link-/home");
    expect(link).toHaveClass("custom-class");

    expect(link).toContainHTML("<span>Home</span>");
  });
});
