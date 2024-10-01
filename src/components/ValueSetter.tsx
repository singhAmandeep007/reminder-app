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
  className?: string;
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
  className,
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
    <div className={cn("flex w-max items-center justify-between gap-4 p-2", className)}>
      <div className="flex min-w-12 flex-col items-center justify-center">
        <span className="text-4xl font-bold text-primary">{value}</span>
        {children}
      </div>
      <div className="flex flex-col justify-between">
        <Button
          onClick={increment}
          className="rounded-b-none"
          size={"icon"}
          disabled={value >= max}
          variant={"outline"}
          data-testid={testIds?.increment || "increment"}
        >
          <ChevronUp />
        </Button>
        <Button
          onClick={decrement}
          className="rounded-t-none"
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
