import express from "express";
const routerCentral = express.Router();

// importamos todos los routers aca asi los centralizamos
// en una misma ruta

import rutasTrip from "./tripRoutes.js"
import rutasUser from "./userRoutes.js"
import rutasActivity from "./activityRoutes.js"

routerCentral.use('/trips', rutasTrip)
routerCentral.use('/users', rutasUser)
routerCentral.use('/activities', rutasActivity)

export default routerCentral;