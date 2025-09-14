/// <reference types="vite/client" />
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({ // aca creamos una configuracion por defecto para todas las requests, asi no tenemos que repetir la url y los headers a cada rato
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// a continuacion, hacemos que todas las requests incluyan el token, si existe. Asi no tenemos que agregarlo manualmente en todos los fetch
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) { // si no existe el token o por alguna razon no se incluyo un header (si intentamos agregar un header y el objeto de header no esta agregado en la request interceptada entonces da error --> lo ponemos por si a caso pero realmente no es muy necesario), entonces no agregamos el token a los headers
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Trips
export const listTrips = async () => {
  const { data } = await api.get("/api/trips");
  return data;
};
export const createTrip = async (payload: any) => {
  const { data } = await api.post("/api/trips", payload);
  return data;
};
export const getTrip = async (id: string) => {
  const { data } = await api.get(`/api/trips/${id}`);
  return data;
};
export const joinTrip = async (id: string) => {
  const { data } = await api.post(`/api/trips/${id}/join`);
  return data;
};

// Activities
export const createActivity = async (tripId: string, payload: any) => {
  const { data } = await api.post(`/api/trips/${tripId}/activities`, payload);
  return data;
};
export const voteActivity = async (tripId: string, activityId: string) => {
  const { data } = await api.post(`/api/trips/${tripId}/activities/${activityId}/vote`);
  return data;
};

// Auth
export const login = async (payload: { mail: string; contrasenia: string }) => {
  const { data } = await api.post("/api/userAuth/login", payload);
  return data;
};
export const register = async (payload: { nombre: string; mail: string; contrasenia: string }) => {
  const { data } = await api.post("/api/userAuth/register", payload);
  return data;
};
