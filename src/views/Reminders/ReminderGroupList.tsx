import { FC, PropsWithChildren } from "react";

import { Plus } from "lucide-react";

import { useGetReminderGroupsQuery } from "shared";

import { Button } from "components";

import { ReminderGroupItem } from "./ReminderGroupItem";

export type TReminderGroupListProps = Record<string, never>;

export const ReminderGroupList: FC<PropsWithChildren<TReminderGroupListProps>> = () => {
  const { data: reminderGroups } = useGetReminderGroupsQuery();

  return (
    <div className="flex min-w-[200px] flex-1 flex-col overflow-hidden bg-secondary p-4">
      <div className="mb-2 flex justify-center">
        <Button
          className="gap-1 hover:bg-accent-dark hover:text-primary"
          variant={"ghost"}
        >
          <Plus className="icon" />
          Add list
        </Button>
      </div>
      <div className="flex-1 overflow-scroll">
        <ul className="divide divide-y">
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
    </div>
  );
};
