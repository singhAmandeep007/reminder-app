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
2. When to use `act` - https://github.com/threepointone/react-act-examples/blob/master/sync.md

## Mirage

1. Print all entities in db - `console.log(testMirageServer.db.dump());`
2. [Track requests for assertions](https://miragejs.com/docs/testing/assertions/#asserting-against-handled-requests-and-responses)

## MSW + Cypress

1. https://github.com/mswjs/msw/issues/1560

## Mirage + Cypress

1. https://miragejs.com/quickstarts/cypress/

## Popper issue

1. https://github.com/floating-ui/react-popper/issues/350

## Conventions followed

### test ids

1. testId - `data-testid`
2. kebab case - `long-test-id`
3. single test id as prop - `testId: 'id'`
4. multiple test id as prop - `testIds: { id1: 'id-1', id2: 'id-2' }`
