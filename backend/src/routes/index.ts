import express from "express";
const routerCentral = express.Router();

// importamos todos los routers aca asi los centralizamos
// en una misma ruta

import rutasTrip from "./tripRoutes.js"
import rutasUser from "./userRoutes.js"
import rutasActivity from "./activityRoutes.js"
import rutasLogin_Register from "./loginRoutes.js"

routerCentral.use('/trips', rutasTrip)
routerCentral.use('/users', rutasUser)
routerCentral.use('/activities', rutasActivity)
routerCentral.use('/userAuth', rutasLogin_Register)

export default routerCentral;