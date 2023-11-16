describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/dropmail')
    cy.get('.btn-generate').click()
    cy.get('.copy').click()
    cy.get('.notification').click()
  })
})