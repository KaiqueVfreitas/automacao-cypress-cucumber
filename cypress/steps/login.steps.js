import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { LOGIN_ELEMENTS } from '../elements/login.elements';
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
   cy.clicarBotao(LOGIN_ELEMENTS.btnLogin)
});

Then('o sistema retorna o aviso "Epic sadface: Username and password do not match any user in this service"', () => {
   cy.esperaReloadPagina(30000)
   cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
})

