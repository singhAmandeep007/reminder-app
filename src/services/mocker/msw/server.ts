import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const runServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${PUBLIC_URL}mockServiceWorker.js`,
    },
  });
};
