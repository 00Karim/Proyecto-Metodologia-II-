import { Activity } from "./entities/activity.js";
class BaseActivityModel {
    async getObject(id) {
        try {
            return await Activity.findById(id);
        }
        catch (error) {
            console.error("Error al obtener actividad:", error);
            return null;
        }
    }
    async getAllObjects() {
        try {
            return await Activity.find();
        }
        catch (error) {
            console.error("Error al obtener todas las actividades:", error);
            return [];
        }
    }
    async createObject(parameters) {
        try {
            if (!parameters.nombre || !parameters.descripcion) {
                throw new Error("Faltan campos obligatorios: nombre y descripcion");
            }
            const newActivity = new Activity({
                nombre: parameters.nombre,
                descripcion: parameters.descripcion,
                votos: parameters.votos ?? 0,
            });
            return await newActivity.save();
        }
        catch (error) {
            console.error("Error al crear actividad:", error);
            return null;
        }
    }
    async deleteObject(parameters) {
        try {
            if (!parameters.id) {
                throw new Error("Se requiere un id para eliminar");
            }
            const result = await Activity.findByIdAndDelete(parameters.id);
            return result ? true : false;
        }
        catch (error) {
            console.error("Error al eliminar actividad:", error);
            return false;
        }
    }
    async updateObject(parameters) {
        try {
            if (!parameters.id) {
                throw new Error("Se requiere un id para actualizar");
            }
            const { id, ...updateData } = parameters;
            return await Activity.findByIdAndUpdate(id, updateData, { new: true });
        }
        catch (error) {
            console.error("Error al actualizar actividad:", error);
            return null;
        }
    }
}
export const ActivityModel = new BaseActivityModel();
