import { Document, Mongoose, type ObjectId } from "mongoose";
import type { Request, Response } from "express";
import type { Schema } from "inspector/promises";

// ---- INICIO INTERFACES DE DOCUMENTOS ----

// estructura de un documento de tipo User
export interface UserDocument extends Document {
  nombre: string;
  mail: string;
  contrasenia: string;
}

// estructura de un documento de tipo Activity
export interface ActivityDocument extends Document {
  nombre: string;
  descripcion: string;
  votos: number;
}

// TODO: estructura de un documento de tipo Trip
export interface TripDocument extends Document {
  title: string;
  description: string;
  origin: string;
  destination: string;
  participants: ObjectId[];
  administrators: ObjectId[];
  activities: ObjectId[];
}

// ---- FIN INTERFACES DE DOCUMENTOS ----

// estructura de la clase de un Modelo
export interface Model <ClassType, Parameters>{ // de esta forma podemos dinamizar esta interfaz de modelos para que podamos ingresar parametros y clases dinamicamente dependiendo de que con que entidada estemos tratando
  getObject(_id: ObjectId | string): Promise<ClassType | null>;   // Puede devolver un objeto (conforme vamos creando entidades, vamos a ir agregando otros posibles outputs) o null // TODO: por ahora podemos dejar que sea string o object id, pero despues creo que podriamos dejar que sea solo objectid o podemos hacer que dentro del model, si id es un string, entonces se lo convierte a ObjectId 
  createObject(parameters: Parameters): Promise<ClassType | null>; // recibe los atributos para crear un objeto nuevo, y si se crea el objeto nuevo lo devuelve, sino se puede crear por alguna razon entonces devuelve null
  deleteObject(parameters: Parameters): Promise<Boolean>; // recibe atributos (seguramente va a ser un id) y si se encuentra un objeto con ese id entonces se lo elimina y devuelve true, si no se encuentra entonces devuelve false
  updateObject(parameters: Parameters): Promise<ClassType | null>; // recibe los atributos para modificar un objeto, si se modifica correctamente devuelve el objeto modificado, sino devuelve null
}

// estructura base de la clase controller de un Modelo
export interface Controller<ClassType, Parameters>{ // TODO: Vamos a dejar que la promise sea any por ahora, pero quizas mas adelante podamos definir una especifica
  handleGetObject(req: Request, res: Response): Promise<any>
  handleCreateObject(req: Request, res: Response): Promise<any>
  handleDeleteObject(req: Request, res: Response): Promise<any>
  handleUpdateObject(req: Request, res: Response): Promise<any>
}