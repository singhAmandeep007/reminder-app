## Mannual mocks

1. Docs:
   1. https://jestjs.io/docs/manual-mocks
1. Issues:
   1. https://github.com/facebook/create-react-app/issues/7539

## Setting up MSW with Jest(JSDOM)

1. Docs:
   1. https://github.com/mswjs/examples/blob/main/examples/with-jest-jsdom/README.md
   2. https://mswjs.io/docs/migrations/1.x-to-2.x/#requestresponsetextencoder-is-not-defined-jest

## RTL

1. Print whole JSDOM object - `screen.debug(result.container, Infinity);`

## Mirage

1. Print all entities in db - `console.log(testMirageServer.db.dump());`
2. [Track requests for assertions](https://miragejs.com/docs/testing/assertions/#asserting-against-handled-requests-and-responses)
