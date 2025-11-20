// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('realizarLogin', (user, password) => {
    cy.get('#user-name').type(user)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
 })

 Cypress.Commands.add('validarCSS',(selector, atributo, valor)=>{
    cy.get(selector).should('have.css', atributo, valor)

 })

 Cypress.Commands.add('informarDestinatario',(firstName, lastName, zipCode)=>{
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#postal-code').type(zipCode)
 })

/*Cypress.Commands.overwrite('visit', (url, validarContenido)=>{
    cy.visit(url)
    cy.url().should('contain', validarContenido)
})
*/

Cypress.Commands.add('newVisit', (url) => {
   //Validar que la URL sea un string válido
   if (typeof url !== 'string' || !/^https?:\/\//.test(url)){
      throw new Error('newVisit: URL inválida');
   }
   //Crea una nueva ventana de navegación
   cy.window({ log: false }).then((win) => {
      win.addEventListener('load', () => resolve(), {once:true });
      // activar la navegación
      win.location.href = url;
   });

   //Comprueba si el documento está en estado 'Completo'
   cy.document().its('readyState').should('equal', 'complete');
});




//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })