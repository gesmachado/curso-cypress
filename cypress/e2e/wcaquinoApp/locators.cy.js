/// <reference types="cypress" />

describe('Work with basic elements', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página

    })

    it('CSS selector', ()=>{
        // Usando CSS selector
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input') // Buscou 1
        cy.get('[value="Clique aqui"]')// Buscou 5
        cy.get('[onclick*="Francisco"]')// Buscou 1

        cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
        cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input')

    })

    it('Xpath selector', ()=>{
        cy.xpath('. //*[@id="tabelaUsuarios"]/tbody/tr[1]/td[3]/input')// Buscou 1
        cy.xpath('(//input[@type="button"][@value="Clique aqui"])[3]')
        cy.xpath('//input[contains(@onclick, "Francisco")]')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains( . ,"Francisco")]/following-sibling::td/input')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains( . ,"Francisco")]/..//input[@type="text"]')
        cy.xpath('//td[contains(., "Usuario A")]/following-sibling::td[contains(., "Mestrado")]/..//input[@type="text"]')
            .type('Funciona')
    })

})