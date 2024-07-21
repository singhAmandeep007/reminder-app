import { createContext, useContext, useState } from "react";

import { TReminder } from "types";

import { useMultiStep } from "hooks";

import { totalSteps } from "./Steps";

export type TFocusSessionWizardContext = {
  /**
   * focus session duration in seconds
   */
  focusSessionDuration: number;
  setFocusSessionDuration: (seconds: number) => void;
  reminder: TReminder;
} & ReturnType<typeof useMultiStep>;

type TFocusSessionWizardProviderProps = {
  children: React.ReactNode;
  reminder: TReminder;
};

export const FocusSessionWizardContext = createContext<TFocusSessionWizardContext | null>(null);

export const FocusSessionWizardProvider = ({ children, reminder }: TFocusSessionWizardProviderProps) => {
  const [focusSessionDuration, setFocusSessionDuration] =
    useState<TFocusSessionWizardContext["focusSessionDuration"]>(0);

  return (
    <FocusSessionWizardContext.Provider
      value={{
        focusSessionDuration,
        setFocusSessionDuration,
        reminder,
        ...useMultiStep({ totalSteps }),
      }}
    >
      {children}
    </FocusSessionWizardContext.Provider>
  );
};

export const useFocusSessionWizardContext = () => {
  const context = useContext(FocusSessionWizardContext);
  if (!context) {
    throw new Error("useFocusSessionWizardContext must be used within a FocusSessionWizardProvider");
  }
  return context;
};
