import { useEffect, useState } from "react";

import { ChevronUp, ChevronDown } from "lucide-react";

import { Button } from "components";

import { cn } from "shared";

export type TValueSetterProps = {
  initialValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  min?: number;
  children?: React.ReactNode;
  classNames?: {
    container?: string;
    value?: string;
    controls?: string;
  };
  testIds?: {
    increment?: string;
    decrement?: string;
  };
};

export function ValueSetter({
  initialValue = 0,
  onChange,
  children,
  min = 0,
  max = 59,
  classNames,
  testIds,
}: TValueSetterProps) {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    setValue((prev) => Math.min(prev + 1, max));
  };
  const decrement = () => {
    setValue((prev) => Math.max(prev - 1, min));
  };

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <div className={cn("flex w-max items-center justify-between gap-4 p-2", classNames?.container)}>
      <div className={cn("flex min-w-12 flex-col items-center justify-center")}>
        <span className={cn("text-4xl font-bold text-primary", classNames?.value)}>{value}</span>
        {children}
      </div>
      <div className="flex flex-col justify-between">
        <Button
          onClick={increment}
          className={cn("rounded-b-none", classNames?.controls)}
          size={"icon"}
          disabled={value >= max}
          variant={"outline"}
          data-testid={testIds?.increment || "increment"}
        >
          <ChevronUp />
        </Button>
        <Button
          onClick={decrement}
          className={cn("text rounded-t-none", classNames?.controls)}
          size={"icon"}
          disabled={value <= min}
          variant={"outline"}
          data-testid={testIds?.decrement || "decrement"}
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}
