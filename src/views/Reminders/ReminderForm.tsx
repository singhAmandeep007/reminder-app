import { FC, PropsWithChildren } from "react";
import { Plus } from "lucide-react";

import { Button } from "components";

export type TReminderFormProps = Record<string, never>;

export const ReminderForm: FC<PropsWithChildren<TReminderFormProps>> = () => {
  return (
    <div>
      <Button
        data-testid="add-reminder"
        size="icon"
        className="w-full"
      >
        <Plus className="icon" />
      </Button>
    </div>
  );
};
