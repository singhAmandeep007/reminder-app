import { FC } from "react";

import { cn } from "shared";

import { Button, TButtonProps } from "components";

export const IconButton: FC<TButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className={cn("shrink-0 bg-accent-dark hover:bg-background hover:text-primary", className)}
      {...props}
    >
      {children}
    </Button>
  );
};
