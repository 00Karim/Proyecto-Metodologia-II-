import type { Request, Response } from "express";
import { TripModel } from "../models/trip.model.js";

class LocalTripController{
    getTrip = async (req: Request, res: Response) => {
    try {
        const { id = "" } = req.params; // hacemos que sea un string por default asi ts no nos exige que id tenga coherencia con la interfaz determinada (pide que sea string y en este caso empieza siendo undefined)

        const trip = await TripModel.getObject(id);

        if (!trip) return res.status(404).json({ error: "No se encontro el viaje" });

        return res.json(trip);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error del servidor!" });
    }
    };

    createTrip = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        const trip = await TripModel.createObject({ title, description });

        return res.status(201).json(trip);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error del servidor!" });
    }
    };
}

export const TripController = new LocalTripController() // instanciamos el controller para que sea exportada siempre la misma instancia