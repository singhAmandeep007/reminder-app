import path from "path";

import dotenv from "dotenv";

import { defineConfig } from "cypress";

import codeCoverageTask from "@cypress/code-coverage/task";

dotenv.config({ path: path.resolve(__dirname, ".cypress.env") });

const reactEnv = Object.keys(process.env).reduce((acc, key) => {
  if (key.startsWith("REACT_APP_")) {
    acc[key] = process.env[key];
  }
  return acc;
}, {});

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
    baseUrl: process.env.REACT_APP_PUBLIC_URL,
    specPattern: "cypress/specs/**/*.cy.{js,jsx,ts,tsx}",
  },
  video: false,
  env: {
    ...reactEnv,
    coverage: true,
  },
});
