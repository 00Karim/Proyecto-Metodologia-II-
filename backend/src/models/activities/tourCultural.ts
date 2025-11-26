import { Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";
import { ActivityModel, type Activity } from "../entities/activity.js";

const TourCulturalSchema = new Schema({
  nombreGuia: { type: String },
  idiomas: { type: [String], required: true },
  puntoEncuentro: { type: String, required: true },
  lugaresVisitados: { type: [String], required: true },
  precioEntradas: { type: Number, required: true },
});

type TourCulturalExtras = InferSchemaType<typeof TourCulturalSchema>;
// lo que REALMENTE es una TourCultural en la DB:
export type TourCultural = Activity & TourCulturalExtras;
export type TourCulturalDocument = HydratedDocument<TourCultural>;

export const TourCulturalModel = ActivityModel.discriminator<TourCultural>("TourCultural", TourCulturalSchema);