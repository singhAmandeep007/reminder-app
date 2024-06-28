import { ReactNode } from "react";

const ReactDOM = jest.requireActual("react-dom");

module.exports = {
  ...ReactDOM,
  createPortal: (children: ReactNode) => children,
};
