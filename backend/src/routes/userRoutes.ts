import {Router} from "express";
import { UserController } from "../controllers/user.controller.js";

const users = Router();

users.get("/:id", UserController.handleGetObject)

users.post("/", UserController.handleCreateObject)

users.delete("/:id", UserController.handleDeleteObject)

users.put("/:id", UserController.handleUpdateObject)

export default users; 