import { Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";
import { ActivityModel, type Activity } from "../entities/activity.js";

const TourNaturalSchema = new Schema({
  nombreGuia: { type: String },
  idiomas: { type: [String], required: true },
  ubicaciones: { type: [String], required: true },
  puntoEncuentro: { type: String, required: true },
  distanciaKm: { type: Number },
  elevacionMetros: { type: Number },
  faunaPosibleVer: { type: [String] },
  floraPosibleVer: { type: [String] },
  esAPie: { type: Boolean, required: true },
  requiereTransporteAlLugar: { type: Boolean, required: true },
  transporteIncluido: { type: Boolean, required: true },
  dificultad: {
    type: String,
    enum: ["baja", "media", "alta"],
    required: true,
  },
  recomendaciones: { type: [String] },
  itemsNecesarios: { type: [String], required: true },
});

type TourNaturalExtra = InferSchemaType<typeof TourNaturalSchema>;
export type TourNatural = Activity & TourNaturalExtra;
export type TourNaturalDocument = HydratedDocument<TourNatural>;

export const TourNaturalModel = ActivityModel.discriminator<TourNatural>("TourNatural", TourNaturalSchema);