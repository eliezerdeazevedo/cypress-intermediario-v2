const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}` //token que está no arquivo env

//Comando para enviar dados para api pra criar o projeto
Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/`,
    body: {
      name: project.name, //project.name name=definido no arquivo createProject.cy.js
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
})
//Final do comando para criar projeto por API


//Comandos para fazer um get nos projetos e para deletar
Cypress.Commands.add('api_getAllProjects', () => {
    cy.request({
      method: 'GET',
      url: '/api/v4/projects/',
      headers: { Authorization: accessToken },
    })
  })
  
  Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_getAllProjects().then(res =>
      res.body.forEach(project => cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${project.id}`,
        headers: { Authorization: accessToken },
      }))
    )
  })
//final dos comandos para get e delete dos projetos

//incio comandos para criar issue
Cypress.Commands.add('api_createIssue', issue => {
  cy.api_createProject(issue.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues`, //url id esta de forma dinamica
        body: {
          title: issue.title,
          description: issue.description
        },
        headers: { Authorization: accessToken },
      })
  })
})
//final dos comandos para criar issues

//inicio comando para criar label
Cypress.Commands.add('api_createLabel', (projectId, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels`,
    body: {
      name: label.name,
      color: label.color
    },
    headers: { Authorization: accessToken },
  })
})
//final do comando para criar label

//inicio comando para criar um milestone
Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones`,
    body: { title: milestone.title },
    headers: { Authorization: accessToken },
  })
})
// Final do comando para criar um milestone

