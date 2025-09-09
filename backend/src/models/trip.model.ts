import type { TripDocument } from "../types+interfaces/typesInterfaces.js"; // este es el tipo de un documento de tipo Trip
import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
import type { Model } from "../types+interfaces/typesInterfaces.js"
import type { ObjectId } from "mongoose"

// clase que implementa la interfaz
type ModelParams = {
  id?: string,
  title?: string,
  description?: string,
  origin?: string,
  destination?: string,
  participants?: string[],   
  administrators?: string[],
  activities?: string[]
} // esta es la estructura que tienen que tener los parametros de la funcion crear dentro de la clase TripModel

class BaseTripModel implements Model<TripDocument, ModelParams> { 

  async getObject(_id: ObjectId | string): Promise<TripDocument | null> {
    return await Trip.findById(_id)
      .populate('participants')
      .populate('administrators')
      .populate('activities')
  }

  async createObject(parameters: ModelParams): Promise<TripDocument> { // TODO: `parameters: ModelParams` es algo temporal, despues podriamos hacer un type de parametros distinto para cada metodo
    let { title, description, origin, destination, participants, administrators, activities } = parameters // TODO: Agregar los parametros que faltan
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

  async deleteObject(parameters: ModelParams): Promise<Boolean> {
    let { id } = parameters
    const deletedTrip = await Trip.findByIdAndDelete(id)
    return deletedTrip !== null  
  }

  async updateObject(parameters: ModelParams): Promise<TripDocument | null> {
    const {id, ...updateData} = parameters

    if(!id) return null;

    return await Trip.findByIdAndUpdate(
      id,
      updateData,
      { new:true}
    );
  }
}

export const TripModel = new BaseTripModel() // instanciamos el model para que sea exportado siempre la misma instancia