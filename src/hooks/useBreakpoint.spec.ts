import { useMediaQuery } from "react-responsive";

import { renderHook } from "tests/utils";

import { useBreakpoint } from "./useBreakpoint";

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

const mockedUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

describe("useBreakpoint", () => {
  const BREAKPOINTS = {
    sm: "576px",
    md: "768px",
    lg: "992px",
  };

  beforeEach(() => {
    mockedUseMediaQuery.mockReset();
  });

  it('should return correct values for "sm" breakpoint when below', () => {
    mockedUseMediaQuery.mockReturnValue(true);

    const { result } = renderHook(() => useBreakpoint("sm", BREAKPOINTS));

    expect(result.current).toEqual({
      sm: 576,
      isAboveSm: false,
      isBelowSm: true,
    });
  });

  it('should return correct values for "sm" breakpoint when above', () => {
    mockedUseMediaQuery.mockReturnValue(false);

    const { result } = renderHook(() => useBreakpoint("sm", BREAKPOINTS));

    expect(result.current).toEqual({
      sm: 576,
      isAboveSm: true,
      isBelowSm: false,
    });
  });

  it("should call useMediaQuery with correct query", () => {
    renderHook(() => useBreakpoint("lg", BREAKPOINTS));

    expect(mockedUseMediaQuery).toHaveBeenCalledWith({
      query: "(max-width: 992px)",
    });
  });
});
