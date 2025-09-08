import mongoose, { Schema } from "mongoose";
const TripSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    participantes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Participante",
            default: ["Sin participantes"]
        }
    ],
    administradores: [
        {
            type: Schema.Types.ObjectId,
            ref: "Administrador",
            required: true
        }
    ],
    actividades: [
        {
            type: Schema.Types.ObjectId,
            ref: "Activity",
            default: ["Sin actividades planeadas"]
        }
    ]
});
export const Trip = mongoose.model("Trip", TripSchema);
