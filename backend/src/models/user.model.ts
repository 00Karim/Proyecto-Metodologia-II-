import type { UserDocument } from "../types+interfaces/typesInterfaces.js";
import { User } from "./entities/user.js"
import type { Model } from "../types+interfaces/typesInterfaces.js"
import type { ObjectId } from "mongoose"

type ModelParams = { nombre: string, mail: string, contrasenia: string} // estos son los parametros de la entidad User
class BaseUserModel implements Model<UserDocument, ModelParams>{
    async getObject(_id: ObjectId | string): Promise<UserDocument | null> {
        return null
    }

    async createObject(parameters: ModelParams): Promise<UserDocument | null> {
        return null
    }

    async deleteObject(parameters: ModelParams): Promise<Boolean> {
        return false
    }

    async updateObject(parameters: ModelParams): Promise<UserDocument | null> {
        return null
    }
}

export const UserModel = new BaseUserModel() // instanciamos el model para que sea exportada siempre la misma instancia