/// <reference types="cypress" />

describe('Work with basic elements', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página

    })

    it('Text', ()=>{

        // todo o corpo da página
        cy.get('body')
        .should('contain', 'Cuidado onde clica, muitas armadilhas...')

        // Procurando por qualquer span -> Nesse caso vai achar 2 itens
        cy.get('span')
        .should('contain', 'Cuidado onde clica, muitas armadilhas...')

        // Procurando por qualquer span + classe
        cy.get('span[class="facilAchar"]')
        .should('contain', 'Cuidado onde clica, muitas armadilhas...')

        // elemento especifico buscado pela classe
        cy.get('.facilAchar')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', ()=>{

        cy.get('#resultado').should('have.text', 'Status: Nao cadastrado')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload() // refresh na página
        cy.get('#resultado').should('have.text', 'Status: Nao cadastrado')

    })

    it('Textfields', ()=>{
        cy.get('#formNome')
            .clear()
            .type('Gustavo')
            .should('have.value', 'Gustavo')

        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste123456{backspace}') // {backspace} para apagar
            .should('have.value', 'Teste12345')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Texto texto')
            .should('have.value', 'Texto texto')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro', {delay: 100})
            .type('{selectall}', {delay: 100})
            .type('acerto', {delay: 100})
            .should('have.value', 'acerto')
    })

    it('Radio button', ()=>{
        // Selecionar feminino e verificar que masculino não esta checkado
        cy.get('#formSexoFem')
            .check()
            .should('be.checked')

        cy.get('#formSexoMasc').should('be.not.checked')


        // Selecionar masculino e verificar que feminino não esta checkado
        cy.get('#formSexoMasc')
            .check()
            .should('be.checked')

        cy.get('#formSexoFem').should('be.not.checked')
        
    })

    it('Checkbox', ()=>{
        cy.get('#formComidaCarne')
            .check().should('be.checked')
            .uncheck().should('be.not.checked')

        cy.get('[name=formComidaFavorita]').check({multiple: true})
        cy.get('#formComidaCarne').should('be.checked')
        cy.get('#formComidaFrango').should('be.checked')
        cy.get('#formComidaPizza').should('be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')        
    })

    it('Combobox', ()=> {
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo') // Pode ser pesquisado pelo text ou pelo value
            .should('have.value', '2graucomp') // Aqui tem que ser o value

        cy.get('[data-test="dataEscolaridade"]')
            .select('1graucomp') // Pode ser pesquisado pelo text ou pelo value
            .should('have.value', '1graucomp') // Aqui tem que ser o value

        // Validando opção do combo

        cy.get('[data-test="dataEscolaridade"] option')
            .should('have.length', 8)
        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []
            $arr.each(function(){
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior","Mestrado"])
        })

    })

    it.only('Combo multiplo', ()=>{
        cy.get('[data-testid="dataEsportes"]').select(['natacao', 'Corrida', 'nada']) // Deve ser enviado o value
    
        // validar opções do combo múltiplo
        cy.get('[data-testid="dataEsportes"]').then($el =>{
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada'])
    })

})