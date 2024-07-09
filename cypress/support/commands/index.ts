/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "@testing-library/cypress/add-commands";

/**
 *
 * @example
 * <div data-testid="modal-header"></div>
 * cy.getByDataAttr({value:"modal-header", attribute: "testid"})
 */
Cypress.Commands.addQuery("getByDataAttr", ({ value, attribute = "cy" }) => {
  const getFn = cy.now("get", `[data-${attribute}="${value}"]`);
  return (subject) => {
    if (typeof getFn === "function") {
      return getFn(subject);
    }
  };
});

Cypress.Commands.add("skipIf", (expression: boolean, context: Mocha.Context) => {
  if (expression) context.skip.bind(context)();
});

Cypress.on("uncaught:exception", (err, runnable, promise) => {
  return false;
});
