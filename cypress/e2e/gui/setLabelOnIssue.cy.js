import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } } // ativa o snapshot

describe('Set label on issue', options, () => { // cria a isssue com dados aleatorios
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }
// cria a label com nome aleatorio e cor
  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb' //background color 
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createLabel(response.body.project_id, label)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => { //verificar se a label foi criada
    cy.gui_setLabelOnIssue(label)

    cy.get('.qa-labels-block').should('contain', label.name)
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
  })
})
