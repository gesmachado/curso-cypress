/// <reference types="cypress" />

describe('Helpers', ()=>{
    before('Open page', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach('Before each test', ()=>{
        cy.reload() // refresh na página
    })

    it('Wrap', ()=>{
        const obj = {nome: 'user', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        // cy.get('#formNome').then($el =>{
        //     cy.wrap($el).type('Funciona')
        // })

        const promise = new Promise((resolve, reject) =>{
            setTimeout(()=>{
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(()=> console.log('Encontrei o botão 1'))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(()=> console.log('Encontrei o botão 2'))

    })

    it('Its...', ()=>{
        const obj = {nome: 'user', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'user')
        cy.wrap(obj).its('nome').should('be.equal','user')

        const obj_2 = {nome: 'user', idade: 20, endereco: {rua: 'rua dos bobos'}}

        cy.wrap(obj_2).its('endereco').should('have.property','rua')
        cy.wrap(obj_2).its('endereco').its('rua').should('contain','rua dos bobos')
        cy.wrap(obj_2).its('endereco.rua').should('contain','rua dos bobos')

        cy.title().its('length').should('be.equal', 20)

    })

    it.only('Invoke', ()=>{
        const getValue = ()=> 1;
        const soma = (a,b) => a+b
        cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('fn',2,5).should('be.equal', 7)

        cy.get('#formNome').invoke('val', 'Texto via invoke').should('have.value', 'Texto via invoke')
        cy.window().invoke('alert','Da pra ver?')

        // Muda o html da página
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked" />')
    })

})


