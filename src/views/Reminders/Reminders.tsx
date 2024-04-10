import { FC, PropsWithChildren } from "react";

export type TRemindersProps = Record<string, never>;

export const Reminders: FC<PropsWithChildren<TRemindersProps>> = () => {
  return <div>Reminders</div>;
};
