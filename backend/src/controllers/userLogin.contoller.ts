import { type Request, type Response } from "express"
import { UserLogin } from "../midleware/userLogin.js"
import { UserModel } from "../models/user.model.js"
import { User } from "../models/entities/user.js"

class userLoginController{
    
    handleVerificarToken = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization
        } catch (error) {
            
        }
    }

    handleRegister = async(req: Request, res: Response) => {
        try {
            const { nombre, mail, contrasenia } = req.body
            const nuevoUsuario = await UserModel.createObject({nombre, mail, contrasenia}) 
            return res.status(201).json(nuevoUsuario)
        } catch (error) {
            return res.status(500).json({error: "Error del servidor"})
        }
    }
    
    handleLogin = async(req: Request, res: Response) => {
        try {
            const { mail, contrasenia } = req.body
            console.log("mail ", mail, " contrasenia: ", contrasenia) //TODO: borrar
            const loggedUser = await User.findOne({ mail, contrasenia })
            console.log(loggedUser) // TODO: borrar
            if (loggedUser){
                const { token, userId } = UserLogin.generarToken(loggedUser) // extremos el userId y el token de la respuesta de la funcion generar token, que nos devuelve el token y el id del usuario
                return res.status(200).json({ token, userId } ) // mandamos esa informacion al front para guardarla en el localStorage
            }
            else{ 
                return res.status(404).json({error: "El usuario ingresado no existe"})
            }
        } catch (error) {
            return res.status(500).json({error: "Error del servidor"})
        }
    }
}

export const UserLoginController = new userLoginController()