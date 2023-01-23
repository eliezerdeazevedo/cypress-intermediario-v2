import { faker } from '@faker-js/faker' //biblioteca faker serve para gerar dados aleatorios e realizar os testes

const options = { env: { snapshotOnly: true } } //habilita o snapshot 

describe('Create Project', options, () => { //adiconado também o options para snapshot
  beforeEach(() => { // pre requisito que esteja logado 
    cy.api_deleteProjects() //funcao callback deleta os projetos criados antes fazer um novo
    cy.login() //executa comando login
  })

  //Criar um novo projeto no 
  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`, //gerar um nome do projeto-nome aleatório
      description: faker.random.words(5) // gera 5 palavras aleatorio
    }

    cy.gui_createProject(project) //ação

    //Resultados esperados
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`) //verifica a url
    cy.contains(project.name).should('be.visible') //verifica se na pagina esta visivel o nome do projeto e a descricao
    cy.contains(project.description).should('be.visible')
  })
})