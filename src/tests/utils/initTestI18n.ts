import { initReactI18next } from "react-i18next";

import { I18n, DEFAULT_INIT_OPTION, LANGS_MAP, NAMESPACES } from "modules/i18n";

class TestI18n extends I18n {
  async configure() {
    return await this.i18n.use(initReactI18next).init({
      ...DEFAULT_INIT_OPTION,
      resources: {
        [LANGS_MAP["enUS"].value]: NAMESPACES.reduce((acc, ns) => {
          return {
            ...acc,
            [ns]: require(`../../modules/i18n/locales/${LANGS_MAP["enUS"].value}/${ns}.json`),
          };
        }, {}),
      },
    });
  }
}

export const initTestI18n = () => {
  const testI18n = new TestI18n();

  testI18n.configure();

  return testI18n;
};
