Cypress.Commands.add('acessarURL', (url, componente) => {
   return cy.then(() => {
      cy.visit(url)

      //Componente que deve estar visivel na página para confirmar o carregamento da págia
      return cy.get(componente).should('exist').and('be.visible')
   }) 
});

Cypress.Commands.add('preencheCampo', (campo, valor) => {
   return cy.get(campo).should('be.visible').and('be.enabled').clear().type(valor)
})

Cypress.Commands.add('clicarBotao', (campo) => {
   return cy.get(campo).should('be.visible').click()
})

Cypress.Commands.add('esperaReloadPagina', (tempo) => {
   return cy.document({ timeout: tempo }).its('readyState').should('eq', 'complete')
})