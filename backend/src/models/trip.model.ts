import type { TripDocument } from "../../src/types+interfaces/typesInterfaces.js"; // este es el tipo de un documento de tipo Trip
import { Trip } from "./../models/entities/trip.js"; // esta es la instancia de Trip en mongoose, con este objeto es que vamos a modificar la base de datos
import type { Model } from "../../src/types+interfaces/typesInterfaces.js"
import mongoose from "mongoose"

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

type ObjectId = mongoose.Types.ObjectId // usamos el objectid de mongoose para mayor flexibilidad y consistencia a lo largo de todo el proyecto

class BaseTripModel implements Model<TripDocument, ModelParams> { 

  async getObject(_id: ObjectId | string): Promise<TripDocument | null> {
    const trip_elegido = await Trip.findById(_id)
    if (!trip_elegido) return null;

    if(trip_elegido.administrators?.length > 0)
      await trip_elegido.populate('administrators')

    if(trip_elegido.participants?.length > 0)
      await trip_elegido.populate('participants')

    if(trip_elegido.activities?.length > 0)
      await trip_elegido.populate('activities')

    return trip_elegido
  }

  async getAllObjects(): Promise<TripDocument[]>{
    try{
      return await Trip.find()
        .populate('administrators')
        .populate('participants')
        .populate('activities');
    }catch(error){
      console.error("Error getting all trips:", error)
      return []
    }
  }

  async createObject(parameters: ModelParams): Promise<TripDocument | null> { 
    try {
      let { title, description, origin, destination, administrators } = parameters 
      const trip = new Trip({
        title,
        description,
        origin,
        destination,
        administrators
      });

      await trip.save()

      return trip; // placeholder
    } catch (error) {
      console.error("Error creando un trip:", error)
      return null
    }
  }

  async deleteObject(id: ObjectId | string): Promise<Boolean> {
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

  // TODO: Hacer metodo agregar usuario 
}

export const TripModel = new BaseTripModel() // instanciamos el model para que sea exportado siempre la misma instancia