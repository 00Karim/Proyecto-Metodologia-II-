import { Rol } from "./rol.js"

class Administrador extends Rol{
    constructor(nombre: string, contrasenia: string){
        super(nombre, contrasenia)
    }

    override get permisos(){
        return["eliminarParticipante","agregarParticipante", "crearActividad","borrarActividad", "borrarTrip", "votar"]
    }

}