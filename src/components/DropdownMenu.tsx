import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "shared";

import { useOutsideClick } from "hooks";

type TDropdownItem<T> = {
  id: string;
} & T;

type TDropdownProps<T> = {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  data: TDropdownItem<T>[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  selectedId?: string;
  onSelect?: (item: TDropdownItem<T>) => void;
  triggerer: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  itemRenderer: (item: TDropdownItem<T>) => React.ReactNode;
};

export const DropdownMenu = <T,>({
  isOpen,
  onToggle,
  data,
  position = "bottom-left",
  selectedId,
  onSelect,
  triggerer: Triggerer,
  itemRenderer,
}: TDropdownProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<TDropdownItem<T> | undefined>(
    selectedId ? data.find((item) => item.id === selectedId) : undefined
  );

  const handleItemChange = useCallback(
    (item: TDropdownItem<T>) => {
      setSelectedItem(item);
      onSelect && onSelect(item);
      onToggle(false);
    },
    [onSelect, onToggle]
  );

  useEffect(() => {
    if (selectedId && selectedId !== selectedItem?.id && data) {
      setSelectedItem(data.find((item) => item.id === selectedId));
    }
  }, [selectedId, data, selectedItem]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => onToggle(false),
  });

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <Triggerer
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
      />
      {isOpen && (
        <div
          aria-label="Dropdown menu"
          className={cn(
            "absolute z-10 max-h-52 w-max overflow-y-auto  rounded-md border bg-secondary ring-offset-background ",
            {
              "right-0 top-full mt-2": position === "bottom-right",
              "left-0 top-full mt-2": position === "bottom-left",
              "bottom-full right-0 mb-2": position === "top-right",
              "bottom-full left-0 mb-2": position === "top-left",
            }
          )}
        >
          <ul
            role="menu"
            aria-orientation="vertical"
          >
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleItemChange(item)}
                className={cn("cursor-pointer", {
                  "text-primary": selectedItem?.id === item.id,
                })}
              >
                {itemRenderer(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
