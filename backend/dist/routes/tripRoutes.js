import { Router } from "express";
import { TripController } from "../controllers/trip.controller.js";
const trips = Router();
trips.get("/:id", TripController.handleGetObject);
trips.post("/", TripController.handleCreateObject);
trips.delete("/:id", TripController.handleDeleteObject);
trips.put("/", TripController.handleUpdateObject);
export default trips;
