import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
class BaseUserController {
    handleGetObject = async (req, res) => {
        return;
    };
    handleCreateObject = async (req, res) => {
        return;
    };
    handleDeleteObject = async (req, res) => {
        return;
    };
    handleUpdateObject = async (req, res) => {
        return;
    };
}
export const UserController = new BaseUserController(); // instanciamos el controller para que sea exportada siempre la misma instancia
