import { FC, PropsWithChildren } from "react";

import { useTranslation } from "react-i18next";

import { Typography } from "components";

export type TFooterProps = Record<string, never>;

export const Footer: FC<PropsWithChildren<TFooterProps>> = () => {
  const { t } = useTranslation("common");
  return (
    <footer
      className="h-[--footer-height]"
      data-testid="footer"
    >
      <div className="flex h-full w-full items-center justify-center border-t-2 border-primary">
        <Typography variant={"p"}>
          {t("app.copyright", {
            year: new Date().getFullYear(),
          })}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/singhAmandeep007"
            className="ml-1 border-primary text-primary hover:border-b-2"
          >
            {t("app.author")}
          </a>
        </Typography>
      </div>
    </footer>
  );
};
