const locators ={
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: 'button[type="submit"'
    },
    MENU:{
        HOME: '[data-test=menu-home]',
        SEETINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESETAR: '[href="/reset"]',
        LOGOUT: '[href="/logout"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test="menu-extrato"]'

    },
    CONTAS:{
        NOME: '[data-test="nome"]',
        BTN_SALVAR:'button[Alt="Salvar"]',
        XP_CONTA_EXISTE: ''

    },
    MOVIMENTACAO:{
        DESCRICAO: '[data-test=descricao]',
        VALOR:'[data-test=valor]',
        INTERESSADO:'[data-test=envolvido]',
        STATUS: '[data-test=status]',
        CONTA: '[data-test="conta"]',
        BTN_SALVAR:'.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: el => `//div[@class="list-group"]//div[@class='col-12 col-md-9' and contains(.,"${el}")]`,
        FN_XP_DELETE: el => `//span[contains(., '${el}')]/../../../div[2]//i[@class="far fa-trash-alt"]`
    },
    SALDO:{
        FN_XP_SALDO_CONTA: el => `//td[contains(., '${el}')]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators;