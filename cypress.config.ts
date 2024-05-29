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
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",
  },
  video: false,
  env: {
    coverage: true,
  },
});
