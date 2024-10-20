import { FC, PropsWithChildren, useRef } from "react";

import { DialogDescription, DialogHeader, DialogTitle, Button, ValueSetter } from "components";

import { useFocusSessionWizardContext } from "../context";

export type TFocusSessionDurationProps = Record<string, never>;

export const FocusSessionDuration: FC<PropsWithChildren<TFocusSessionDurationProps>> = () => {
  const hoursRef = useRef<number>(0);
  const minutesRef = useRef<number>(1);

  const { nextStep, setFocusSessionDuration } = useFocusSessionWizardContext();

  const handleOnClick = () => {
    const hours = hoursRef.current;
    const minutes = minutesRef.current;

    // NOTE: total time in seconds
    const duration = hours * 60 * 60 + minutes * 60;

    setFocusSessionDuration(duration);
    nextStep();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">Ready, set, focus!</DialogTitle>
        <DialogDescription className="max-w-xs text-left">Set duration of your focus session</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-center gap-4">
          <ValueSetter
            initialValue={hoursRef.current}
            onChange={(value) => (hoursRef.current = value)}
            max={12}
          >
            <span className="text-sm">hours</span>
          </ValueSetter>
          <ValueSetter
            initialValue={minutesRef.current}
            onChange={(value) => (minutesRef.current = value)}
            min={1}
            max={59}
          >
            <span className="text-sm">minutes</span>
          </ValueSetter>
        </div>

        <Button
          onClick={handleOnClick}
          className="self-end"
          size={"full"}
          autoFocus={true}
        >
          Next
        </Button>
      </div>
    </>
  );
};
