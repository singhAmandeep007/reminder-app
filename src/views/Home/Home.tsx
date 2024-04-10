import { FC, PropsWithChildren } from "react";
import { useTranslation, Trans } from "react-i18next";

import { Typography } from "components";

export type THomeProps = Record<string, never>;

export const Home: FC<PropsWithChildren<THomeProps>> = () => {
  const { t } = useTranslation("homePage");

  return (
    <div className="p-4">
      <Typography>{t("reminderApp")}</Typography>
      <Typography variant={"p"}>{t("choosingTechStack")}</Typography>

      <Typography
        variant={"h2"}
        className="pt-5"
      >
        {t("techStack")}
      </Typography>

      <Typography variant={"ul"}>
        {t("techStackItems", {
          returnObjects: true,
        }).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Typography>

      <Typography
        variant={"h2"}
        className="pt-5"
      >
        {t("folderStructure")}
      </Typography>

      <div className="overflow-x-auto rounded bg-secondary-foreground p-2">
        <Trans
          i18nKey="homePage:folderStructureCode"
          components={{
            c: <code className="block text-sm text-primary" />,
          }}
        />
      </div>
    </div>
  );
};
