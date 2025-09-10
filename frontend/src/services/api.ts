/// <reference types="vite/client" />
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// add interceptor to include token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
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
  const { data } = await api.post("/auth/login", payload);
  return data;
};
export const register = async (payload: { nombre: string; mail: string; contrasenia: string }) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
