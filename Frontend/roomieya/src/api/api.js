// src/services/api.js
import { API } from '../api/endpoints';

export const guardarReglaDisponibilidad = async (datos) => {
  const response = await fetch(API.reglas.guardar, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error("Error guardando la regla");
  }

  return response.json();
};
