const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000, // muda timeout da aplicação toda
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
