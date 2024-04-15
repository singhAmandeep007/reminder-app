import { FC, PropsWithChildren } from "react";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { EllipsisVertical, EllipsisIcon } from "lucide-react";

import { useBreakpoint } from "hooks";
import { cn } from "shared";
import { Typography } from "components";

import { RemindersList } from "./RemindersList";

import { ReminderGroupList } from "./ReminderGroupList";

export type TRemindersProps = Record<string, never>;

export const Reminders: FC<PropsWithChildren<TRemindersProps>> = () => {
  const { isBelowMd } = useBreakpoint("md");

  return (
    <div className="mx-auto h-full max-w-screen-md p-8">
      <div className="flex h-full flex-col rounded border-2 border-primary shadow-lg lg:h-3/4">
        <nav className="flex h-[--navbar-height] border-b-2 border-primary">
          <ul className="flex flex-1 items-center justify-between px-4">
            <li>
              <Typography
                variant={"h2"}
                className="pb-0"
              >
                Reminders
              </Typography>
            </li>
          </ul>
        </nav>

        <PanelGroup
          direction={isBelowMd ? "vertical" : "horizontal"}
          className="flex-1"
          autoSaveId={"reminders-panel-group"}
        >
          <Panel
            maxSize={50}
            className="flex flex-col"
          >
            <ReminderGroupList />
          </Panel>

          <PanelResizeHandle className="group">
            <div
              className={cn(
                "flex h-full w-8 items-center border-primary bg-secondary",
                isBelowMd ? "h-8 w-full border-b-2" : "border-r-2"
              )}
            >
              <span
                className={cn(
                  "mx-auto rounded group-hover:bg-primary group-hover:text-secondary",
                  isBelowMd ? "px-1" : "py-1"
                )}
              >
                {isBelowMd ? <EllipsisIcon className="icon" /> : <EllipsisVertical className={"icon"} />}
              </span>
            </div>
          </PanelResizeHandle>

          <Panel className="flex flex-col">
            <RemindersList />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
