/// <reference types="cypress" />

import locators from '../../support/locators'
import '../../support/commandsLoginLogout'
import '../../support/commandsContas'
import '../../support/commandsMovimentacao'
import '../../support/commandsMenus'

describe('Testar nível funcional', ()=>{
    before('Login', ()=>{
        cy.visit('https://barrigareact.wcaquino.me')

        // variaveis globais dos testes
        const nome = 'Gustavo'
        const email = 'gu-teste@teste.com'
        const senha = 'teste123'

        cy.login(email, senha, nome)

        // resetar massa de dados
        cy.resetarBanco()
    })

    after('Fazendo logout', ()=>{
        // resetar massa de dados
        cy.resetarBanco()

        cy.logout()

    })

    it('Inserir conta', ()=>{

        cy.acessarContas()
        cy.inserirConta('Minha Conta', 'true')

    })

    it('Atualizar conta', ()=>{

        cy.alterarConta('Conta para alterar','Conta alterada')

    })

    it('Tentar criar conta com nome repetido', ()=>{

        cy.acessarContas()

        cy.inserirConta('Conta mesmo nome', 'false')


    })

    it('Criação de transação e  validação de saldo', ()=>{
        cy.acessarMovimentacao()

        cy.novaMovimentacao('Minha movimentação', 1500, 'João','Conta para movimentacoes')

        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para movimentacoes')).should('contain', '0,00')
 
    })

    it('Remover movimentação', ()=>{

        cy.acessarExtrato()
        cy.xpath(locators.EXTRATO.FN_XP_DELETE('Movimentacao para exclusao')).click()
        cy.toastAlert(locators.MESSAGE,'Movimentação removida com sucesso!')

    })

})