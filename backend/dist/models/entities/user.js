import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    nombre: { type: String, required: true },
    mail: { type: String, required: true },
    contrasenia: { type: String, required: true },
    permisos: [
        { type: String }
    ]
});
export const User = mongoose.model("User", UserSchema);
