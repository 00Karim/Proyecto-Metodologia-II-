import type { TripDocument } from "../types+interfaces/typesInterfaces.js"; // este es el tipo de un documento de tipo Trip
import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
import type { Model } from "../types+interfaces/typesInterfaces.js"

// interfaz para el contrato del modelo
export interface ITripModel {
  getTrip(_id: string): Promise<TripDocument | null>;   // puede devolver un Trip o null
  createTrip(title: string, description: string): Promise<TripDocument>; // Recibe atributos y devuelve el objeto creado
}

// clase que implementa la interfaz
export type ModelParams = {title: string, description: string} // esta es la estructura que tienen que tener los parametros de la funcion crear dentro de la clase TripModel
class LocalTripModel implements Model<TripDocument, ModelParams> { 
  async getObject(_id: string): Promise<TripDocument | null> {
    return null; // placeholder --> aca adentro hay que hacer las consultas de mongodb usando el objeto Trip
  }

  async createObject(parameters: ModelParams): Promise<TripDocument> {
    const { title, description } = parameters

    const trip = new Trip({
      title,
      description
    });

    return trip; // placeholder
  }
}

export const TripModel = new LocalTripModel() // instanciamos el model para que sea exportado siempre la misma instancia