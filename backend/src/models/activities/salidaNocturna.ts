import { Schema } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";
import { ActivityModel, type Activity } from "../entities/activity.js";

const SalidaNocturnaSchema = new Schema({
  zona: { type: String, required: true },
  incluyeTransporte: { type: Boolean, required: true },
  valorEntrada: { type: Number, required: true },
  bebidasIncluidas: { type: Boolean, required: true },
  codigoVestimenta: { type: String, required: true },
});

type SalidaNocturnaExtras = InferSchemaType<typeof SalidaNocturnaSchema>;
export type SalidaNocturna = Activity & SalidaNocturnaExtras;
export type SalidaNocturnaDocument = HydratedDocument<SalidaNocturna>;

export const SalidaNocturnaModel =ActivityModel.discriminator<SalidaNocturna>("SalidaNocturna",SalidaNocturnaSchema);