import type { Request, Response } from "express";
import type { ActivityDocument } from "../types+interfaces/typesInterfaces.js";
import { ActivityModel } from "../models/activity.model.js";
import type { Controller } from "../types+interfaces/typesInterfaces.js";

class LocalActivityController implements Controller<ActivityDocument, void> {
  handleGetObject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (id) {
        const activity = await ActivityModel.getObject(id);
        if (!activity) return res.status(404).json({ error: "No se encontro la actividad" });
        return res.json(activity);
      }

      const activities = await ActivityModel.getAllObjects();
      return res.json(activities);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  };

  handleCreateObject = async (req: Request, res: Response) => {
    try {
      const { nombre, descripcion, votos } = req.body;
      const activity = await ActivityModel.createObject({ nombre, descripcion, votos });
      return res.status(201).json(activity);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  };

  handleDeleteObject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: "Se requiere un id" });
      }

      const deleted = await ActivityModel.deleteObject(id);

      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: "La actividad no existe o ya fue eliminada" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  };

  handleUpdateObject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updated = await ActivityModel.updateObject({ id, ...updateData });
      if (!updated) return res.status(404).json({ error: "No se pudo actualizar la actividad" });

      return res.json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  };
}

export const ActivityController = new LocalActivityController();
