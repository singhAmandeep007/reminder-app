import { FC, PropsWithChildren } from "react";

export type TReminderListItemProps = Record<string, never>;

export const ReminderListItem: FC<PropsWithChildren<TReminderListItemProps>> = () => {
  return <div>ReminderListItem</div>;
};
