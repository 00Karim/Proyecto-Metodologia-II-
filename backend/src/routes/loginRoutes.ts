import { Router } from "express"
import { UserLoginController } from "../controllers/userLogin.contoller.js"
import { User } from "../models/entities/user.js"

const userLogin = Router()

userLogin.post("/register", UserLoginController.handleRegister)

userLogin.post("/login", UserLoginController.handleLogin)

export default userLogin