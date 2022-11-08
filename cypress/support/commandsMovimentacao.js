import locators from './locators'

Cypress.Commands.add('novaMovimentacao', (desc_mov,valor_mov, interessado_mov,conta)=>{
    cy.get(locators.MOVIMENTACAO.DESCRICAO).click().type(desc_mov)
    cy.get(locators.MOVIMENTACAO.VALOR).click().type(valor_mov)
    cy.get(locators.MOVIMENTACAO.INTERESSADO).click().type(interessado_mov)
    cy.get( locators.MOVIMENTACAO.CONTA).select(conta)
    cy.get(locators.MOVIMENTACAO.STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    // Validações
    cy.toastAlert(locators.MESSAGE,'Movimentação inserida com sucesso!')
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO(desc_mov)).should('exist')
    // cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO(valor_mov)).should('exist')
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO(interessado_mov)).should('exist')
    cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
    
})