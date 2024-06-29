import { screen } from "@testing-library/react";

import { render } from "tests/utils";

import { Home } from "./Home";

describe("Home", () => {
  it("should render correctly", () => {
    render(<Home />);

    expect(screen.getByText("A production grade reminder app")).toBeInTheDocument();
    expect(screen.getByText("Tech Stack")).toBeInTheDocument();
    expect(screen.getByText("Folder Structure")).toBeInTheDocument();
  });
});
