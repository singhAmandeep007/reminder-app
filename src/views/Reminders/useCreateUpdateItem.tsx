import { useCallback, useRef } from "react";

import { Check, X } from "lucide-react";

import { Input } from "components";
import {
  useCreateReminderGroupMutation,
  useCreateReminderMutation,
  handleAsync,
  useUpdateReminderGroupMutation,
  useUpdateReminderMutation,
} from "shared";
import { TReminder, TReminderGroup } from "types";

import { IconButton } from "./components";

export type TUseCreateUpdateItemProps = {
  onSave?: () => void;
  onCancel?: () => void;
  type: "reminder" | "reminderGroup";
  value?: string;
  mode: "create" | "update";
  id?: TReminder["id"] | TReminderGroup["id"];
};

export const useCreateUpdateItem = (props: TUseCreateUpdateItemProps) => {
  const { onCancel, value } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [createReminder, createReminderResult] = useCreateReminderMutation();
  const [createReminderGroup, createReminderGroupResult] = useCreateReminderGroupMutation();

  const [updateReminder, updateReminderResult] = useUpdateReminderMutation();
  const [updateReminderGroup, updateReminderGroupResult] = useUpdateReminderGroupMutation();

  const handleOnSave = useCallback(async () => {
    const { mode, type, onSave, id } = props;
    if (type === "reminder") {
      if (mode === "update") {
        if (!id) {
          throw new Error("Update id is required");
        }
        await handleAsync(() => updateReminder({ id, title: inputRef.current!.value }));
      }
      if (mode === "create") {
        await handleAsync(() => createReminder({ title: inputRef.current!.value }));
      }
    }
    if (type === "reminderGroup") {
      if (mode === "update") {
        if (!id) {
          throw new Error("Update id is required");
        }
        await handleAsync(() => updateReminderGroup({ id, name: inputRef.current!.value }));
      }
      if (mode === "create") {
        await handleAsync(() => createReminderGroup({ name: inputRef.current!.value }));
      }
    }

    onSave?.();
  }, [createReminder, createReminderGroup, updateReminder, updateReminderGroup, props]);

  const handleOnCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const ItemComponent = () => {
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

  const result =
    props.mode === "create"
      ? props.type === "reminder"
        ? createReminderResult
        : createReminderGroupResult
      : props.type === "reminder"
        ? updateReminderResult
        : updateReminderGroupResult;

  return {
    ItemComponent,
    result,
  };
};
