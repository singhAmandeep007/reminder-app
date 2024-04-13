import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import { Bell } from "lucide-react";

import { useTranslation } from "react-i18next";

import { RouteLink, Typography } from "components";

import { HOME_ROUTE_BY_PATH, ROUTE_BY_PATH } from "app/Router";

import { ThemeToggler } from "modules/theme";

import { LangToggler } from "modules/i18n";

export type TBaseLayoutProps = Record<string, never>;

export const BaseLayout: FC<PropsWithChildren<TBaseLayoutProps>> = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <header className="h-[--navbar-height]">
        <div className="flex h-full w-full items-center justify-between border-b-2 border-primary px-4">
          <div>
            <RouteLink to={ROUTE_BY_PATH.home}>
              <Bell className="icon inline-block fill-primary" />
            </RouteLink>
          </div>
          <div>
            <nav className="flex items-center justify-between gap-3 ">
              {[
                { title: t("navbar.home"), path: ROUTE_BY_PATH.home },
                { title: t("navbar.reminders"), path: HOME_ROUTE_BY_PATH.reminders },
              ].map(({ path, title }) => (
                <RouteLink
                  key={path}
                  to={path}
                >
                  {({ isActive }) => {
                    return (
                      <span className={`text-lg ${isActive ? "border-b-2 border-primary text-primary" : ""}`}>
                        {title}
                      </span>
                    );
                  }}
                </RouteLink>
              ))}
            </nav>
          </div>
          <div className="inline-flex items-center gap-1">
            <ThemeToggler />
            <LangToggler />
          </div>
        </div>
      </header>
      <main className="h-[--content-height] overflow-x-auto">
        <Outlet />
      </main>
      <footer className="h-[--footer-height]">
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
    </div>
  );
};
