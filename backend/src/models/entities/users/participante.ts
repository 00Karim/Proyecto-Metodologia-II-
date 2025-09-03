import { Rol } from "./rol.js"

class Participante extends Rol{
    constructor(nombre: string, contrasenia: string){
        super(nombre, contrasenia)
    }

    override get permisos(){
        return["crearActividad", "votar"]
    }

}