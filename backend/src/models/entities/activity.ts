import { Schema, model } from "mongoose";
import type { InferSchemaType, HydratedDocument } from "mongoose";

const ActivitySchema = new Schema(
  {
		tipo: { type: String },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    votos: { type: Number, default: 0, min: 0 },
    tripId: { type: String, required: true },
    fecha: { type: Date },
  },
  {
    discriminatorKey: "tipo"
	}
);

// tipo de typescript para representar la forma de los datos
export type Activity = InferSchemaType<typeof ActivitySchema>;
// tipo de typescrpt que representa un documento de mongoose con metodos y helpers mongoose (.save(), .populate(), etc)
export type ActivityDocument = HydratedDocument<Activity>;
// Modelo real de Mongoose (puede usar .create(), .find(), etc)
export const ActivityModel = model<Activity>("Activity", ActivitySchema);