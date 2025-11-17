import Login from '../support/Pages/Login'
import Productos from '../support/Pages/Productos'
describe('Realizar login',() =>{

    it("Realizar Login con Éxito",()=>{
        Login.accesarURL()
        Login.completarUsername('standard_user')
        Login.completarPassword('secret_sauce')
        Login.clickEnLogin()
        Productos.validarLabelProductos()
    })

    it("Realizar Login con contraseña Fallida",()=>{
        Login.accesarURL()
        Login.completarUsername('standard_user')        
        Login.clickEnLogin()
        Login.validarMensajeError('Epic sadface: Password is required') //Otra forma a continuación
        Login.validarConContains('Password is required')
    })

    it.only("Realizar Login con usuario Fallido",()=>{
        Login.accesarURL()
        Login.completarPassword('secret_sauce')       
        Login.clickEnLogin()
        Login.validarMensajeError('Epic sadface: Username is required') //Otra forma a continuación
        Login.validarConContains('Username is required')
    })
})