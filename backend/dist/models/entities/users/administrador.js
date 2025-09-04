import { Rol } from "./rol.js";
class Administrador extends Rol {
    constructor(nombre, mail, contrasenia) {
        super(nombre, mail, contrasenia);
    }
    get permisos() {
        return ["eliminarParticipante", "agregarParticipante", "crearActividad", "borrarActividad", "borrarTrip", "votar"];
    }
}
