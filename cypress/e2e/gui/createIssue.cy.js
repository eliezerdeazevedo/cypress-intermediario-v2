import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } } //habilita o snapshot 

//utilizando a faker para criar a issue com dados aleatorios
describe('Create Issue', options, () => { //adiconado também o options para snapshot
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }
//pre condicao faz o login e cria o projeto
  beforeEach(() => { // necessário estar logodo
    cy.api_deleteProjects() //funcao callback deleta os projetos criados antes fazer um novo
    cy.login() //executa o login
    cy.api_createProject(issue.project) //precondicao que um projeto estaja criado  // alterado de gui_createProject para api_createProject otimizando o processo 
  })

  //Acao - cria a issue
  it('successfully', () => {
    cy.gui_createIssue(issue) 

// resultado esperado 
    cy.get('.issue-details') //div que a classe .issue-details
      .should('contain', issue.title) //que contem titulo
      .and('contain', issue.description) //que contem a description
  })
})