import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
class BaseTripModel {
    async getObject(_id) {
        return null; // placeholder --> aca adentro hay que hacer las consultas de mongodb usando el objeto Trip
    }
    async createObject(parameters) {
        let { titulo, descripcion } = parameters; // TODO: Agregar los parametros que faltan
        const trip = new Trip({
            titulo,
            descripcion
        });
        return trip; // placeholder
    }
    async deleteObject(parameters) {
        let { id } = parameters;
        const viajeBorrado = await Trip.findByIdAndDelete(id);
        return viajeBorrado !== null;
    }
    async updateObject(parameters) {
        return null;
    }
}
export const TripModel = new BaseTripModel(); // instanciamos el model para que sea exportado siempre la misma instancia
