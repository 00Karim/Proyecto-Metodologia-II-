import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
class BaseTripModel {
    async getObject(_id) {
        return await Trip.findById(_id)
            .populate('participants')
            .populate('administrators')
            .populate('activities');
    }
    async createObject(parameters) {
        let { title, description, origin, destination, participants, administrators, activities } = parameters; // TODO: Agregar los parametros que faltan
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
    async deleteObject(parameters) {
        let { id } = parameters;
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
