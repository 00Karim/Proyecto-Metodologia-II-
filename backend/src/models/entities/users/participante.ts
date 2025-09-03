import { Rol } from "./rol.js"

class Participante extends Rol{
    constructor(nombre: string, mail: string, contrasenia: string){
        super(nombre, mail, contrasenia)
    }

    override get permisos(){
        return["crearActividad", "votar"]
    }

}