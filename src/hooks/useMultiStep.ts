import { useState, useCallback } from "react";

export type TUseMultiStepProps = {
  /**
   * Total number of steps in the multi-step process
   * NOTE: steps are 0-indexed, so if totalSteps = 2 then the steps are 0, 1, 2
   */
  totalSteps: number;
  /**
   * Initial step to start with
   * NOTE: steps are 0-indexed
   */
  initialStep?: number;
};

export function useMultiStep({ totalSteps, initialStep = 0 }: TUseMultiStepProps) {
  if (initialStep < 0 || initialStep > totalSteps) {
    throw new Error("initialStep must be within the range of totalSteps");
  }

  const [step, setStep] = useState(initialStep);

  const nextStep = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep >= totalSteps) {
        return prevStep;
      }
      return prevStep + 1;
    });
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep <= 0) {
        return prevStep;
      }
      return prevStep - 1;
    });
  }, []);

  const setStepTo = useCallback(
    (newStep: number) => {
      setStep((prevStep) => {
        if (newStep >= 0 && newStep <= totalSteps) {
          return newStep;
        }
        return prevStep;
      });
    },
    [totalSteps]
  );

  return {
    step,
    nextStep,
    prevStep,
    setStepTo,
    isFirstStep: step === 0,
    isLastStep: step === totalSteps,
  };
}
