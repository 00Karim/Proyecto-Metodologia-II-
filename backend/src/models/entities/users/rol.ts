export abstract class Rol{
    constructor(public nombre: string, private contrasenia: string){}

    abstract get permisos(): string[]
}