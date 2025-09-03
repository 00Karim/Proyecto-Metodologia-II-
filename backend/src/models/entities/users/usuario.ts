import { Rol } from "./rol.js"

class Usuario extends Rol{
    constructor(nombre: string, contrasenia: string){
        super(nombre, contrasenia)
    }

    override get permisos(){
        return["crearTrip"]
    }

}