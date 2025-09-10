import type { UserDocument } from "../types+interfaces/typesInterfaces.js";
import { User } from "./entities/user.js"
import type { Model } from "../types+interfaces/typesInterfaces.js"
import type { ObjectId } from "mongoose"

type ModelParams = { _id: string | ObjectId, nombre: string, mail: string, contrasenia: string} // estos son los parametros de la entidad User
class BaseUserModel implements Model<UserDocument, ModelParams>{
    async getObject(_id: ObjectId | string): Promise<UserDocument | null> {
        try {
            const usuario_encontrado = await User.findOne({_id: _id})
            return usuario_encontrado
        } catch (error: any) {
            console.log("Hubo un error al getear un usuario: ", error.message)
            return null
        }
    }

    async createObject(parameters: ModelParams): Promise<UserDocument | null> {
        try {
            const { nombre, mail, contrasenia } = parameters
            const usuario_creado = await new User({
                nombre,
                mail,
                contrasenia
            }).save()
            return usuario_creado
        } catch (error: any) {
            console.log("Hubo un error al crear el usuario: ", error.message)
            return null            
        }
    }

    async deleteObject(id: ObjectId | string): Promise<Boolean> {
        try {
            const usuario_borrado = await User.findByIdAndDelete(id)
            return true
        } catch (error: any) {
            console.log("Hubo un error al borrar el usuario: ", error.message)
            return false         
        }
    }

    async updateObject(parameters: ModelParams): Promise<UserDocument | null> {
        try {
            const { _id, nombre, mail, contrasenia } = parameters
            const usuario_modificado = await User.findByIdAndUpdate
                (
                    {_id: _id},
                    {$set: { nombre: nombre, constrasenia: contrasenia, mail: mail }}
                )
            return usuario_modificado
        } catch (error: any) {
            return null            
        }
    }
}

export const UserModel = new BaseUserModel() // instanciamos el model para que sea exportada siempre la misma instancia