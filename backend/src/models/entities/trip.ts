import mongoose, {Schema} from "mongoose";
import type { TripDocument } from "../../types+interfaces/typesInterfaces.js";

const TripSchema = new Schema<TripDocument>(
    {
        title: {type: String, required:true},
        description: {type: String, required:true},
        origin: {type: String, required: true},
        destination: {type: String, required: true},
        participants: 
            [
                {
                    type: Schema.Types.ObjectId, 
                    ref: "User"
                }
            ],
        administrators: 
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                }
            ],
        activities: 
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Activity"
                }
            ]
        }
);

export const Trip = mongoose.model<TripDocument>("Trip", TripSchema);