/// <reference types="cypress" />

describe('Work with clock', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })

    it('Going to back to the past', ()=>{

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 1, 3, 12, 10, 5)
        cy.clock(dt.getTime())

        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '03/02/2012 12:10:05')
    })

    it('Goes to the future', ()=>{
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1')
        // cy.get('#resultado > span').invoke('text').should('gt',1)

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '0')

        cy.get('#resultado > span').then($str_1 =>{
            const num_1 = parseInt($str_1.text())
            console.log(num_1)
            expect(num_1).to.be.lte(0)
        })

        cy.tick(1000) // quando colocar clock deve usar tick pra continuar mockando
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1000')


        cy.get('#resultado > span').then($str_2 =>{
            const num_2 = parseInt($str_2.text())
            console.log(num_2)
            expect(num_2).to.be.gte(1000)
        })

        



    })
})