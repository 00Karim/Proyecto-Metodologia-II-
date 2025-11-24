import { Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";
import { ActivityModel, type Activity } from "../entities/activity.js";

const SalidaEnBiciSchema = new Schema({
  puntoPartida: { type: String, required: true },
  kmTotales: { type: Number, required: true },
  dificultad: {
    type: String,
    enum: ["baja", "media", "alta"],
    required: true,
  },
  requiereExperiencia: { type: Boolean, required: true },
});

// este type representa los atributos que agrega el tipo especifico de activity 
type SalidaEnBiciExtras = InferSchemaType<typeof SalidaEnBiciSchema>;
// este type representa lo anterior junto con los atributos que lleva una activity normalmente
export type SalidaEnBici = Activity & SalidaEnBiciExtras;
// este type representa lo anterior junto con los metodos comunes de un documento de mongoose (.create(), .populate(), etc)
export type SalidaEnBiciDocument = HydratedDocument<SalidaEnBici>;

export const SalidaEnBiciModel =ActivityModel.discriminator<SalidaEnBici>("SalidaEnBici", SalidaEnBiciSchema);