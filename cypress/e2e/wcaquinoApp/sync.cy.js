/// <reference types="cypress" />

describe('', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })

    it('Esperar campo esta disponível', ()=>{
        cy.get('#novoCampo').should('not.exist')

        cy.get('#buttonDelay').click()

        cy.get('#novoCampo').should('exist')
            .type('Botão esta visivel')
            .should('have.value', 'Botão esta visivel')
    })

    it('Esperar itens serem listados - uso do find', ()=>{
        // cy.get('#buttonList').click()
        cy.get('#buttonListDOM').click()

        // Forma normal e usando o .find()
        cy.get('#lista li span').should('contain', 'Item 1')
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1') //.find('span')

        cy.get('#lista li span').should('contain', 'Item 2')

    })

    it('Uso do timeout', ()=>{
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', {timeout: 4000}).should('exist') // mudar timeout pro teste passar
            .type('Botão esta visivel')
            .should('have.value', 'Botão esta visivel')


        cy.get('#buttonList').click()
        cy.get('#lista li span', {timeout: 10000}).should('have.length', 1)

        cy.get('#lista li span', {timeout: 10000}).should('have.length', 2)
    })

    it('Click retry', ()=>{
        cy.get('#buttonCount')
            .click()
            .should('have.value', '11')
    })

    it('Should vs Then - 1', ()=>{
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').then($el =>{ // then aguarda conclusão pra executar - should fica sendo executado até concluir
            console.log($el) // Com then terá apenas um log, com should haverá mais pois fica executando até o get terminar
            expect($el).to.have.length(1)
        })

    })

    it.only('Should vs Then - 2', ()=>{
        cy.get('#buttonListDOM').then($el =>{ 
            console.log($el)
            expect($el).to.have.length(1)
            return 2 // should ignora return, then não ignora o retorno
        })

    })


})


