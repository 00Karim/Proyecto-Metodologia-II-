import mongoose from "mongoose";
import { ActivityModel, type ActivityDocument } from "./entities/activity.js";
import { TourCulturalModel } from "../models/activities/tourCultural.js";
import type { TourCulturalDocument } from "../models/activities/tourCultural.js";
import { TourGastronomicoModel } from "../models/activities/tourGastronomico.js";
import type { TourGastronomicoDocument } from "../models/activities/tourGastronomico.js";
import { TourNaturalModel } from "../models/activities/tourNatural.js";
import type { TourNaturalDocument } from "../models/activities/tourNatural.js";
import { SalidaNocturnaModel } from "../models/activities/salidaNocturna.js";
import type { SalidaNocturnaDocument } from "../models/activities/salidaNocturna.js";
import { SalidaEnBiciModel } from "../models/activities/salidaBici.js";
import type { SalidaEnBiciDocument } from "../models/activities/salidaBici.js";

import type { ModelParams } from "../types+interfaces/typesInterfaces.js";

// estructura del return de un create de activity
type PossibleReturnedActivities = | ActivityDocument | TourCulturalDocument | TourGastronomicoDocument | TourNaturalDocument | SalidaNocturnaDocument | SalidaEnBiciDocument;

class BaseActivityModel {
  async getObject(id: string): Promise<ActivityDocument | null> {
    return ActivityModel.findById(id);
  }

  async getAllObjects(): Promise<ActivityDocument[]> {
    return ActivityModel.find();
  }

  async createObject(parameters: ModelParams): Promise<PossibleReturnedActivities | null> {
    if (!parameters.nombre || !parameters.descripcion || !parameters.tripId) {
      throw new Error("Faltan campos obligatorios");
    }

    const base = {
      nombre: parameters.nombre,
      descripcion: parameters.descripcion,
      votos: parameters.votos ?? 0,
      tripId: parameters.tripId,
      fecha: parameters.fecha
    };

    switch (parameters.tipo) {
      case "tourcultural": {
        const doc = new TourCulturalModel({
          ...base,
          nombreGuia: parameters.nombreGuia,
          idiomas: parameters.idiomas,
          puntoEncuentro: parameters.puntoEncuentro,
          lugaresVisitados: parameters.lugaresVisitados,
          precioEntradas: parameters.precioEntradas,
        });
        return (await doc.save()) as ActivityDocument;
      }

      case "tourgastronomico": {
        const doc = new TourGastronomicoModel({
          ...base,
          nombreGuia: parameters.nombreGuia,
          idiomas: parameters.idiomas,
          establecimientos: parameters.establecimientos,
          degustacionesIncluidas: parameters.degustacionesIncluidas,
          cantidadDegustaciones: parameters.cantidadDegustaciones,
          tipoCocina: parameters.tipoCocina,
          opcionesVegetarianas: parameters.opcionesVegetarianas,
          restriccionesAlimentarias: parameters.restriccionesAlimentarias,
          puntoEncuentro: parameters.puntoEncuentro,
        });
        return (await doc.save()) as ActivityDocument;
      }

      case "tournatural": {
        const doc = new TourNaturalModel({
          ...base,
          nombreGuia: parameters.nombreGuia,
          idiomas: parameters.idiomas,
          ubicaciones: parameters.ubicaciones,
          puntoEncuentro: parameters.puntoEncuentro,
          distanciaKm: parameters.distanciaKm,
          elevacionMetros: parameters.elevacionMetros,
          faunaPosibleVer: parameters.faunaPosibleVer,
          floraPosibleVer: parameters.floraPosibleVer,
          esAPie: parameters.esAPie,
          requiereTransporteAlLugar: parameters.requiereTransporteAlLugar,
          transporteIncluido: parameters.transporteIncluido,
          dificultad: parameters.dificultad,
          recomendaciones: parameters.recomendaciones,
          itemsNecesarios: parameters.itemsNecesarios,
        });
        return (await doc.save()) as ActivityDocument;
      }

      case "salidanocturna": {
        const doc = new SalidaNocturnaModel({
          ...base,
          zona: parameters.zona,
          incluyeTransporte: parameters.incluyeTransporte,
          valorEntrada: parameters.valorEntrada,
          bebidasIncluidas: parameters.bebidasIncluidas,
          codigoVestimenta: parameters.codigoVestimenta,
        });
        return (await doc.save()) as ActivityDocument;
      }

      case "salidaenbici": {
        const doc = new SalidaEnBiciModel({
          ...base,
          puntoPartida: parameters.puntoPartida,
          kmTotales: parameters.kmTotales,
          dificultad: parameters.dificultad,
          requiereExperiencia: parameters.requiereExperiencia,
        });
        return (await doc.save()) as ActivityDocument;
      }

      default: {
        // por si en algún futuro agregás otro tipo y se te escapa
        const neverTipo: never = parameters;
        throw new Error(`Tipo de actividad no soportado: ${(neverTipo as any).tipo}`);
      }
    }
    
  }

  async deleteObject(id: string): Promise<boolean> {
    const result = await ActivityModel.findByIdAndDelete(id);
    return !!result;
  }

  async updateObject(id: string, changes: ModelParams): Promise<ActivityDocument | null> {
    const existing = await ActivityModel.findById(id);
    if (!existing) throw new Error("No existe la actividad");

    const tipo = existing.tipo; // extraemos el tipo de activity de la actividad que se quiere modificar para elegir bien el modelo

    switch (tipo) {
      case "tourcultural":
        return await TourCulturalModel.findByIdAndUpdate(id, changes, { new: true });

      case "tourgastronomico":
        return await TourGastronomicoModel.findByIdAndUpdate(id, changes, { new: true });

      case "tournatural":
        return await TourNaturalModel.findByIdAndUpdate(id, changes, { new: true });

      case "salidanocturna":
        return await SalidaNocturnaModel.findByIdAndUpdate(id, changes, { new: true });

      case "salidaencici":
        return await SalidaEnBiciModel.findByIdAndUpdate(id, changes, { new: true });

      default:
        throw new Error("Tipo de actividad inválido");
    }
  }
}

export const ActivityService = new BaseActivityModel();