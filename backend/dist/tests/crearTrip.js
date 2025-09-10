import { Trip } from "../models/entities/trip.js"
import mongoose from "mongoose"
import { connectDB } from "../config/db.js"

async function CrearUnTrip(){

    connectDB()

    try {
        const trip = new Trip({
            title: "Viaje a Jujuy",
            description: "Un viaje de prueba para testear mongoose.",
            origin: "Buenos Aires",
            destination: "Jujuy",
            administrators: [new mongoose.Types.ObjectId('68bf846e3820d9d431477f9e')], // placeholder
            participants: [new mongoose.Types.ObjectId('68bf846e3820d9d431477f9e')]
        });
        // por ahora participantes y actividades las dejamos vacias

        await trip.save()

        const tripEncontrado = await Trip.findOne({ title: "Viaje a Jujuy"})

        console.log("Se creo el siguiente Trip: ", tripEncontrado)
    } catch (error) {
        console.log("Hubo un error al crear el trip: ", error.message)
    }
}

CrearUnTrip()