declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getByDataAttr({attribute: 'testid', value: 'modal-header})
     */
    getByDataAttr(props: { attribute?: string; value: string }): Chainable<JQuery<HTMLElement>>;
  }
}
