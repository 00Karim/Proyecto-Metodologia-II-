import { Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";
import { ActivityModel, type Activity } from "../entities/activity.js";

const TourGastronomicoSchema = new Schema({
  nombreGuia: { type: String },
  idiomas: { type: [String], required: true },
  establecimientos: { type: [String], required: true },
  degustacionesIncluidas: { type: Boolean, required: true },
  cantidadDegustaciones: { type: Number },
  tipoCocina: { type: [String] },
  opcionesVegetarianas: { type: Boolean },
  restriccionesAlimentarias: { type: [String] },
  puntoEncuentro: { type: String, required: true },
});

type TourGastronomicoExtra = InferSchemaType<typeof TourGastronomicoSchema>;
export type TourGastronomico = Activity & TourGastronomicoExtra;
export type TourGastronomicoDocument = HydratedDocument<TourGastronomico>;

export const TourGastronomicoModel =ActivityModel.discriminator<TourGastronomico>("TourGastronomico", TourGastronomicoSchema);