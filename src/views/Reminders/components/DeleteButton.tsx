import { FC } from "react";
import { Trash } from "lucide-react";

import { Button, TButtonProps } from "components";

export const DeleteButton: FC<TButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      size="icon"
      variant={"ghost"}
      className="shrink-0 opacity-30 hover:bg-accent-dark hover:text-destructive hover:opacity-100"
      {...props}
    >
      <Trash className="icon" />
      {children}
    </Button>
  );
};
