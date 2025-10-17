import mongoose, {Schema} from "mongoose";
import type { UserDocument } from "../../types+interfaces/typesInterfaces.js";

const UserSchema = new Schema<UserDocument>(
    {
        nombre: {type:String, required:true},
        mail: {type:String, required:true},
        contrasenia: {type: String, required:true},
        permisos: 
            [
                {type: String}
            ]
        // TODO: (opcional/revisar) Agregar un array de trips
    }
);

export const User = mongoose.model<UserDocument>("User", UserSchema);