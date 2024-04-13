import { FC, PropsWithChildren, useCallback } from "react";

import { TRemindersGroup } from "types";

import { useAppDispatch, setQueryParams, useAppSelector, selectQueryParams, cn } from "shared";

import { DeleteButton } from "./components";

export type TRemindersGroupItemProps = {
  remindersGroup?: TRemindersGroup;
};

export const RemindersGroupItem: FC<PropsWithChildren<TRemindersGroupItemProps>> = ({ remindersGroup }) => {
  const dispatch = useAppDispatch();

  const { groupId } = useAppSelector(selectQueryParams);

  const isSelected = groupId === remindersGroup?.id;

  const className = cn("flex flex-1 items-center justify-between py-2 cursor-pointer gap-2");

  const titleClassName = cn(isSelected && "text-primary");

  const handleOnClick = useCallback(
    (queryParams: Parameters<typeof setQueryParams>[0]) => {
      dispatch(setQueryParams(queryParams));
    },
    [dispatch]
  );

  if (!remindersGroup) {
    return (
      <div
        className={className}
        data-testid="reminders-group-item-all"
        onClick={() => handleOnClick({ groupId: undefined })}
      >
        <div className={titleClassName}>All</div>
      </div>
    );
  }

  return (
    <div
      className={className}
      data-testid={`reminders-group-item-${remindersGroup.id}`}
      onClick={() => handleOnClick({ groupId: remindersGroup.id })}
    >
      <div className={titleClassName}> {remindersGroup.name}</div>

      <DeleteButton data-testid={`delete-reminders-group-item-${remindersGroup.id}`} />
    </div>
  );
};
