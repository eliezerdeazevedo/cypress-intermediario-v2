describe('Logout', () => { //pre condicao que eu esteja logado e na página home
    beforeEach(() => { // antes de cada teste
      cy.login() //executa comando login
      cy.visit('/') // executa comando visit
    })
  
    it('successfully', () => {
      cy.logout() // executa comando 
  
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`) //verificar que a url deve ser igual após o logout
    })
  })