import { TripDocument } from "../../../backend/src/types+interfaces/typesInterfaces";

export const fetchTrips = async (): Promise<TripDocument[]> => {
    try{
        const response = await fetch('http://localhost:4000/api/trips');
        if(!response)
            throw new Error("Error al obtener los viajes")

        return await response.json()
    }catch(error) {
        console.error("Error fetching trips: ", error)
        return []
    }
}
