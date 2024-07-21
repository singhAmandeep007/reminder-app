import { useEffect, useRef } from "react";

export type TUseIntervalProps = {
  callback: () => void;
  delay: number | null;
};

export function useInterval(callback: TUseIntervalProps["callback"], delay: TUseIntervalProps["delay"]) {
  const savedCallback = useRef<typeof callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current?.();
      }, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}
