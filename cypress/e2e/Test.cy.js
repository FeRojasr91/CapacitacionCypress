///   <reference types='cypress' />

describe('Test - Formulario', () => {
  it('Completar los campos exitosamente', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('#name').type('Test') /*esto significa que va a escribir en el campo cuyo id=name (obtenido desde inspeccionar pág.*/     
    cy.get('input[placeholder="Enter EMail"]').type('test@email.com')/*se utiliza otra forma de escribir en el campo*/
    //cy.get('input[class="form-control"').type('912345678')/*otro método, cypress muestra el error ya que ese método esta 3 veces*/
    cy.get('#phone').type('912345678')
    cy.get('input[value="male"]').click()
    cy.get('input[type="checkbox"]').check('monday')
    cy.get('#country').select('Canada')
    cy.get('#colors').select('Red')
    cy.get('#datepicker').click()
    cy.get('a[data-date="24"]').click()
    cy.get('#datepicker').first().should('have.value','11/24/2025')/*uso de assert, para validar el valor*/
    cy.get('#singleFileInput').selectFile('cypress\\fixtures\\imageTest.png')
    cy.get('#singleFileInput').should('have.value','C:\\fakepath\\cypress\\fixtures\\imageTest.png')

    })  
  
    it.only('Validar botón Enter', () => { /*al agregar el .only, significa que sólo va a ejecutar esta prueba haciendola visible.*/
      cy.visit('https://testautomationpractice.blogspot.com/')
      cy.get('button[name="start"]').click()
      cy.get('button[name="stop"').should('be.visible')
    
  })
})