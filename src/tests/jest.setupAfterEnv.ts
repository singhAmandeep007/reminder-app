// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver;

// Mocking the ENV variables
// @ts-ignore
process.env.REACT_APP_PUBLIC_URL = "http://localhost";

// Mocking the matchMedia API
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };
