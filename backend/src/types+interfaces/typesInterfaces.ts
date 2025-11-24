import { Document, type ObjectId } from "mongoose";
import mongoose from "mongoose";
import type { Request, Response } from "express";
//import type { Schema } from "inspector/promises";


// ---- INICIO INTERFACES DE DOCUMENTOS ----

// estructura de un documento de tipo User
export interface UserDocument extends Document {
  nombre: string;
  mail: string;
  contrasenia: string;
  permisos: string[]
}

// estructura de un documento de tipo Activity
export interface ActivityDocument extends Document {
  tipo: string;
  nombre: string;
  descripcion: string;
  votos: number;
  tripId: string;
  fecha: Date
}

// estructura de un documento de tipo Trip
export interface TripDocument extends Document {
  _id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  participants: ObjectId[];
  administrators: ObjectId[];
  activities: mongoose.Types.ObjectId[];
}

// ---- FIN INTERFACES DE DOCUMENTOS ----

// ---- INICIO INTERFACES DOCUMENTOS ACTIVITIES ----
export interface TourCulturalDocument extends ActivityDocument {
  nombreGuia: string;                // nombre del guía
  idiomas: string[];           // idioma del tour ya que a veces podes darlo en distintos idiomas
  puntoEncuentro: string;      // dirección o coordenadas
  lugaresVisitados: string[];  // lista de museos o sitios culturales
  precioEntradas: number;
  tipo: "tourcultural"
}

export interface TourGastronomicoDocument extends ActivityDocument {
  nombreGuia: string;                         
  idiomas: string[];                    
  establecimientos: string[];           // restaurantes, bares, mercados o puestos visitados
  degustacionesIncluidas: boolean;      // si en el tour se va a dar desgustaciones de la comida
  cantidadDegustaciones: number;        // la cantidad de platos o instancias de degustacion
  tipoCocina: string[];                 // tipos de cocina como "Parrilla" o "Pastas"
  opcionesVegetarianas: boolean;        // se hay una opcion vegetariana 
  restriccionesAlimentarias: string[];  // para informar a intolerantes a la lactosa o al gluten o que tengan alguna alergia
  puntoEncuentro: string; 
  tipo: "tourgastronomico"              
}

export interface TourNaturalDocument extends ActivityDocument {
  nombreGuia: string;                      // Nombre del guía
  idiomas: string[];                 // Idiomas disponibles
  ubicaciones: string[];                 // a que zonas van a ir: parques, o loq sea. Igualmente lo mas probable es que sea 1 solo lugar pero pongamos array por si a caso
  puntoEncuentro: string;            
  distanciaKm: number;               // Distancia total del recorrido
  elevacionMetros?: number;          // si se va a tener que caminar por una montana o algo asi, se tiene que aclarar
  faunaPosibleVer: string[];         // animales que pueden verse
  floraPosibleVer: string[];         // plantas/árboles característicos
  esAPie: boolean;
  requiereTransporteAlLugar: boolean;       // si se necesita traslado adicional (para ir al lugar)
  transporteIncluido: boolean;       // si el tour incluye transporte
  dificultad: "baja" | "media" | "alta"; // esto es por si se tiene que recorrer terrenos complicados a pie
  recomendaciones: string[];         // ropa, protector solar, etc.
  itemsNecesarios: string[];         // mochila, zapatillas especiales, agua, etc.
	tipo: "tournatural"
}

export interface SalidaNocturnaDocument extends ActivityDocument {
  zona: string;                 
  incluyeTransporte: boolean;   // si incluye traslado ida/vuelta
  valorEntrada: number;     
  bebidasIncluidas: boolean;      // si incluye consumición/bebidas
  codigoVestimenta: string;           // "casual", "elegante", "disfraz"
	tipo: "salidanocturna"
}

export interface SalidaEnBici extends ActivityDocument {
  puntoPartida: string;                 
  kmTotales: number;                     
  dificultad: "baja" | "media" | "alta";
  requiereExperiencia: boolean; 
	tipo: "salidaenbici"        
}

// estos son los parametros para el model de activity
export type ModelParams = | TourCulturalDocument | TourGastronomicoDocument | TourNaturalDocument | SalidaNocturnaDocument | SalidaEnBici;
// ---- FIN INTERFACES DE DOCUMENTOS ACTIVITIES ----

// estructura de la clase de un Modelo
export interface Model <ClassType, Parameters>{ // de esta forma podemos dinamizar esta interfaz de modelos para que podamos ingresar parametros y clases dinamicamente dependiendo de que con que entidada estemos tratando
  getObject(_id: mongoose.Types.ObjectId | string): Promise<ClassType | null>;   // Puede devolver un objeto (conforme vamos creando entidades, vamos a ir agregando otros posibles outputs) o null // TODO: por ahora podemos dejar que sea string o object id, pero despues creo que podriamos dejar que sea solo objectid o podemos hacer que dentro del model, si id es un string, entonces se lo convierte a ObjectId 
  createObject(parameters: Parameters): Promise<ClassType | null>; // recibe los atributos para crear un objeto nuevo, y si se crea el objeto nuevo lo devuelve, sino se puede crear por alguna razon entonces devuelve null
  deleteObject(_id: mongoose.Types.ObjectId | string): Promise<Boolean>; // recibe atributos (seguramente va a ser un id) y si se encuentra un objeto con ese id entonces se lo elimina y devuelve true, si no se encuentra entonces devuelve false
  updateObject(parameters: Parameters): Promise<ClassType | null>; // recibe los atributos para modificar un objeto, si se modifica correctamente devuelve el objeto modificado, sino devuelve null
}

// estructura base de la clase controller de un Modelo
export interface Controller<ClassType, Parameters>{ // TODO: Vamos a dejar que la promise sea any por ahora, pero quizas mas adelante podamos definir una especifica
  handleGetObject(req: Request, res: Response): Promise<any>
  handleCreateObject(req: Request, res: Response): Promise<any>
  handleDeleteObject(req: Request, res: Response): Promise<any>
  handleUpdateObject(req: Request, res: Response): Promise<any>
}