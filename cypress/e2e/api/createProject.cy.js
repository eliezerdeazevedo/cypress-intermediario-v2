import { faker } from '@faker-js/faker'

describe('Create Project', () => {
beforeEach(() => cy.api_deleteProjects()) //funcao callback deleta os projetos criados antes fazer um novo

  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    //apos criar o projeto verifica as respostas
    cy.api_createProject(project)
      .then(response => {
        expect(response.status).to.equal(201) //verifica status
        expect(response.body.name).to.equal(project.name) // verifica o nome do projeto
        expect(response.body.description).to.equal(project.description) //verifica a descrição
      })
  })
})