describe('Test - Formulario', () => {
  it('Completar los campos exitosamente', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('#name').type('Test') /*esto significa que va a escribir en el campo cuyo id=name (obtenido desde inspeccionar pág.*/     
    cy.get('input[placeholder="Enter EMail"]').type('test@email.com')/*se utiliza otra forma de escribir en el campo*/
    //cy.get('input[class="form-control"').type('912345678')/*otro método, cypress muestra el error ya que ese método esta 3 veces*/
    cy.get('#phone').type('912345678')
    })
  it('Enviar Archivos', () => {
    //cy.visit('https://example.cypress.io')
  })
})