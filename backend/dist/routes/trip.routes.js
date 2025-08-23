import { Router } from "express";
import { Trip } from "../models/Trip";
const router = Router();
//GET Trips
router.get("/", async (req, res) => {
    const trips = await Trip.find();
    res.json(trips);
});
//POST nuevo trip
router.post("/", async (req, res) => {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
});
export default router;
