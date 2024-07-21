import { expect, it, describe } from "@jest/globals";

import { act } from "@testing-library/react";

import { renderHook } from "tests/utils";

import { useMultiStep } from "./useMultiStep";

describe("useMultiStep", () => {
  it("should initialize with the correct initial step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3, initialStep: 1 }));

    expect(result.current.step).toBe(1);
  });

  it("should increment the step when calling nextStep", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 1 }));

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.step).toBe(1);
  });

  it("should not increment the step beyond the last step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3, initialStep: 3 }));

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.step).toBe(3);
  });

  it("should decrement the step when calling prevStep", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3, initialStep: 1 }));

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.step).toBe(0);
  });

  it("should not decrement the step beyond the first step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3 }));

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.step).toBe(0);
  });

  it.each([2, 0, 3])("should set the step to the specified value when calling setStepTo", (step) => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3 }));

    act(() => {
      result.current.setStepTo(step);
    });

    expect(result.current.step).toBe(step);
  });

  it("should not set the step to a value beyond the last step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3 }));

    act(() => {
      result.current.setStepTo(4);
    });

    expect(result.current.step).toBe(0);
  });

  it("should not set the step to a negative value", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3, initialStep: 1 }));

    act(() => {
      result.current.setStepTo(-1);
    });

    expect(result.current.step).toBe(1);
  });

  it("should return true for isFirstStep when the current step is the first step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3 }));

    act(() => {
      result.current.nextStep();
    });

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.isFirstStep).toBe(true);
  });

  it("should return false for isFirstStep when the current step is not the first step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3, initialStep: 1 }));

    expect(result.current.isFirstStep).toBe(false);
  });

  it("should return true for isLastStep when the current step is the last step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 2, initialStep: 2 }));

    expect(result.current.isLastStep).toBe(true);
  });

  it("should return false for isLastStep when the current step is not the last step", () => {
    const { result } = renderHook(() => useMultiStep({ totalSteps: 3, initialStep: 2 }));

    expect(result.current.isLastStep).toBe(false);
  });

  it.each([4, -11])("should throw an error when initialStep is outside the range of totalSteps", (initialStep) => {
    expect(() => {
      renderHook(() => useMultiStep({ totalSteps: 3, initialStep }));
    }).toThrowError("initialStep must be within the range of totalSteps");
  });
});
