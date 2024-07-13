import { FC, forwardRef, PropsWithChildren, useState } from "react";

import { Components, Virtuoso } from "react-virtuoso";

import { TReminderGroup } from "types";

import { ReminderGroupItem } from "../ReminderGroupItem";
import { AddButton, AddUpdateItem } from "../components";

import { useReminderGroupsList } from "./useReminderGroupsList";

export type TReminderGroupsListProps = Record<string, never>;

const VirtuosoList: Components["List"] = forwardRef((props, ref) => {
  return (
    <ul
      className="divide divide-y divide-accent-dark"
      ref={ref as React.RefObject<HTMLUListElement>}
      {...(props as React.HTMLAttributes<HTMLUListElement>)}
    >
      {props.children}
    </ul>
  );
});

const VirtuosoItem: Components["Item"] = (props) => {
  // FIX: item="[Object Object]"
  const { item, ...rest } = props;
  return <li {...rest}>{props.children}</li>;
};

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
          data-testid={"reminder-group-create-btn"}
        >
          Add List
        </AddButton>
      </div>

      {reminderGroups && (
        <Virtuoso
          className="flex-1 overflow-scroll"
          computeItemKey={(index) => {
            return reminderGroups[index].id || Math.random();
          }}
          data={reminderGroups}
          components={{
            List: VirtuosoList,
            Item: VirtuosoItem,
            Header: () => <ReminderGroupItem />,
          }}
          itemContent={(_, reminderGroup) => <ReminderGroupItem reminderGroup={reminderGroup as TReminderGroup} />}
        />
      )}

      {/* <div className="flex-1 overflow-scroll">
        <ul className="divide divide-y divide-accent-dark">
          <li key="all">
            <ReminderGroupItem />
          </li>
          {reminderGroups &&
            reminderGroups.map((reminderGroup) => (
              <li key={reminderGroup.id}>
                <ReminderGroupItem reminderGroup={reminderGroup} />
              </li>
            ))}
        </ul>
      </div> */}

      {isCreating && (
        <AddUpdateItem
          onCancel={() => setIsCreating(false)}
          onSave={(name) => {
            handleOnSave({ name: name });
            setIsCreating(false);
          }}
          testIds={{
            cancel: `reminder-group-create-cancel`,
            save: `reminder-group-create-save`,
            text: `reminder-group-create-text`,
          }}
        />
      )}
    </div>
  );
};
