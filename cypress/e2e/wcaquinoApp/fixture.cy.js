/// <reference types="cypress" />

describe('Fixture tests', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })

    it('Get data from fixture file', ()=>{

        cy.fixture('userData').as('usuario').then(function() {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy="dataSobrenome"]').type(this.usuario.sobrenome)
            cy.get(`#formSexo [value=${this.usuario.sexo}]`).check()
            cy.get(`#formComidaFavorita [value=${this.usuario.comida}]`).click()
            cy.get('[data-test="dataEscolaridade"]').select(this.usuario.escolaridade)
            cy.get('[data-testid="dataEsportes"]').select(this.usuario.esportes)

            cy.get('#formCadastrar').click()    
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    
        })


    })
})