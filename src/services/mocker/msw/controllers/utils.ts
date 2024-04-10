/**
 * Returns the URL with the prefix based on the provided path.
 * @param path - The path to be prefixed. Should start with a slash.
 * @returns The URL with the prefix.
 */
export const urlPrefix = (path: string) => {
  if (path[0] !== "/") throw new Error(`Path ${path} should start with a slash (/).`);
  return `${process.env.REACT_APP_API_BASE_URL}${path}`;
};
