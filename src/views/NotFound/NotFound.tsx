import { FC } from "react";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";

import { Button } from "components";

import { ROUTE_BY_PATH } from "app/Router";

export type TNotFoundProps = {};

export const NotFound: FC<TNotFoundProps> = () => {
  const { t } = useTranslation("common");

  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {t("notFound")}
      <Button
        onClick={() =>
          navigate(ROUTE_BY_PATH.home, {
            replace: true,
          })
        }
      >
        {t("navbar.home")}
      </Button>
    </div>
  );
};
