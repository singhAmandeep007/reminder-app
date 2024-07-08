/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getByDataAttr({attribute: 'testid', value: 'modal-header})
     */
    getByDataAttr(props: { attribute?: string; value: string }): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command which will skip a test or context based on a boolean expression.
     *
     * You can call this command from anywhere, just make sure to pass in the the it, describe, or context block you wish to skip.
     *
     * @example cy.skipIf(yourCondition, this);
     */
    skipIf(expression: boolean, context: Mocha.Context): void;
  }
}
