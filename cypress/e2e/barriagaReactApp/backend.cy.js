/// <reference types="cypress" />

const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

describe('Testar nível backend', ()=>{
    
    const nome = 'Gustavo'
    const email = 'gu-teste@teste.com' 
    const senha = 'teste123'
    let token 

    before('Login', ()=>{
        cy.getToken(email, senha)
            .then(tkn => {
                token = tkn
            })       
    })

    beforeEach('Ações antes de cada test', ()=>{
        // Reset
        cy.resetarBancoRest(token)
    })

    after('Fazendo logout', ()=>{
        // Reset
        cy.resetarBancoRest(token)

        // cy.logout()

    })

    it('Inserir conta', ()=>{

        cy.request({
            method: 'POST',
            headers: {Authorization : `JWT ${token}`},
            url: '/contas',
            body: {
                nome: "Minha Conta"
            }
        }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('nome', 'Minha Conta')
        })

    })

    it('Atualizar conta', ()=>{

        cy.request({
            method: 'GET',
            headers: {Authorization : `JWT ${token}`},
            url: '/contas',
            qs: {
                nome: "Conta para alterar"
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                headers: {Authorization : `JWT ${token}`},
                url: `/contas/${res.body[0].id}`,
                body: {
                    nome: "Conta alterada"
                }
            }).as('response')
        })
        

        
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('nome', 'Conta alterada')
        })

    })

    it('Tentar criar conta com nome repetido', ()=>{

        cy.request({
            method: 'POST',
            headers: {Authorization : `JWT ${token}`},
            url: '/contas',
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode:false
            
        }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })


    })

    it('Criação de transação e  validação de saldo', ()=>{
        let contaId
        // Criar movimentação
        cy.request({
            method: 'GET',
            headers: {Authorization : `JWT ${token}`},
            url: '/contas',
            qs: {
                nome: "Conta para movimentacoes"
            }
        }).then(res => {
            contaId = `${res.body[0].id}`
            console.log(contaId)
            const todaysDate = dayjs().format('DD/MM/YYYY')
            cy.request({
                method: 'POST',
                headers: {Authorization : `JWT ${token}`},
                url: '/transacoes',
                body: {
                    conta_id: contaId,
                    data_pagamento: todaysDate,
                    data_transacao: todaysDate,
                    descricao: "Trans teste",
                    envolvido: "Joao",
                    status: true,
                    tipo: "REC",
                    valor: "1500"
                }
            }).as('response')
        })
       
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
        })

        // Verificar saldo
        cy.request({
            method: 'GET',
            headers: {Authorization : `JWT ${token}`},
            url: `/saldo`,
            body: {

            }
        }).then(res =>{
            console.log(res)
            let saldoConta

            res.body.forEach(c =>{
                if(c.conta == 'Conta para movimentacoes'){
                    saldoConta = c.saldo
                } 
            })
            expect(saldoConta).to.be.equal('0.00')
        })
    })

    it('Remover movimentação', ()=>{
        cy.request({
            method: 'GET',
            url:'/transacoes',
            headers: {Authorization : `JWT ${token}`},
            qs:{ descricao: "Movimentacao para exclusao"} 
        }).then(res =>{
            cy.request({
                url:`/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                headers: {Authorization : `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })


    })

})