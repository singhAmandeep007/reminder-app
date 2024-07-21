import { FC, PropsWithChildren } from "react";

import { useFocusSessionWizardContext } from "./context";
import { Steps } from "./Steps";

export type TFocusSessionWizardProps = Record<string, never>;

export const FocusSessionWizard: FC<PropsWithChildren<TFocusSessionWizardProps>> = () => {
  const { step } = useFocusSessionWizardContext();

  const Component = Steps[step];

  return <Component />;
};
