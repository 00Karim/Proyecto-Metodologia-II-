import type { TripDocument } from "../types+interfaces/typesInterfaces.js"; // este es el tipo de un documento de tipo Trip
import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
import type { Model } from "../types+interfaces/typesInterfaces.js"
import type { ObjectId } from "mongoose"

// clase que implementa la interfaz
type ModelParams = {
  id?: string,
  titulo?: string,
  descripcion?: string,
  origen?: string,
  destino?: string,
  participantes?: string[],   
  administradores?: string[],
  actividades?: string[]
} // esta es la estructura que tienen que tener los parametros de la funcion crear dentro de la clase TripModel

class BaseTripModel implements Model<TripDocument, ModelParams> { 

  async getObject(_id: ObjectId | string): Promise<TripDocument | null> {
    return null; // placeholder --> aca adentro hay que hacer las consultas de mongodb usando el objeto Trip
  }

  async createObject(parameters: ModelParams): Promise<TripDocument> { // TODO: `parameters: ModelParams` es algo temporal, despues podriamos hacer un type de parametros distinto para cada metodo
    let { titulo, descripcion } = parameters // TODO: Agregar los parametros que faltan
    const trip = new Trip({
      titulo,
      descripcion
    });

    return trip; // placeholder
  }

  async deleteObject(_id: ObjectId | string): Promise<Boolean> {
    let id = _id
    const viajeBorrado = await Trip.findByIdAndDelete(id)
    return viajeBorrado !== null  
  }

  async updateObject(parameters: ModelParams): Promise<TripDocument | null> {
    return null
  }
}

export const TripModel = new BaseTripModel() // instanciamos el model para que sea exportado siempre la misma instancia