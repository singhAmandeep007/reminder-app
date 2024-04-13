const apiUrl = process.env.REACT_APP_API_URL;

export const urlPrefix = (path: string) => {
  if (path[0] !== "/") {
    throw new Error("Miragejs handler path should start with a forward slash.");
  }
  const isApiUrlEndsWithSlash = apiUrl[apiUrl.length - 1] === "/";

  if (isApiUrlEndsWithSlash) {
    return `${apiUrl}${path.slice(1)}`;
  }
  return `${apiUrl}${path}`;
};
