import { User } from "../models/entities/user.js"
import { connectDB } from "../config/db.js"

async function CrearParticipante(){
    connectDB()

    try {
        const participant = new User({
            nombre: "Franco",
            mail: "franco@mail.com",
            contrasenia: "1234"
        })

        await participant.save()

        const participanteEncontrado = await User.findOne({nombre: "Franco"});

        console.log("Se encontro el siguiente usuario: ", participanteEncontrado);

    } catch(error){
        console.log("Se produjo un error al crear el usuario");
    }
}

CrearParticipante()