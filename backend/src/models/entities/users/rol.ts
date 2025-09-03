export abstract class Rol{
    constructor(public nombre: string, private mail: string, private contrasenia: string){}

    abstract get permisos(): string[]
}