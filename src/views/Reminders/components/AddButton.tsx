import { FC } from "react";
import { Plus } from "lucide-react";

import { cn } from "utils";

import { Button, TButtonProps } from "components";

export const AddButton: FC<TButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      variant={"ghost"}
      className={cn("gap-1 border border-accent-dark hover:bg-accent-dark hover:text-primary", className)}
      {...props}
    >
      <Plus className="icon" />
      {children}
    </Button>
  );
};
