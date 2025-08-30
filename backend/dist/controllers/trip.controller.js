import { TripModel } from "../models/trip.model.js";
class LocalTripController {
    handleGetObject = async (req, res) => {
        try {
            const { id = "" } = req.params; // hacemos que sea un string por default asi ts no nos exige que id tenga coherencia con la interfaz determinada (pide que sea string y en este caso empieza siendo undefined)
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
            const trip = await TripModel.createObject({ title, description });
            return res.status(201).json(trip);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del servidor!" });
        }
    };
    handleDeleteObject = async (req, res) => {
        return;
    };
    handleUpdateObject = async (req, res) => {
        return;
    };
}
export const TripController = new LocalTripController(); // instanciamos el controller para que sea exportada siempre la misma instancia
