//teste de login simples sem cache
//describe('Login', () => {
//  it('successfully', () => {
//    cy.login() //executa comando login

//    cy.get('.qa-user-avatar').should('be.visible') // verifica se o elemento do avatar está na tela
//  })
//})
//final do teste de login simples

//Novo testes de login ignorando o cy.session 
describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false } //ignora o options do cy.session

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})
