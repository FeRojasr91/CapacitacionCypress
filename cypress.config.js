const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 700,
    viewportHeight: 450,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
