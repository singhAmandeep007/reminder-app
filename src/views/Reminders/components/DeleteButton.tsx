import { FC } from "react";
import { Trash } from "lucide-react";

import { cn } from "shared";

import { Button, TButtonProps } from "components";

export const DeleteButton: FC<TButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      size="icon"
      variant={"ghost"}
      className={cn("shrink-0 opacity-30 hover:bg-accent-dark hover:text-destructive hover:opacity-100", className)}
      {...props}
    >
      <Trash className="icon" />
      {children}
    </Button>
  );
};
