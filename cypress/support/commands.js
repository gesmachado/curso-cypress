// ***********************************************
// This example commands.js shows you how to
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
import locators from './locators'

// xaquinoApp
Cypress.Commands.add('clickAlert', (locator, message)=>{
    cy.get(locator).click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal(message)
        })
})

// barrigaReactApp
Cypress.Commands.add('toastAlert', (locator, message)=>{
    cy.get(locator)
        .should('exist')
        .should('contain',message)
    cy.get('.toast-close-button').click({ multiple: true })

    cy.get(locator)
        .should('not.exist')
})

Cypress.Commands.add('resetarBanco', ()=>{
    cy.get(locators.MENU.SEETINGS).click()
    cy.get(locators.MENU.RESETAR).click()
    cy.toastAlert(locators.MESSAGE,'Dados resetados com sucesso!')

})

// API commands
Cypress.Commands.add('getToken', (email, senha)=>{
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: email,
            redirecionar: false,
            senha: senha,

        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })

})

Cypress.Commands.add('resetarBancoRest', (token)=>{
    cy.request({
        method: 'GET',
        headers: {Authorization : `JWT ${token}`},
        url: `/reset`,
        body: {

        }
    }).its('status').should('be.equal', 200)

})