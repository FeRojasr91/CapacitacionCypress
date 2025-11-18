import Login from '../support/Pages/Login'
import Productos from '../support/Pages/Productos'

describe('Realizar login',() =>{
    beforeEach(()=>{
        Login.accesarURL()
    })
    /*
    before => Se ejecuta una unica vez, una accion al inicio de nuestros test
    beforeEach => Una accion en común para todos nuestros Test se ejecuta al inicio de nuestros test
    after => se ejecuta una unica vez, la accion al final de nuestro test
    afterEach => Una accion en común para todos nuestros Test cuando finalizo la ejecucion.
    */

    it("Realizar Login con Éxito",()=>{        
        Login.completarUsername('standard_user')
        Login.completarPassword('secret_sauce')
        Login.clickEnLogin()
        Productos.validarLabelProductos()
    })

    it("Realizar Login con contraseña Fallida",()=>{        
        Login.completarUsername('standard_user')        
        Login.clickEnLogin()
        Login.validarMensajeError('Epic sadface: Password is required') //Otra forma a continuación
        Login.validarConContains('Password is required')
    })

    it("Realizar Login con usuario Fallido",()=>{        
        Login.completarPassword('secret_sauce')       
        Login.clickEnLogin()
        Login.validarMensajeError('Epic sadface: Username is required') //Otra forma a continuación
        Login.validarConContains('Username is required')
    })
})