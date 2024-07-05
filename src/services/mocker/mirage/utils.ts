import { Response } from "miragejs";

export const urlPrefix = (path: string, baseUrl?: string) => {
  const apiUrl = baseUrl || process.env.REACT_APP_API_URL;

  if (path[0] !== "/") {
    throw new Error("Miragejs handler path should start with a forward slash.");
  }
  const isApiUrlEndsWithSlash = apiUrl[apiUrl.length - 1] === "/";

  if (isApiUrlEndsWithSlash) {
    return `${apiUrl}${path.slice(1)}`;
  }
  return `${apiUrl}${path}`;
};

export const resourceNotFoundResponse = (resourceName?: string) =>
  new Response(404, {}, { message: `Resource ${resourceName} not found!` });
