import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { LOGIN_ELEMENTS} from '../elements/login.elements';
import { ALL_ITENS_ELEMENTS} from '../elements/all-itens.elements';
import { faker } from '@faker-js/faker';

Given('que o usuário está na tela de login', () => {
   cy.acessarURL(LOGIN_ELEMENTS.URL_LOGIN, LOGIN_ELEMENTS.inpUsername)
});

Given('preenche os campos de email e senha que não estão cadastrados no ecommerce', () => {
   const username = faker.internet.username();
   const password = faker.internet.password();

   cy.wrap(username).then((user) => {
      cy.preencheCampo(LOGIN_ELEMENTS.inpUsername, user)
   });
   
   cy.wrap(password).then((pass) => {
      cy.preencheCampo(LOGIN_ELEMENTS.inpPassword, pass)
   });
})

When('clicar no botão "Login"', () => {
   cy.clicarDOM(LOGIN_ELEMENTS.btnLogin)
});

Then('o sistema retorna o aviso "Epic sadface: Username and password do not match any user in this service"', () => {
   cy.esperaReloadPagina(30000)
   cy.VerificaTxtVisivel('Epic sadface: Username and password do not match any user in this service')
})

When('tenta logar-se com usuário bloqueado', () => {


  cy.ExtrairValorJSON('credenciais', 'locked_out_user').then((usuario) => {
    cy.preencheCampo(LOGIN_ELEMENTS.inpUsername,usuario.login); // locked_out_user
    cy.preencheCampo(LOGIN_ELEMENTS.inpPassword,usuario.senha); // secret_sauce
});

   cy.clicarDOM(LOGIN_ELEMENTS.btnLogin)
})

Then('deve visualizar a mensagem "Epic sadface: Sorry, this user has been locked out."', () => {
   cy.esperaReloadPagina(30000)
   cy.VerificaTxtVisivel('Epic sadface: Sorry, this user has been locked out.')
})

Given('que o ecommerce possui múltiplos usuários cadastrados', () => {
   cy.acessarURL(LOGIN_ELEMENTS.URL_LOGIN, LOGIN_ELEMENTS.inpUsername)

   const usuarios = [
      'standard_user',
      'problem_user',
      'error_user',
      'visual_user',
      'performance_glitch_user'
   ]

   cy.wrap(usuarios).as('usuariosCadastrados')
});

Then('o sistema autentica corretamente e concede acesso à conta correspondente quando o usuário faz login', () => {

   const txtConfirmacaoLogin = 'Products'
   const txtConfirmacaoLogout = 'Accepted usernames are:'
   const tmpLimite = 1000

   cy.get('@usuariosCadastrados').each((user) => {
      return cy.ExtrairValorJSON('credenciais', user).then((usuario) => {
         cy.preencheCampo(LOGIN_ELEMENTS.inpUsername, usuario.login);
         cy.preencheCampo(LOGIN_ELEMENTS.inpPassword, usuario.senha);
         const inicio = performance.now()

cy.clicarDOM(LOGIN_ELEMENTS.btnLogin)

cy.contains('Products').then(() => {

    const tempo = performance.now() - inicio

    expect(tempo).to.be.lessThan(1000)

})

         return cy.aguardarTxtVisivel(txtConfirmacaoLogin, tmpLimite).then(() => {
            cy.clicarDOM(ALL_ITENS_ELEMENTS.btnNavegacao)
            cy.clicarTxt(ALL_ITENS_ELEMENTS.aLogout) 
            
            return cy.aguardarTxtVisivel(txtConfirmacaoLogout, tmpLimite)
         })
      })
   })
});

