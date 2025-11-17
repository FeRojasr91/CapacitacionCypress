
const el = require('./elements').ELEMENTS

class Login{
    
    accesarURL() {
        cy.visit(el.url)
        cy.contains('Swag Labs').should('be.visible')
        /*En caso de usar imagen para validar el assertion, se usa:
        cy.get(el.imgSwagLabs).should('be.visible')        
        */
    }

    completarUsername(username){
        cy.get(el.campoUsername).type(username)
    }

    completarPassword(password){
        cy.get(el.campoPassword).type(password)
    }

    clickEnLogin(){
        cy.get(el.botonLogin).click()
    }
    
    validarMensajeError(error){
        cy.get(el.msgError).should('have.text', error)
    }

    validarConContains(error){
        cy.contains(error).should('be.visible')
    }


}
export default new Login()