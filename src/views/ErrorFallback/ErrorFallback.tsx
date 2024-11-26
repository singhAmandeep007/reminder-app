import { FC } from "react";

import { isRouteErrorResponse, useRouteError } from "react-router";

import { TriangleAlert } from "lucide-react";

import { useTranslation } from "react-i18next";

import { Button } from "components";

export type TErrorFallbackProps = {
  caption?: string;
  content?: string;
};

export const ErrorFallback: FC<TErrorFallbackProps> = ({ caption }) => {
  const { t } = useTranslation("errors");
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error?.status} ${error.statusText}`;
  } else if (error instanceof Error && error.message) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
    errorMessage = t("default.content");
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-2">
      <TriangleAlert
        size={48}
        className="text-destructive"
      />
      <div>
        <h1 className="text-center">{caption || t("default.caption")}</h1>
      </div>

      <div className="w-1/2 text-center">
        <pre className="text-clip text-wrap text-muted-foreground">({errorMessage})</pre>
      </div>
      <Button
        className="mt-8"
        onClick={() => (window.location.href = "/")}
      >
        {t("reloadApp")}
      </Button>
    </div>
  );
};
