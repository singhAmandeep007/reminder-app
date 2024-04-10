import "i18next";

declare module "i18next" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    resources: {
      common: typeof import("modules/i18n/locales/en-US/common.json");
      errors: typeof import("modules/i18n/locales/en-US/errors.json");
      homePage: typeof import("modules/i18n/locales/en-US/homePage.json");
      remindersPage: typeof import("modules/i18n/locales/en-US/remindersPage.json");
    };
  }
}
