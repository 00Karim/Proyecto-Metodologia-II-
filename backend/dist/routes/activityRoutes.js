import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller.js";
const activities = Router();
activities.get("/", ActivityController.handleGetObject); // Devuelve todas las actividades
activities.get("/:id", ActivityController.handleGetObject); // Devuelve una actividad por ID
activities.post("/", ActivityController.handleCreateObject);
activities.delete("/:id", ActivityController.handleDeleteObject);
activities.put("/:id", ActivityController.handleUpdateObject);
export default activities;
