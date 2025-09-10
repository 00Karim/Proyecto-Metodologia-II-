import { Schema, model } from "mongoose";
import type { ActivityDocument } from "../../types+interfaces/typesInterfaces.js";

const ActivitySchema = new Schema<ActivityDocument>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  votos: { type: Number, default: 0, min: 0 }
});

export const Activity = model<ActivityDocument>("Activity", ActivitySchema);