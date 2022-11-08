/// <reference types="cypress" />

describe('Work with alert', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })

    it('Deve preencher campo de texto', ()=>{
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('Funciona')
                .should('have.value', 'Funciona')

            cy.on('window:alert', msg =>{
                expect(msg).to.be.equal('Alert Simples')
            })
        })
    })

    it('Deve testar fram diretamente', ()=>{
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()

        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Click OK!')
        })
    })
})