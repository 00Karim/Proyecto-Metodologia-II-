import mongoose, { Schema, Document } from "mongoose";
const TripSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});
export const Trip = mongoose.model("Trip", TripSchema);
