import {Router} from "express";
import {Trip} from "../models/entities/trip.js";
import { TripController } from "../controllers/trip.controller.js";

const router = Router();

//GET Trips
router.get("/", async(req, res) => {
    const trips = await Trip.find(); // cuando ya esten bien implementadas, hay que remplazar el codigo dentro de {} por su funcion del controlador correspondiente
    res.json(trips);
});

//POST nuevo trip
router.post("/", async(req,res) => {
    const newTrip = new Trip(req.body); // cuando ya esten bien implementadas, hay que remplazar el codigo dentro de {} por su funcion del controlador correspondiente
    await newTrip.save();
    res.status(201).json(newTrip);
});

export default router;

