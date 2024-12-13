module.exports = {
  e2e: {
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
