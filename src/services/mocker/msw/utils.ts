export const urlPrefix = (path: string, baseUrl?: string) => {
  // REFACTOR: any better way to use process.env in cypress environment?
  const apiUrl =
    baseUrl || process.env.REACT_APP_API_URL || ((window.Cypress && window.Cypress.env("REACT_APP_API_URL")) as string);

  if (path[0] !== "/") {
    throw new Error("MSW handler path should start with a forward slash.");
  }
  const isApiUrlEndsWithSlash = apiUrl[apiUrl.length - 1] === "/";

  if (isApiUrlEndsWithSlash) {
    return `${apiUrl}${path.slice(1)}`;
  }
  return `${apiUrl}${path}`;
};
