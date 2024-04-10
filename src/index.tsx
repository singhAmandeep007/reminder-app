import React from "react";
import { createRoot } from "react-dom/client";

import { i18n } from "modules/i18n";

import { App } from "./app";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

async function setupApp() {
  const mockerType = process.env.REACT_APP_MOCKER;

  if (!!mockerType && process.env.NODE_ENV === "development") {
    const mocker = await import("services/mocker");

    const { setupMocker } = mocker;

    setupMocker({ type: mockerType });
    // eslint-disable-next-line no-console
    console.log(`%c API is being mocked using ${mockerType}!`, "color: #bada55; font-weight: bold;");
  }

  await i18n.configure();

  return Promise.resolve();
}

const root = createRoot(document.getElementById("root") as HTMLElement);

setupApp()
  .then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Something went wrong in setting up app", error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
