import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
import mongoose from "mongoose";
class BaseTripModel {
    async getObject(_id) {
        const trip_elegido = await Trip.findById(_id);
        if (!trip_elegido)
            return null;
        if (trip_elegido.administrators?.length > 0)
            await trip_elegido.populate('administrators');
        if (trip_elegido.participants?.length > 0)
            await trip_elegido.populate('participants');
        if (trip_elegido.activities?.length > 0)
            await trip_elegido.populate('activities');
        return trip_elegido;
    }
    async getAllObjects() {
        try {
            return await Trip.find()
                .populate('administrators')
                .populate('participants')
                .populate('activities');
        }
        catch (error) {
            console.error("Error getting all trips:", error);
            return [];
        }
    }
    async createObject(parameters) {
        try {
            let { title, description, origin, destination, administrators } = parameters;
            const trip = new Trip({
                title,
                description,
                origin,
                destination,
                administrators
            });
            await trip.save();
            return trip; // placeholder
        }
        catch (error) {
            console.error("Error creando un trip:", error);
            return null;
        }
    }
    async deleteObject(id) {
        const deletedTrip = await Trip.findByIdAndDelete(id);
        return deletedTrip !== null;
    }
    async updateObject(parameters) {
        const { id, ...updateData } = parameters;
        if (!id)
            return null;
        return await Trip.findByIdAndUpdate(id, updateData, { new: true });
    }
}
export const TripModel = new BaseTripModel(); // instanciamos el model para que sea exportado siempre la misma instancia
