import locators from './locators'

Cypress.Commands.add('acessarMovimentacao', ()=>{

    cy.get(locators.MENU.MOVIMENTACAO).click()
})

Cypress.Commands.add('acessarContas', ()=>{

    cy.get(locators.MENU.SEETINGS).click()
    cy.get(locators.MENU.CONTAS).click()

})

Cypress.Commands.add('acessarHome', ()=>{

    cy.get(locators.MENU.HOME).click()

})

Cypress.Commands.add('acessarExtrato', ()=>{

    cy.get(locators.MENU.EXTRATO).click()

})