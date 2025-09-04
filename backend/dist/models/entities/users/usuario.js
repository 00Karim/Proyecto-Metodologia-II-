import { Rol } from "./rol.js";
class Usuario extends Rol {
    constructor(nombre, mail, contrasenia) {
        super(nombre, mail, contrasenia);
    }
    get permisos() {
        return ["crearTrip"];
    }
}
