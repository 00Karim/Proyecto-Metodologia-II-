import mongoose from "mongoose" 
import type { ActivityDocument } from "../types+interfaces/typesInterfaces.js";
import { Activity } from "./entities/activity.js";
import type { Model } from "../types+interfaces/typesInterfaces.js";

// TODO: Agregar observer a activity para que se mande un mail a los usuarios participantes del
// trip cuando para que voten 

type ModelParams = {
  id?: string;
  nombre?: string;
  descripcion?: string;
  votos?: number;
};

type ObjectId = mongoose.Types.ObjectId

class BaseActivityModel implements Model<ActivityDocument, ModelParams> {
  async getObject(id: string): Promise<ActivityDocument | null> {
    try {
      return await Activity.findById(id);
    } catch (error) {
      console.error("Error al obtener actividad:", error);
      return null;
    }
  }

  async getAllObjects(): Promise<ActivityDocument[]> {
    try {
      return await Activity.find();
    } catch (error) {
      console.error("Error al obtener todas las actividades:", error);
      return [];
    }
  }

  async createObject(parameters: ModelParams): Promise<ActivityDocument | null> {
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
    } catch (error) {
      console.error("Error al crear actividad:", error);
      return null;
    }
  }

  async deleteObject(id: ObjectId | string): Promise<boolean> {
    try {
      if (!id) {
        throw new Error("Se requiere un id para eliminar");
      }
      const result = await Activity.findByIdAndDelete(id);
      return result ? true : false;
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
      return false;
    }
  }

  async updateObject(parameters: ModelParams): Promise<ActivityDocument | null> {
    try {
      if (!parameters.id) {
        throw new Error("Se requiere un id para actualizar");
      }

      const { id, ...updateData } = parameters;
      return await Activity.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      return null;
    }
  }
}

export const ActivityModel = new BaseActivityModel();
