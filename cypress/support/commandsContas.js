import locators from './locators'

Cypress.Commands.add('inserirConta', (conta, condicao)=>{

    cy.get(locators.CONTAS.NOME).click().type(conta)
    cy.get(locators.CONTAS.BTN_SALVAR).click()

    if (condicao == 'true'){
        cy.toastAlert(locators.MESSAGE,'Conta inserida com sucesso')
        cy.xpath(`//table[contains(.,"${conta}")]`).should('exist')
    } else {    
        cy.toastAlert(locators.MESSAGE,'Erro: Error: Request failed with status code 400')
    }
})

Cypress.Commands.add('alterarConta', (conta_para_alterar, conta_alterada)=>{

    cy.xpath(`//table[contains(.,"${conta_para_alterar}")]`)
    cy.xpath(`//table//td[contains(.,"${conta_para_alterar}")]/..//i[@class="far fa-edit"]`).click()

    cy.get('[data-test="nome"]').click().clear().type(conta_alterada)
    cy.get('button[Alt="Salvar"]').click()

    cy.toastAlert('.toast-message','Conta atualizada com sucesso!')
    cy.xpath(`//table[contains(.,"${conta_alterada}")]`).should('exist')
})



