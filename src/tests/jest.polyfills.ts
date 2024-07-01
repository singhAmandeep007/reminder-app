/**
 * @link https://github.com/mswjs/msw/discussions/1934
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

// @ts-ignore
const { TextDecoder, TextEncoder } = require("node:util");
const { ReadableStream, TransformStream } = require("node:stream/web");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
});

const { Blob, File } = require("node:buffer");

const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});

//  mocking the environment variables

// @ts-ignore
process.env.REACT_APP_PUBLIC_URL = "http://localhost";
// @ts-ignore
process.env.REACT_APP_API_URL = "http://localhost/api/v1/";
