import { defineConfig } from "cypress";

import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  screenshotOnRunFailure: true,
  numTestsKeptInMemory: 30,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  pageLoadTimeout: 100000,
  // default time used to cypress to wait until assertion is successful
  defaultCommandTimeout: 10000,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "cypress/reporter.config.json",
  },
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    // NOTE: PORT defined in .developer.env
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",
  },
  video: false,
  env: {
    REACT_APP_MOCKER: "mirage",
    REACT_APP_API_URL: "https://reminder-app.com/api/v1/",
    REACT_APP_PUBLIC_URL: "http://localhost:3000/",
    coverage: true,
  },
});
