const { connectTestDB, disconnectTestDB, clearTestDB } = require("./testDBsetup.js")
const { ActivityService } = require("../backend/dist/models/activity.model.js") 

const {
  TourCulturalModel,
} = require("../backend/dist/models/activities/tourCultural.js")
const {
  TourGastronomicoModel,
} = require("../backend/dist/models/activities/tourGastronomico.js")
const {
  TourNaturalModel,
} = require("../backend/dist/models/activities/tourNatural.js")
const {
  SalidaNocturnaModel,
} = require("../backend/dist/models/activities/salidaNocturna.js")
const {
  SalidaEnBiciModel,
} = require("../backend/dist/models/activities/salidaBici.js")


beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("ActivityService.createObject", () => {

  test("crea un tour cultural", async () => {
    const params = {
      tipo: "tourcultural",
      nombre: "City Tour Histórico",
      descripcion: "Recorrido por el casco histórico",
      tripId: "trip-1",
      votos: 0,
      idiomas: ["español", "inglés"],
      puntoEncuentro: "Plaza Principal",
      lugaresVisitados: ["Museo A", "Iglesia B"],
      precioEntradas: 1500,
      nombreGuia: "Juan Pérez",
    };

    const result = await ActivityService.createObject(params);

    expect(result).not.toBeNull();
    expect(result.nombre).toBe("City Tour Histórico");

    const stored = await TourCulturalModel.findOne({ nombre: "City Tour Histórico" }).lean();
    expect(stored).not.toBeNull();
    expect(stored.idiomas).toContain("español");
    expect(stored.precioEntradas).toBe(1500);
  });

  test("crea un tour gastronómico", async () => {
    const params = {
      tipo: "tourgastronomico",
      nombre: "Sabores de la Ciudad",
      descripcion: "Recorrido por restaurantes típicos",
      tripId: "trip-2",
      votos: 0,
      idiomas: ["español"],
      establecimientos: ["Parrilla Don Pepe", "Heladería Italia"],
      degustacionesIncluidas: true,
      cantidadDegustaciones: 3,
      tipoCocina: ["Parrilla", "Helados"],
      opcionesVegetarianas: true,
      restriccionesAlimentarias: ["sin gluten"],
      puntoEncuentro: "Rotonda central",
      nombreGuia: "María Gómez",
    };

    const result = await ActivityService.createObject(params);

    expect(result).not.toBeNull();
    expect(result.nombre).toBe("Sabores de la Ciudad");

    const stored = await TourGastronomicoModel.findOne({ nombre: "Sabores de la Ciudad" }).lean();
    expect(stored).not.toBeNull();
    expect(stored.degustacionesIncluidas).toBe(true);
    expect(stored.establecimientos.length).toBe(2);
  });

  test("crea un tour natural", async () => {
    const params = {
      tipo: "tournatural",
      nombre: "Trekking en el Cerro",
      descripcion: "Senderismo por la sierra",
      tripId: "trip-3",
      votos: 0,
      nombreGuia: "Lucía Torres",
      idiomas: ["español", "inglés"],
      ubicaciones: ["Cerro Principal"],
      puntoEncuentro: "Refugio base",
      distanciaKm: 8,
      elevacionMetros: 500,
      faunaPosibleVer: ["zorros", "águilas"],
      floraPosibleVer: ["pinos", "jarillas"],
      esAPie: true,
      requiereTransporteAlLugar: true,
      transporteIncluido: false,
      dificultad: "media",
      recomendaciones: ["llevar abrigo", "protector solar"],
      itemsNecesarios: ["agua", "zapatillas de trekking"],
    };

    const result = await ActivityService.createObject(params);

    expect(result).not.toBeNull();
    expect(result.nombre).toBe("Trekking en el Cerro");

    const stored = await TourNaturalModel.findOne({ nombre: "Trekking en el Cerro" }).lean();
    expect(stored).not.toBeNull();
    expect(stored.esAPie).toBe(true);
    expect(stored.dificultad).toBe("media");
  });

  test("crea una salida nocturna", async () => {
    const params = {
      tipo: "salidanocturna",
      nombre: "Noche de Bares",
      descripcion: "Recorrido por los mejores bares de la ciudad",
      tripId: "trip-4",
      votos: 0,
      zona: "Centro",
      incluyeTransporte: true,
      valorEntrada: 3000,
      bebidasIncluidas: true,
      codigoVestimenta: "casual",
    };

    const result = await ActivityService.createObject(params);

    expect(result).not.toBeNull();
    expect(result.nombre).toBe("Noche de Bares");

    const stored = await SalidaNocturnaModel.findOne({ nombre: "Noche de Bares" }).lean();
    expect(stored).not.toBeNull();
    expect(stored.zona).toBe("Centro");
    expect(stored.bebidasIncluidas).toBe(true);
  });

  test("crea una salida en bici", async () => {
    const params = {
      tipo: "salidaenbici",
      nombre: "Paseo en Bici Costero",
      descripcion: "Recorrido en bici por la costanera",
      tripId: "trip-5",
      votos: 0,
      puntoPartida: "Costanera norte",
      kmTotales: 15,
      dificultad: "baja",
      requiereExperiencia: false,
    };

    const result = await ActivityService.createObject(params);

    expect(result).not.toBeNull();
    expect(result.nombre).toBe("Paseo en Bici Costero");

    const stored = await SalidaEnBiciModel.findOne({ nombre: "Paseo en Bici Costero" }).lean();
    expect(stored).not.toBeNull();
    expect(stored.kmTotales).toBe(15);
    expect(stored.dificultad).toBe("baja");
  });
  test("lanza error si faltan campos base obligatorios", async () => {
    const params = {
      tipo: "tourcultural",
      descripcion: "Sin nombre",
      tripId: "trip-x",
      idiomas: ["español"],
      puntoEncuentro: "Plaza",
      lugaresVisitados: ["Museo"],
      precioEntradas: 1000,
    };

    await expect(ActivityService.createObject(params)).rejects.toThrow("Faltan campos obligatorios");
  });
});