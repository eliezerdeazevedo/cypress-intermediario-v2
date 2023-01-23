// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Comando de login sem Cache
//Cypress.Commands.add('login', ( //comando para login usando arquivo com os dados 
//    user = Cypress.env('user_name'),
//    password = Cypress.env('user_password'),
//  ) => {
//    const login = () => {
//      cy.visit('/users/sign_in') // o inicio do endereço esta no arquivo cypress.env http://localhost/users/sign_in
  
//      cy.get("[data-qa-selector='login_field']").type(user) // digitando user no elemento
//      cy.get("[data-qa-selector='password_field']").type(password, { log: false }) //digitando a senha no elemento e log falase não mostra log da senha
//      cy.get("[data-qa-selector='sign_in_button']").click()
//    }
  
//    login()
//  })
//Final Comando de login sem chache


//Inicio Comando de login com cache e validação 
//além da possibilidade de compartilhar a sessão entre _specs_, também estamos habilitando a possibilidade de validar se a mesma ainda é válida, e caso não seja, a função de _setup_ (`login`) será executada pelo comando `cy.session`.
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in') //verificar se a url não é sign_in caso não seja ele usa o validate
  }

  const options = {
    cacheAcrossSpecs: true, //compartilha o chache de login com outras specs
    validate, //executa o validate em casos que não esteja logado e a url seja diferente da pagina de login
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})
//final do Comando de login com Cache e validate



// Inicio comando de logout
  Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click() //vai clicar no avatar    
    cy.contains('Sign out').click()
  })
//Final do camando de logout

//Inicio do comando de criação de projeto
 Cypress.Commands.add('gui_createProject', project => { //nome da variavel do comando
   cy.visit('/projects/new') //visita a pagina /project/new
  
   cy.get('#project_name').type(project.name) //no elemento id nome do projeto adiciona a funçao faker do nome
   cy.get('#project_description').type(project.description) //no elemento id descricao adiciona a funcao faker de descricao
   cy.get('.qa-initialize-with-readme-checkbox').check() //elemento Classe verifica se o checkbox esta marcado
   cy.contains('Create project').click() //clica em create project
  })
  //Final do camando de criacao de projetos


  //Inicio comando para criar issue

  Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`) //visita a issue do projeto que foi criado antes
  
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
  })

  //final do comando para criar issue


  //inicio do comando para setar a label
  Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  })
  //final do comando para setar a label

// Inicio comando para setar milestone
  Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
  })

  // Final do comando para setar milestone

