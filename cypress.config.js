module.exports = {
  e2e: {
    baseUrl: "https://qastoredesafio.lojaintegrada.com.br/conta/login",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "junit",
    reporterOptions: {
      mochaFile: "results/output.xml",
      toConsole: false,
    },
  },
};
