import { FC, PropsWithChildren } from "react";

import { Plus } from "lucide-react";

import { useGetRemindersGroupsQuery } from "shared";

import { Button } from "components";

import { RemindersGroupItem } from "./RemindersGroupItem";

export type TRemindersGroupListProps = Record<string, never>;

export const RemindersGroupList: FC<PropsWithChildren<TRemindersGroupListProps>> = () => {
  const { data: remindersGroups } = useGetRemindersGroupsQuery();

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
            <RemindersGroupItem />
          </li>
          {remindersGroups &&
            remindersGroups.map((remindersGroup) => {
              return (
                <li key={remindersGroup.id}>
                  <RemindersGroupItem remindersGroup={remindersGroup} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
