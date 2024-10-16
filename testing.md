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

## E2E

### Cypress

1. headless
   - `npm run cy:test -- --browser chrome` - Run tests in chrome browser in headless mode
   - `npm run cy:test -- --spec "cypress/specs/home.cy.ts"` - Run specific test file in headless mode
2. headed
   - `npm run cy:test:open` - Run tests in headed mode, closes on completion
   - `npm run cy:test:open -- --spec "cypress/specs/home.cy.ts"` - Run specific test file in headed mode
3. lauchpad
   1. first run `npm run cy:server:start` - Starts dev server with cypress env variables
   2. then run `npm run cy:open` in a new terminal - Opens cypress launchpad (need to be closed manually).
4. change `REACT_APP_MOCKER` in `.cypress.env` to switch between `msw` and `mirage`. Note: restart cypress after changing the value.

### Playwright

1. headless
   - `npm run pw:test` - Run tests in headless mode
   - `npm run pw:test specs/home.spec.ts` - Run specific test file in headless mode
2. ui mode
   - `npm run pw:test:open` - Stars dev server and then opens launchpad.
3. Only msw as a mocker is supported in playwright.
