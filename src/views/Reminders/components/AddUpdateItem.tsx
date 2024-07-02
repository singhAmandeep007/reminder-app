import { FC, PropsWithChildren, useCallback, useRef } from "react";

import { Check, X } from "lucide-react";

import { cn } from "shared";

import { Button, Input } from "components";

export type TAddUpdateItemProps = {
  className?: string;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  defaultValue?: string;
  testIds?: {
    save?: string;
    cancel?: string;
    text?: string;
  };
};

export const AddUpdateItem: FC<PropsWithChildren<TAddUpdateItemProps>> = ({
  className,
  onCancel,
  onSave,
  defaultValue = "",
  testIds,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnSave = useCallback(() => {
    if (inputRef.current?.value) {
      onSave?.(inputRef.current.value);
    }
  }, [onSave]);

  const handleOnCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  return (
    <div className={cn("mt-2 flex items-center justify-between", className)}>
      <Input
        className="ml-1 mr-2"
        defaultValue={defaultValue}
        ref={inputRef}
        autoFocus
        required
        data-testid={testIds?.text}
      />
      <div className="flex items-center gap-1">
        <Button
          onClick={handleOnSave}
          size="icon"
          variant={"outline"}
          data-testid={testIds?.save}
          className="group"
        >
          <Check className="icon group-hover:text-primary" />
        </Button>
        <Button
          onClick={handleOnCancel}
          size="icon"
          variant={"outline"}
          data-testid={testIds?.cancel}
          className="group"
        >
          <X className="icon group-hover:text-destructive" />
        </Button>
      </div>
    </div>
  );
};
