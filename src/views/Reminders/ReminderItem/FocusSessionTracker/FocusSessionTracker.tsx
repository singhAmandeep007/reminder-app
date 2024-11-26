import { FC } from "react";

import { TReminder } from "types";

import { FocusSessionWizard, FocusSessionWizardProvider } from "./FocusSessionWizard";

export type TFocusSessionTrackerProps = {
  reminder: TReminder;
};

export const FocusSessionTracker: FC<TFocusSessionTrackerProps> = ({ reminder }) => {
  return (
    <FocusSessionWizardProvider reminder={reminder}>
      <FocusSessionWizard />
    </FocusSessionWizardProvider>
  );
};
