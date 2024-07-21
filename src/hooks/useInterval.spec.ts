import { expect, beforeEach, it, afterEach, describe, jest } from "@jest/globals";

import { renderHook } from "@testing-library/react";

import { useInterval, TUseIntervalProps } from "./useInterval";

function setup(
  { props: { callback = jest.fn(), delay = 2500 } }: { props: Partial<TUseIntervalProps> } = {
    props: {},
  }
) {
  const { result, rerender } = renderHook(({ callback, delay }) => useInterval(callback, delay), {
    initialProps: { callback, delay },
  });

  return {
    callback,
    delay,
    result,
    rerender,
  };
}

describe("useInterval", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should not call the callback initially when delay is null", () => {
    const { callback } = setup({
      props: {
        delay: null,
      },
    });

    expect(callback).not.toBeCalled();
  });

  it("should call the callback after the specified delay", () => {
    const { callback } = setup({
      props: {
        delay: 100,
      },
    });

    jest.advanceTimersByTime(200);

    expect(callback).toBeCalledTimes(2);
  });

  it("should pause the interval if delay=null", () => {
    const { callback, rerender } = setup({
      props: {
        delay: 2500,
      },
    });

    expect(callback).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(2);

    rerender({ callback, delay: null });

    jest.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should always call the latest callback", () => {
    const cb2 = jest.fn();

    const { callback: cb1, rerender } = setup({
      props: {
        delay: 2500,
      },
    });

    expect(cb1).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(2500);

    expect(cb1).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2500);

    expect(cb1).toHaveBeenCalledTimes(2);

    rerender({ callback: cb2, delay: 5000 });

    jest.advanceTimersByTime(5000);

    expect(cb1).toHaveBeenCalledTimes(2);
    expect(cb2).toHaveBeenCalledTimes(1);
  });
});
