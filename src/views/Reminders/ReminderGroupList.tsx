import { FC, PropsWithChildren, useState } from "react";

import { useGetReminderGroupsQuery } from "shared";

import { ReminderGroupItem } from "./ReminderGroupItem";
import { AddButton } from "./components";
import { useCreateUpdateItem } from "./useCreateUpdateItem";

export type TReminderGroupListProps = Record<string, never>;

export const ReminderGroupList: FC<PropsWithChildren<TReminderGroupListProps>> = () => {
  const { data: reminderGroups } = useGetReminderGroupsQuery();

  const [isCreating, setIsCreating] = useState(false);

  const { ItemComponent } = useCreateUpdateItem({
    type: "reminderGroup",
    mode: "create",
    onCancel: () => setIsCreating(false),
    onSave: () => setIsCreating(false),
  });

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

      {isCreating && <ItemComponent />}
    </div>
  );
};
