/// <reference types="cypress" />

describe('Work with popup', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })

    it('Deve verificar se o pop up foi invocado', ()=>{

        cy.window().then(win =>{
            cy.stub(win, 'open').as('winOpen')
        })

        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')

    })

    it('Deve testar popup diretamente', ()=>{
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()

        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Click OK!')
        })
    })

})

describe('With links - popup', ()=>{

    beforeEach('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Check popup url', ()=>{
        cy.contains('Popup2')
            .should('have.prop','href')
            .and('equal', 'https://wcaquino.me/cypress/frame.html')

    })

    it('Should access popup dinamically', ()=>{
        cy.contains('Popup2').then($a =>{
            const href =  $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('funciona').should('have.value', 'funciona')
        })
    })

    it('Force link on same page', ()=>{
        cy.contains('Popup2').invoke('removeAttr', 'target').click()
        cy.get('#tfield').type('funciona').should('have.value', 'funciona')

    })
})