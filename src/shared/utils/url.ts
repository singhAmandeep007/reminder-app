export function appendQueryParams<T extends Record<string, string>>(url: string, queryParams: T) {
  const queries = Object.keys(queryParams);

  for (let i = 0; i < queries.length; i++) {
    const key = queries[i];
    const value = queryParams[key];
    if (value === undefined) {
      continue;
    }

    if (i === 0) {
      url += "?";
    }

    url += `${key}=${queryParams[key]}`;
    if (i !== queries.length - 1) {
      url += "&";
    }
  }
  return url;
}

export const getUrlSearchParams = (url: string) => {
  const urlParams = new URL(url).searchParams;
  const keyValuePairs = {} as Record<string, string>;
  for (const [key, value] of urlParams.entries()) {
    keyValuePairs[key] = value;
  }
  return keyValuePairs;
};
