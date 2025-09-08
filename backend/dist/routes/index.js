import express from "express";
const routerCentral = express.Router();
// importamos todos los routers aca asi los centralizamos
// en una misma ruta
import rutasTrip from "./tripRoutes.js";
import rutasUser from "./userRoutes.js";
routerCentral.use('/trips', rutasTrip);
routerCentral.use('/users', rutasUser);
export default routerCentral;
