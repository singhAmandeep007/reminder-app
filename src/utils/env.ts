export const getEnvValue = (key: string, defaultValue?: string) => {
  // with window.Cypress.env we can access are the environment variables from Cypress configuration
  // NOTE: ORDER MATTERS, order of precedence: process.env > window.Cypress.env > defaultValue
  const value =
    process.env[key] || (typeof window !== "undefined" && window.Cypress && window.Cypress.env(key)) || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};
