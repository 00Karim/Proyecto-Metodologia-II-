import mongoose, {Schema} from "mongoose";
import type { TripDocument } from "../../types+interfaces/typesInterfaces.js";

const TripSchema = new Schema<TripDocument>(
    {
        title: {type:String, required:true},
        description: {type:String, required:true}
    }
);

export const Trip = mongoose.model<TripDocument>("Trip", TripSchema);