import { Rol } from "./rol.js";
class Participante extends Rol {
    constructor(nombre, mail, contrasenia) {
        super(nombre, mail, contrasenia);
    }
    get permisos() {
        return ["crearActividad", "votar"];
    }
}
