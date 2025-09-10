import mongoose from "mongoose";
import { TripModel } from "../models/trip.model.js";
class LocalTripController {
    constructor() {
        console.log("Controller loaded");
    }
    handleGetObject = async (req, res) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const trip = await TripModel.getObject(id);
            if (!trip)
                return res.status(404).json({ error: "No se encontro el viaje" });
            return res.json(trip);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    };
    handleCreateObject = async (req, res) => {
        try {
            const { title, description } = req.body;
            const trip = await TripModel.createObject({ title, description }); // TODO: agregar los atributos que faltan
            return res.status(201).json(trip);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    };
    handleDeleteObject = async (req, res) => {
        try {
            const { id = "" } = req.params;
            const viajeBorrado = await TripModel.deleteObject(id);
            if (viajeBorrado) {
                return res.status(204).json("Se borro el viaje correctamente");
            }
            else {
                return res.status(404).json({ error: "El viaje ya fue borrado o no existe" });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    };
    handleUpdateObject = async (req, res) => {
        return;
    };
}
export const TripController = new LocalTripController(); // instanciamos el controller para que sea exportada siempre la misma instancia
