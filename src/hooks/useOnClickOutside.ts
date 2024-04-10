import { useEffect } from "react";

type TUseClickOutsideProps = {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
};

export const useOutsideClick = ({ ref, handler }: TUseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};
