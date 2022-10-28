/// <reference types="cypress" />

describe('Cypress basic', ()=>{
    it.only('Should visit a page anda assert title', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        // cy.pause() // tem como executar passo a passo

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain', 'Campo')

        let syncTitle

        // Pegar o título pelo debug -> Usar .debug()
        // cy.title().debug()

        // imprimir o title no console
        cy.title().then(title =>{
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title

        })

        cy.title().should(title =>{
            console.log(title)
        })

        // Imprimir o titulo em um campo de texto

        cy.get('[data-cy="dataSobrenome"]').then($el =>{ //insere direto no value
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el =>{ //insere pelo type com wrap
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Interact with an element', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')
    }) 
})   