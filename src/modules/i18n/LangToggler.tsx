import { useCallback, useEffect, useState } from "react";
import { Languages } from "lucide-react";

import { useTranslation } from "react-i18next";

import { Button, DropdownMenu } from "components";

import { LANGS_MAP, TLangsValues } from "./consts";

const data = Object.values(LANGS_MAP).reduce(
  (acc, { label, value }) => {
    return [
      ...acc,
      {
        id: value,
        label,
      },
    ];
  },
  [] as { id: TLangsValues; label: string }[]
);

export function LangToggler() {
  const { t, i18n } = useTranslation("common", { keyPrefix: "lang" });

  const [currentLang, setCurrentLang] = useState<TLangsValues>(i18n.resolvedLanguage as TLangsValues);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function changeLanguage(lang: TLangsValues) {
      await i18n.changeLanguage(lang);
    }

    // eslint-disable-next-line no-console
    changeLanguage(currentLang).catch(console.error);
  }, [currentLang, i18n]);

  const onSelect = useCallback((item: (typeof data)[number]) => {
    setCurrentLang(item.id);
  }, []);

  return (
    <DropdownMenu
      isOpen={isOpen}
      onToggle={setIsOpen}
      position="bottom-right"
      data={data}
      onSelect={onSelect}
      selectedId={currentLang}
      triggerer={(props) => (
        <Button
          variant="outline"
          size="icon"
          {...props}
        >
          <Languages className="icon" />
          <span className="sr-only">{t("iconLabel")}</span>
        </Button>
      )}
      itemRenderer={({ label, isSelected }) => {
        return (
          <div
            className={`flex cursor-pointer rounded-md px-3 py-1.5  hover:bg-secondary-foreground hover:text-accent ${isSelected ? "text-primary" : ""}`}
          >
            <span>{label}</span>
          </div>
        );
      }}
    />
  );
}
