const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/', /**Se puede configurar también de esta forma el acceso a la URL para nuestros test */
    viewportWidth: 700,
    viewportHeight: 450,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
