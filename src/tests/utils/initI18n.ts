import { i18n } from "modules/i18n";

export const initI18n = () => {
  i18n.configure({
    initOptions: {
      lng: "en-US",
      supportedLngs: ["en-US"],
      debug: false,
    },
  });
};
