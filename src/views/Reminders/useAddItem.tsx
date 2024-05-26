import { useCallback, useRef } from "react";

import { Check, X } from "lucide-react";

import { Input } from "components";
import { useCreateReminderGroupMutation, useCreateReminderMutation, handleAsync } from "shared";

import { IconButton } from "./components";

export type TUseAddItemProps = {
  onSave?: () => void;
  onCancel?: () => void;
  type: "reminder" | "reminderGroup";
  value?: string;
};

export const useAddItem = ({ onSave, onCancel, type, value = "" }: TUseAddItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [createReminder, createReminderResult] = useCreateReminderMutation();
  const [createReminderGroup, createReminderGroupResult] = useCreateReminderGroupMutation();

  const handleOnSave = useCallback(async () => {
    if (type === "reminder") {
      await handleAsync(() => createReminder({ title: inputRef.current!.value }));
    }
    if (type === "reminderGroup") {
      await handleAsync(() => createReminderGroup({ name: inputRef.current!.value }));
    }

    onSave?.();
  }, [onSave, createReminder, createReminderGroup, type]);

  const handleOnCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const AddItemComponent = () => {
    return (
      <div className="my-2 flex items-center justify-between">
        <Input
          className="ml-1 mr-2"
          defaultValue={value}
          ref={inputRef}
          autoFocus
        />
        <div className="flex items-center gap-1">
          <IconButton onClick={handleOnSave}>
            <Check className="icon" />
          </IconButton>
          <IconButton onClick={handleOnCancel}>
            <X className="icon text-destructive" />
          </IconButton>
        </div>
      </div>
    );
  };

  const result = type === "reminder" ? createReminderResult : createReminderGroupResult;

  return {
    AddItemComponent,
    result,
  };
};
