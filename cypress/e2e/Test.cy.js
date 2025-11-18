///   <reference types='cypress' />

describe('Test - Formulario', () => {
  it('Completar los campos exitosamente', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.contains('Automation Testing Practice').should('be.visible')
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
  
  it('Validar botón Enter', () => { /*al agregar el it.only, significa que sólo va a ejecutar esta prueba haciendola visible.*/
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('button[name="start"]').click()
    cy.get('button[name="stop"]').should('be.visible')/*se muestra uso de contains a continuación*/
    cy.contains('STOP').should('be.visible')
    cy.contains('button','STOP').click()
  })

  it('Selección de elementos de tipo checkbox', () =>{
    /**Ejemplos de tamaño de imagen de mi cypress */
    //cy.viewport(500,330)
    cy.viewport('ipad-mini', "landscape") //Al usar landscape invierte las dimensiones
    cy.visit('https://testautomationpractice.blogspot.com/')
    //cy.get('input[type="checkbox"][class="form-check-input"]').check()/*Realiza un chequeo de todas las opciones, seleccionandolas*/
    cy.get('input[type="checkbox"][class="form-check-input"]').each(($check)=>{/*Recupero todos los elementos tipo checkbox del form check input. Con each itero sobre un conjunto de elementos*/
        //de los elementos, genero por ejemplo (una lista): [checkbox1, checkbox2,....]
      const valueText = $check.attr('value') /*el elemento que obtengo en check (sacando el atributo value) lo guardo en una const tipo texto */
      if(valueText.startsWith('s')){ /**El inicia con la letra "S" */
        cy.wrap($check).check()   //Va a seleccionar solo los elementos que empiezan con "s"     
      }
    })
  })

  xit('Link que abre una nueva pestaña', () =>{ /**Al usar xit, significa que este test queda deshabilitado, por tanto, no corre*/
    cy.visit('https://testautomationpractice.blogspot.com/')
    //cy.get('button[onclick="myFunction()"]').click()
    cy.get('button[onclick="myFunction()"]').invoke('removeAttr','onclick').click()/**Vamos a remover la funcion onclick para que no se abra una nueva pestaña aparte */
    
  })


})