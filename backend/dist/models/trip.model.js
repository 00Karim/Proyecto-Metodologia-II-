import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
class BaseTripModel {
    async getObject(_id) {
        return null; // placeholder --> aca adentro hay que hacer las consultas de mongodb usando el objeto Trip
    }
    async createObject(parameters) {
        const { title, description } = parameters;
        const trip = new Trip({
            title,
            description
        });
        return trip; // placeholder
    }
    async deleteObject(parameters) {
        return false;
    }
    async updateObject(parameters) {
        return null;
    }
}
export const TripModel = new BaseTripModel(); // instanciamos el model para que sea exportado siempre la misma instancia
