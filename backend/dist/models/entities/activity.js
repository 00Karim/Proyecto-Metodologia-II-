import { Schema, model } from "mongoose";
const ActivitySchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    votos: { type: Number, default: 0, min: 0 }
});
export const Activity = model("Activity", ActivitySchema);
