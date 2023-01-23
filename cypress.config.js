const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true, //proteger o acesss token não aparece nas telas do teste
      requestMode: true, //adiciona feedback visual
    },
    experimentalRunAllSpecs: true, //habilita a execucao de todos os testes interativos 
  },
  fixturesFolder: false,
  video: false,
})

