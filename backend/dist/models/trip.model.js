import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
import mongoose from "mongoose";
class BaseTripModel {
    async getObject(_id) {
        const trip_elegido = await Trip.findById(_id);
        //  .populate('participants')
        //  .populate('administrators')
        //  .populate('activities') // TODO: Hay que hacer populate solo si el objeto tiene un objectid dentro de los arrays, sino nos da error porque no tiene nada adentro
        console.log("HOLA  ", trip_elegido);
        return trip_elegido;
    }
    async createObject(parameters) {
        let { title, description, origin, destination, participants, administrators, activities } = parameters;
        const trip = new Trip({
            title,
            description,
            origin,
            destination,
            participants,
            administrators,
            activities
        });
        return trip; // placeholder
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
