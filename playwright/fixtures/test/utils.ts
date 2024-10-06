import { Route } from "@playwright/test";

// NOTE: Handling Playwright request via MSW handlers
// READ-MORE: https://mswjs.io/docs/api/get-response
import { getResponse, RequestHandler } from "msw";

export const convertRouteToRequest = async (route: Route): Promise<Request> => {
  const request = route.request();

  const url = new URL(request.url());
  const method = request.method();
  const headers = await request.allHeaders();
  const postData = request.postData();

  return new Request(url, {
    method,
    headers,
    body: postData || undefined,
  });
};

export const objectifyHeaders = (headers?: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  if (!headers) return result;

  headers.forEach((value, key) => (result[key] = value));
  return result;
};

export const handleRoute = async ({ route, handlers }: { route: Route; handlers: Array<RequestHandler> }) => {
  try {
    const request = await convertRouteToRequest(route);

    const response = await getResponse(handlers, request);

    return route.fulfill({
      status: response?.status,
      body: await response?.text(),
      contentType: response?.headers.get("content-type") ?? undefined,
      headers: objectifyHeaders(response?.headers),
    });
  } catch (e) {
    await route.abort();
  }
};
