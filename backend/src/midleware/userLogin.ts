import { User } from "./../models/entities/user.js"
import {type Request, type Response, type NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"

interface LoginRequest extends Request{
    usuario?: string | JwtPayload; // le agregamos el atributo usuario a el type Request asi podemos crear un header personalizado con ese nombre
}

class UserLoginModel{

    async verificarCredencialesUsuario(nombre: string, contrasenia: string){
        try {
            const usuario = await User.findOne({
                where: { nombre, contrasenia }
            });
            return usuario;
        } catch (error) {
            return null
        }
    }

    generarToken(usuario: any){
        const payload = { id_usuario: usuario._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'palabra')        
        return {
                token,
                userId: usuario._id
        }; // guardamos el id de usuario en el payload y despues lo podemos usar para saber si un usuario dio like o no dio like a un trip, etc
    }

    verificarToken(req: LoginRequest, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization; // el token se encuentra dentro de la request en el objeto header dentro del atirbuto atuthorization
        if (!authHeader) return res.status(401).json({ mensaje: "Falta el token" }) // si no exite ese valor entonces significa que el usuario no hizo login entonces no tiene permitido hacer ciertas cosas
        const token = authHeader.split(' ')[1] // el formato de la authorization es asi: <"Authorization": "Bearer 985FI"> por lo que si dividismo el string en el primer espacio nos vamos a quedar solo con el string del token, sin la palabra Bearer
        try {
            const payload = jwt.verify(token!, process.env.JWT_SECRET || "palabra")
            req.usuario = payload
            next()
        } catch (error) {
        
        }
    }
}

export const UserLogin = new UserLoginModel()