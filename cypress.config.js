const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000, // muda timeout da aplicação toda
  e2e: {
    baseUrl: 'https://barrigarest.wcaquino.me',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
