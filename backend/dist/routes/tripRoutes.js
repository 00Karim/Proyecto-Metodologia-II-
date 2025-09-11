import { Router } from "express";
import { TripController } from "../controllers/trip.controller.js";
const trips = Router();
trips.get("/:id", TripController.handleGetObject); //Obtener un viaje por id
trips.get("/", TripController.handleGetAllObjects); //Obtener todos los viajes
trips.post("/", TripController.handleCreateObject);
trips.delete("/:id", TripController.handleDeleteObject);
trips.put("/", TripController.handleUpdateObject);
export default trips;
