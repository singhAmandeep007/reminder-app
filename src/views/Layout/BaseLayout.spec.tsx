import { screen } from "@testing-library/react";

import { render } from "tests/utils";

import { BaseLayout } from "./BaseLayout";

describe("BaseLayout", () => {
  const setup = () => {
    return {
      result: render(<BaseLayout />),
    };
  };

  it("should render header, content and footer", () => {
    setup();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it.each(["Home", "Reminders"])("should render %s link", (link) => {
    setup();

    expect(screen.getByRole("link", { name: `${link}` })).toBeInTheDocument();
  });
});
