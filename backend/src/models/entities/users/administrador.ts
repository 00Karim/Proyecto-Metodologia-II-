import { Rol } from "./rol.js"

class Administrador extends Rol{
    constructor(nombre: string, mail:string, contrasenia: string){
        super(nombre, mail, contrasenia)
    }

    override get permisos(){
        return["eliminarParticipante","agregarParticipante", "crearActividad","borrarActividad", "borrarTrip", "votar"]
    }

}