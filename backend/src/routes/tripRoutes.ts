import {Router} from "express";
import { TripController } from "../controllers/trip.controller.js";
import { UserLogin } from "../midleware/userLogin.js";
import { ActivityController } from "../controllers/activity.controller.js";

const trips = Router();

trips.get("/:id", TripController.handleGetObject)//Obtener un viaje por id

trips.get("/", TripController.handleGetAllObjects) //Obtener todos los viajes

trips.post("/", TripController.handleCreateObject)

trips.delete("/:id", TripController.handleDeleteObject)

trips.put("/", TripController.handleUpdateObject)

trips.post("/:tripId/activities", UserLogin.verificarToken, ActivityController.handleCreateObject);

export default trips; 