import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import { User } from "../models/entities/user.js";
class BaseUserController {
    handleGetObject = async (req, res) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const user = await UserModel.getObject(id);
            if (!user)
                return res.status(404).json({ error: "No se encontro el usuario" });
            return res.json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor" });
        }
    };
    handleCreateObject = async (req, res) => {
        try {
            const { nombre, mail, contrasenia, permisos } = req.body;
            const nuevo_usuario = await UserModel.createObject({ nombre, mail, contrasenia, permisos });
            return res.status(201).json(nuevo_usuario);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor" });
        }
    };
    handleDeleteObject = async (req, res) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const deleted_user = await UserModel.deleteObject(id);
            if (deleted_user) {
                return res.status(204).json("Se borro el usuario correctamente");
            }
            else {
                return res.status(404).json({ error: "El usuario no existe o ya fue borrado" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor" });
        }
    };
    handleUpdateObject = async (req, res) => {
        try {
            const _id = new mongoose.Types.ObjectId(req.params.id);
            const { nombre, permisos } = req.body;
            const usuario_nuevo = await UserModel.updateObject({ _id, nombre, permisos });
            if (usuario_nuevo) {
                return res.status(201).json("Usuario modificado correctamente: " + usuario_nuevo);
            }
            else {
                return res.status(400).json({ error: "Hubo un error al modificar el usuario" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor" });
        }
    };
}
export const UserController = new BaseUserController(); // instanciamos el controller para que sea exportada siempre la misma instancia
