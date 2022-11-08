import locators from './locators'

Cypress.Commands.add('login', (email, senha, nome)=>{
    cy.get(locators.LOGIN.USER).type(email)
    cy.get(locators.LOGIN.PASSWORD).type(senha)
    cy.get(locators.LOGIN.BTN_LOGIN).click()

    cy.toastAlert(locators.MESSAGE,`Bem vindo, ${nome}!`)
})

Cypress.Commands.add('logout', ()=>{
    cy.get(locators.MENU.SEETINGS).click()
    cy.get(locators.MENU.LOGOUT).click()

    cy.toastAlert(locators.MESSAGE,'Até Logo!')
})
