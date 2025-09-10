import mongoose from "mongoose"
import type { Request, Response } from "express"
import type { UserDocument } from "../types+interfaces/typesInterfaces.js"
import { UserModel } from "../models/user.model.js"
import type { Controller } from "../types+interfaces/typesInterfaces.js"

class BaseUserController implements Controller<UserDocument, void>{
    handleGetObject = async (req: Request, res: Response) => {
        return;
    }

    handleCreateObject = async (req: Request, res: Response) => {
        return;
    }

    handleDeleteObject = async (req: Request, res: Response) => {
        return;
    }

    handleUpdateObject = async (req: Request, res: Response) => {
        return;
    }
}

export const UserController = new BaseUserController() // instanciamos el controller para que sea exportada siempre la misma instancia