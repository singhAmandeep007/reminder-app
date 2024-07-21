import { jest, expect, beforeEach, it, afterEach, describe } from "@jest/globals";

import { renderHook, act, waitFor } from "@testing-library/react";

import { useTimer, TUseTimerProps } from "./useTimer";

function setup(
  { props }: { props: Partial<TUseTimerProps> } = {
    props: {},
  }
) {
  const config = {
    autoStart: true,
    interval: 1000,
    ...props.config,
    onTick: jest.fn(),
    onFinish: jest.fn(),
    onStart: jest.fn(),
  };

  const totalTicks = props.totalTicks || 1;

  const { result, rerender } = renderHook(({ totalTicks, config }) => useTimer(totalTicks, config), {
    initialProps: { totalTicks, config },
  });

  return {
    config,
    totalTicks,
    result,
    rerender,
  };
}

describe("useTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return default values", () => {
    const { result } = setup();

    expect(result.current.remainingTicks).toBe(1);
    expect(result.current.isRunning).toBe(true);
    expect(typeof result.current.pause).toBe("function");
    expect(typeof result.current.pause).toBe("function");
  });

  it("should call the onStart, onFinish and onTick automatically when autoStart=true", async () => {
    const {
      result,
      config: { onFinish, onStart, onTick },
    } = setup({
      props: {
        totalTicks: 1,
        config: {
          autoStart: true,
        },
      },
    });

    expect(result.current.isRunning).toBe(true);

    expect(result.current.remainingTicks).toBe(1);

    expect(onStart).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(onTick).toBeCalledWith(1);

    await waitFor(() => {
      expect(result.current.remainingTicks).toBe(0);
    });

    expect(onTick).toBeCalledTimes(1);

    expect(onFinish).toHaveBeenCalledTimes(1);

    expect(result.current.isRunning).toBe(false);
  });

  it("should call the onStart, onTick and onFinish when start is called and autoStart=false", async () => {
    const totalTicks = 2;
    const {
      config: { onFinish, onStart, onTick },
      result,
    } = setup({
      props: {
        totalTicks,
        config: {
          autoStart: false,
        },
      },
    });

    expect(onStart).not.toBeCalled();
    expect(onFinish).not.toBeCalled();
    expect(onTick).not.toBeCalled();

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    expect(onStart).toHaveBeenCalledTimes(1);

    for (let i = 1; i <= totalTicks; i++) {
      act(() => {
        jest.advanceTimersToNextTimer();
      });

      expect(onTick).toBeCalledWith(i);

      await waitFor(() => {
        expect(result.current.remainingTicks).toBe(totalTicks - i);
      });
    }

    expect(onTick).toBeCalledTimes(totalTicks);

    expect(onFinish).toHaveBeenCalledTimes(1);

    expect(result.current.isRunning).toBe(false);
  });

  it("should pause the timer when pause is called and resume when start is called", async () => {
    const totalTicks = 2;
    const {
      result,
      config: { onFinish, onStart, onTick },
    } = setup({
      props: {
        totalTicks,
      },
    });

    expect(onStart).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersToNextTimer();
      // await jest.advanceTimersToNextTimerAsync(); results in warning
    });

    expect(onTick).toBeCalledWith(1);

    await waitFor(() => {
      expect(result.current.remainingTicks).toBe(1);
    });

    act(() => {
      result.current.pause();
    });

    expect(jest.getTimerCount()).toBe(0);

    expect(result.current.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onTick).toBeCalledTimes(1);

    expect(result.current.remainingTicks).toBe(1);

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    expect(onTick).toBeCalledWith(2);

    await waitFor(() => {
      expect(result.current.remainingTicks).toBe(0);
    });

    expect(onFinish).toHaveBeenCalledTimes(1);

    expect(result.current.isRunning).toBe(false);
  });

  it("should restart the timer when start is called and timer has ended", () => {
    const totalTicks = 3;
    const {
      result,
      config: { onFinish, onStart, onTick },
    } = setup({
      props: {
        totalTicks,
        config: {
          interval: 1000,
        },
      },
    });

    expect(onStart).toHaveBeenCalledTimes(1);

    for (let i = 1; i <= totalTicks; i++) {
      act(() => {
        jest.advanceTimersToNextTimer();
      });
    }

    expect(onTick).toHaveBeenCalledTimes(3);

    expect(onFinish).toHaveBeenCalledTimes(1);

    expect(result.current.remainingTicks).toBe(0);

    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.start();
    });

    expect(onStart).toHaveBeenCalledTimes(2);

    expect(result.current.remainingTicks).toBe(totalTicks);

    expect(result.current.isRunning).toBe(true);
  });
});
