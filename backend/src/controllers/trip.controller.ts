import mongoose from "mongoose";
import type { Request, Response } from "express";
import type { TripDocument } from "../../src/types+interfaces/typesInterfaces.js";
import { TripModel } from "../models/trip.model.js";
import type { Controller } from "../../src/types+interfaces/typesInterfaces.js"

class LocalTripController implements Controller<TripDocument, void>{
    constructor(){
        console.log("Controller loaded")
    }
    handleGetObject = async (req: Request, res: Response) => {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id); 

            const trip = await TripModel.getObject(id);

            if (!trip) return res.status(404).json({ error: "No se encontro el viaje" });

            return res.json(trip);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    };

    handleGetAllObjects = async (req: Request, res: Response) => {
        try {
            const trips = await TripModel.getAllObjects();
            res.status(200).json(trips);
        }catch(error){
            console.error("Error getting all trips: ", error);
            res.status(500).json({error: "Error del servidor"});
        }
    }

    handleCreateObject = async (req: Request, res: Response) => {
        try {
            const { title, description, origin, destination, administrators } = req.body;

            const trip = await TripModel.createObject({
                title,
                description,
                origin,
                destination,
                administrators   
            });

            return res.status(201).json(trip);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    };

    handleDeleteObject = async (req: Request, res: Response) => {
        try{
            const { id = "" } = req.params;

            const viajeBorrado = await TripModel.deleteObject(id)
            if (viajeBorrado){
                return res.status(204).json("Se borro el viaje correctamente");
            } else{
                return res.status(404).json({error: "El viaje ya fue borrado o no existe"})
            }
        } catch(error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    }

    handleUpdateObject = async (req: Request, res: Response) => {
        return;
    }
}

export const TripController = new LocalTripController() // instanciamos el controller para que sea exportada siempre la misma instancia