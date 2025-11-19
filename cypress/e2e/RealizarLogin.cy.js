/// <reference types='cypress' />
import Login from '../support/Pages/Login'
import Productos from '../support/Pages/Productos'
import {crearDestinatario} from '../support/Factories/destinatario.js'

describe('Realizar login', function(){

    const credencialesObj ={
        standard: 'standard_user',
        locked: 'locked_out_user',
        password: 'secret_sauce'
    }

    before(function(){
        cy.fixture('credencialesFixture').then((dados)=>{
            this.credencialesExt = dados
        })
    })

    beforeEach(function(){
        Login.accesarURL('/')
        cy.url().should('include','saucedemo')/**Validamos que nuestra URL tenga la palabra saucedemo */
    })


    /*
    before => Se ejecuta una unica vez, una accion al inicio de nuestros test, incluso antes de nuestro beforeEach
    beforeEach => Una accion en común para todos nuestros Test se ejecuta al inicio de nuestros test
    after => se ejecuta una unica vez, la accion al final de todos nuestros test
    afterEach => Una accion en común para cada uno de nuestros Test cuando finalizo la ejecucion.
    */

    it("Realizar Login con Éxito", function(){        
        Login.completarUsername(this.credencialesExt.users.standard)
        Login.completarPassword(this.credencialesExt.password.passwordValido)
        Login.clickEnLogin()
        Productos.validarLabelProductos()
    })

    it("Realizar Login con contraseña Fallida",function(){        
        Login.completarUsername(credencialesObj.standard)        
        Login.clickEnLogin()
        Login.validarMensajeError('Epic sadface: Password is required') //Otra forma a continuación
        Login.validarConContains('Password is required')
    })

    it("Realizar Login con usuario Fallido",function(){        
        Login.completarPassword(credencialesObj.password)       
        Login.clickEnLogin()
        Login.validarMensajeError('Epic sadface: Username is required') //Otra forma a continuación
        Login.validarConContains('Username is required')
    })

    const destinatarioFaker = crearDestinatario()

    it.only("Realizar compra con usuario exitoso", function(){
        Login.completarUsername(this.credencialesExt.users.standard)
        Login.completarPassword(this.credencialesExt.password.passwordValido)
        Login.clickEnLogin()
        Productos.validarLabelProductos()
        cy.get('button[class="btn btn_primary btn_small btn_inventory "]').first().click()        
        //Consultar el carro
        cy.get('a[class="shopping_cart_link"]').click()
        cy.get('button[class="btn btn_action btn_medium checkout_button "]').click()
        //Creo al final lo necesario para el formulario de manera dinamica utilizando la biblioteca "faker"
        cy.get('#first-name').type(destinatarioFaker.firstName)
        cy.get('#last-name').type(destinatarioFaker.lastName)
        cy.get('#postal-code').type(destinatarioFaker.zipCode)

        cy.get('input[class="submit-button btn btn_primary cart_button btn_action"]').click()  
        cy.get('button[class="btn btn_action btn_medium cart_button"]').click()        
        cy.get('h2[class="complete-header"]').should('have.text','Thank you for your order!')

        //Para generar valores dinamicos:
        let valorAleatorio = Cypress._.random(0,5)
    

    })
})