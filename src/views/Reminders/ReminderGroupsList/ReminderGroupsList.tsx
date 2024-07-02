import { FC, PropsWithChildren, useState } from "react";

import { ReminderGroupItem } from "../ReminderGroupItem";
import { AddButton, AddUpdateItem } from "../components";

import { useReminderGroupsList } from "./useReminderGroupsList";

export type TReminderGroupsListProps = Record<string, never>;

export const ReminderGroupsList: FC<PropsWithChildren<TReminderGroupsListProps>> = () => {
  const [isCreating, setIsCreating] = useState(false);

  const { handleOnSave, reminderGroups } = useReminderGroupsList();

  return (
    <div className="flex min-w-[200px] flex-1 flex-col overflow-hidden p-4">
      <div className="mb-2 mt-1 flex justify-center">
        <AddButton
          size={"full"}
          onClick={() => setIsCreating((isCreating) => !isCreating)}
          disabled={isCreating}
        >
          Add List
        </AddButton>
      </div>

      <div className="flex-1 overflow-scroll">
        <ul className="divide divide-y divide-accent-dark">
          <li key="all">
            <ReminderGroupItem />
          </li>
          {reminderGroups &&
            reminderGroups.map((reminderGroup) => {
              return (
                <li key={reminderGroup.id}>
                  <ReminderGroupItem reminderGroup={reminderGroup} />
                </li>
              );
            })}
        </ul>
      </div>

      {isCreating && (
        <AddUpdateItem
          onCancel={() => setIsCreating(false)}
          onSave={(name) => {
            handleOnSave({ name: name });
            setIsCreating(false);
          }}
          testIds={{
            cancel: `reminder-group-item-create-cancel`,
            save: `reminder-group-item-create-save`,
            text: `reminder-group-item-create-text`,
          }}
        />
      )}
    </div>
  );
};
