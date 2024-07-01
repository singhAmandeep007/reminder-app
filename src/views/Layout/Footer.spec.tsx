import { screen } from "@testing-library/react";

import { render } from "tests/utils";

import { Footer } from "./Footer";

describe("Footer", () => {
  const setup = () => {
    return {
      result: render(<Footer />),
    };
  };

  it("should render footer", () => {
    setup();

    expect(screen.getByTestId("footer")).toBeInTheDocument();

    expect(screen.getByText("Amandeep Singh")).toBeInTheDocument();
  });
});
