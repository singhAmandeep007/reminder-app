import { render, screen } from "@testing-library/react";

import { Typography } from "./Typography";

describe("Typography", () => {
  it("renders the component with the correct variant and affects", () => {
    render(
      <Typography
        variant="h1"
        affects="default"
      >
        Hello World
      </Typography>
    );

    const typography = screen.getByRole("heading", { level: 1, name: "Hello World" });
    expect(typography.tagName).toBe("H1");
  });

  it("applies the provided className to the component", () => {
    render(<Typography className="custom-class">Hello World</Typography>);

    const typography = screen.getByText("Hello World");
    expect(typography).toHaveClass("custom-class");
  });
});
