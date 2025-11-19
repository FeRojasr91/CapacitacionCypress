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
        //cy.url().should('include','saucedemo')/**Validamos que nuestra URL tenga la palabra saucedemo */
        //se deja oculta lo anterior, ya que se tratará de trabajar sobre lo agregado en commands.js, editando tambn 
        //cy.visit(url) por cy.visit(url, 'saucedemo') agregado en index.js
    })


    /*
    before => Se ejecuta una unica vez, una accion al inicio de nuestros test, incluso antes de nuestro beforeEach
    beforeEach => Una accion en común para todos nuestros Test se ejecuta al inicio de nuestros test
    after => se ejecuta una unica vez, la accion al final de todos nuestros test
    afterEach => Una accion en común para cada uno de nuestros Test cuando finalizo la ejecucion.
    */

    it("Realizar Login con Éxito", function(){        
        //Login.completarUsername(this.credencialesExt.users.standard)
        //Login.completarPassword(this.credencialesExt.password.passwordValido)
        //Login.clickEnLogin()

        //Con el código a continuación importamos lo realizado en commands:
        cy.realizarLogin(this.credencialesExt.users.standard,this.credencialesExt.password.passwordValido) /**Si utilizo esto en vez de los 3 Login., estaría usando lo configurado en el archivo commands */
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
        //cy.get('button[class="btn btn_primary btn_small btn_inventory "]').first().click() /**Aquí se selecciona el primer item */

        //A continuación para seleccionar un item al azar se usa lo siguiente 
        let elIndex = Cypress._.random(0, 5)
        cy.log(`Número: ${elIndex}`)

        cy.get('button[class="btn btn_primary btn_small btn_inventory "]').eq(elIndex)

        /* Otra opción más robusta en vez del eq
        cy.get('button[class="btn btn_primary btn_small btn_inventory "]').each(($btn, $index)=>{ //each recorro cada elemento de mi lista
            if ($index === elIndex){
                cy.wrap($btn).click()
            }
        })*/

        //Consultar el carro
        cy.get('a[class="shopping_cart_link"]').click()        

        cy.validarCSS('div[class="header_secondary_container"','color','rgb(19, 35, 34)') /**Se utilia el validarCSS creado desde el archivo commands.js */
        

        cy.get('div[class="header_secondary_container"').should('have.css','font-size', '14px').and('have.css','color','rgb(19, 35, 34)')
        cy.get('button[class="btn btn_action btn_medium checkout_button "]').should('have.css', 'background-color', 'rgb(61, 220, 145)') /**Se agrega una validación sobre el color de fondo del botón */
        cy.get('button[class="btn btn_action btn_medium checkout_button "]').click()
        
        //Creo al final lo necesario para el formulario de manera dinamica utilizando la biblioteca "faker"
        //cy.get('#first-name').type(destinatarioFaker.firstName)
        //cy.get('#last-name').type(destinatarioFaker.lastName)
        //cy.get('#postal-code').type(destinatarioFaker.zipCode)

        // los 3 get anteriores se ocultan para mostrar un ejemplo a continuación usando lo configurado en archivo commands.js

        cy.informarDestinatario(destinatarioFaker.firstName, destinatarioFaker.lastName, destinatarioFaker.zipCode)

        cy.get('input[class="submit-button btn btn_primary cart_button btn_action"]').click()  
        cy.get('button[class="btn btn_action btn_medium cart_button"]').click()        
        cy.get('h2[class="complete-header"]').should('have.text','Thank you for your order!')

       
    

    })
})