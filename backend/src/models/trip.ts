import mongoose, {Schema, Document} from "mongoose";

export interface Trip extends Document {
    title:string,
    description:string
}

const TripSchema = new Schema<Trip>(
    {
        title: {type:String, required:true},
        description: {type:String, required:true}
    }
);

export const Trip = mongoose.model<Trip>("Trip", TripSchema);