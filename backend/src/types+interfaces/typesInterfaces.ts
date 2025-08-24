import { Document } from "mongoose";

// ---- INICIO INTERFACES DE DOCUMENTOS ----

// estructura de un documento de tipo Trip
export interface TripDocument extends Document {
  title: string;
  description: string;
}

// ---- FIN INTERFACES DE DOCUMENTOS ----

// estructura de la clase de un Modelo
export interface Model <ClassType, Parameters>{ // de esta forma podemos dinamizar esta interfaz de modelos para que podamos ingresar parametros y clases dinamicamente dependiendo de que con que entidada estemos tratando
  getObject(_id: string): Promise<ClassType | null>;   // Puede devolver un objeto (conforme vamos creando entidades, vamos a ir agregando otros posibles outputs) o null 
  createObject(parameters: Parameters): Promise<ClassType>; // Recibe atributos y devuelve el objeto creado (conforme vamos creando entidades, vamos a ir agregando otros posibles outputs y )
}