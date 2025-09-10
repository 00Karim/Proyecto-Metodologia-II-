import { User } from "./entities/user.js";
import mongoose from "mongoose";
class BaseUserModel {
    async getObject(_id) {
        try {
            const usuario_encontrado = await User.findOne({ _id: _id });
            return usuario_encontrado;
        }
        catch (error) {
            console.log("Hubo un error al getear un usuario: ", error.message);
            return null;
        }
    }
    async createObject(parameters) {
        try {
            const { nombre, mail, contrasenia, permisos } = parameters;
            const usuario_creado = await new User({
                nombre,
                mail,
                contrasenia,
                permisos
            }).save();
            return usuario_creado;
        }
        catch (error) {
            console.log("Hubo un error al crear el usuario: ", error.message);
            return null;
        }
    }
    async deleteObject(id) {
        try {
            const usuario_borrado = await User.findByIdAndDelete(id);
            return true;
        }
        catch (error) {
            console.log("Hubo un error al borrar el usuario: ", error.message);
            return false;
        }
    }
    async updateObject(parameters) {
        try {
            const { _id, nombre, permisos } = parameters;
            const usuario_modificado = await User.findByIdAndUpdate({ _id: _id }, { $set: { nombre: nombre, permisos: permisos } });
            return usuario_modificado;
        }
        catch (error) {
            console.log("Hubo un error al modficar el usuario: ", error.message);
            return null;
        }
    }
}
export const UserModel = new BaseUserModel(); // instanciamos el model para que sea exportada siempre la misma instancia
