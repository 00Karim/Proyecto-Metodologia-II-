import mongoose from "mongoose";

let isConnected = false; //Variable booleana para comprobar si se establecio una conexion a mongoDB o no

export const connectDB = async() => {

    if(isConnected){
        console.log("MongoDB conectado previamente")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/TripMate");
        isConnected = db.connections[0]?.readyState === 1 //Esta linea comprueba que se haya establecido correctamente la conexion a la base de datos y no haya un falso positivo 
        console.log("MongoDB Conectado correctamente");
    } catch(err){
        console.error("MongoDB no ha sido conectado correctamente", err);
        process.exit(1);
    }
}; 