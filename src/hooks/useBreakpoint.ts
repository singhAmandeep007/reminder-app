import { useMediaQuery } from "react-responsive";

import { BREAKPOINTS } from "shared";

type TKeyAbove<K extends string> = `isAbove${Capitalize<K>}`;
type TKeyBelow<K extends string> = `isBelow${Capitalize<K>}`;

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue = BREAKPOINTS[breakpointKey as keyof typeof BREAKPOINTS];
  const isBelow = useMediaQuery({
    query: `(max-width: ${breakpointValue})`,
  });
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
    [`isAbove${capitalizedKey}`]: !isBelow,
    [`isBelow${capitalizedKey}`]: isBelow,
  } as Record<K, number> & Record<TKeyAbove<K> | TKeyBelow<K>, boolean>;
}
