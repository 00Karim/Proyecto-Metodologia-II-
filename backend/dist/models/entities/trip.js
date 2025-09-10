import mongoose, { Schema } from "mongoose";
const TripSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    administrators: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: "Activity"
        }
    ]
});
export const Trip = mongoose.model("Trip", TripSchema);
