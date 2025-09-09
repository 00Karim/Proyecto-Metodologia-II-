import { Trip } from "../models/entities/trip.js"
import mongoose from "mongoose"
import { connectDB } from "../config/db.js"

async function CrearUnTrip(){

    connectDB()

    try {
        const trip = new Trip({
            title: "Viaje a Cordoba",
            description: "Un viaje de prueba para testear mongoose.",
            origen: "Buenos Aires",
            destino: "Mendoza",
            participantes: [new mongoose.Types.ObjectId("68bf846e3820d9d431477f9e")], // later fill with ObjectId of real users
            administradores: [new mongoose.Types.ObjectId()], // placeholder
            actividades: [],
        });

        await trip.save()

        const tripEncontrado = await Trip.findOne({ title: "Viaje a Cordoba"})

        console.log("Se creo el siguiente Trip: ", tripEncontrado)
    } catch (error) {
        console.log("Hubo un error al crear el trip: ", error.message)
    }
}

CrearUnTrip()