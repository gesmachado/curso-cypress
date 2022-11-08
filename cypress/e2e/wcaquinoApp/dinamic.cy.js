/// <reference types="cypress" />

describe('dinamic tests', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })
    
    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {

        it(`Cadastro com comida variada - ${food}`, ()=>{
            cy.get('#formNome').type('Usuario')
            cy.get('[data-cy="dataSobrenome"]').type('Qualquer')
            cy.get('#formSexo [value=F]').check()
            cy.xpath(`//table[@id="formComidaFavorita"]//label[contains(., "${food}")]`).click()
            cy.get('[data-test="dataEscolaridade"]').select('Mestrado')
            cy.get('[data-testid="dataEsportes"]').select('Corrida')
    
            cy.get('#formCadastrar').click()    
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    
        })
        
    })

    it.only('Deve selecionar todas as comidas', ()=>{

        cy.get('#formNome').type('Usuario')
        cy.get('[data-cy="dataSobrenome"]').type('Qualquer')
        cy.get('#formSexo [value=F]').check()

        cy.get('[name=formComidaFavorita]').each($el =>{
            if($el.val() != 'vegetariano')
                cy.wrap($el).click()
        })
        cy.get('[data-test="dataEscolaridade"]').select('Mestrado')
        cy.get('[data-testid="dataEsportes"]').select('Corrida')
        cy.get('#formCadastrar').click()    
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')


    })

    
})