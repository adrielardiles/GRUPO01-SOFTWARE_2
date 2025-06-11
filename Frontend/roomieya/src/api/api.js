// src/services/api.js
import { API } from '../api/endpoints';
import axios from 'axios';

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

export const fetchInmuebles = async (page = 0, size = 10, texto = '') => {
  try {
    const endpoint = texto
      ? `${API.inmuebles.buscar}?texto=${encodeURIComponent(texto)}&page=${page}&size=${size}`
      : `${API.inmuebles.listar}?page=${page}&size=${size}`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching inmuebles:', error);
    throw error;
  }
};

export const likeInmueble = async (inmuebleId) => {
  try {
    await axios.post(`${API.inmuebles.like}/${inmuebleId}`);
  } catch (error) {
    console.error('Error liking inmueble:', error);
    throw error;
  }
};

export const filtrarInmuebles = async (filtros) => {
  try {
    const params = new URLSearchParams();

    if (filtros.provincia) params.append('provincia', filtros.provincia);
    (filtros.distrito || []).forEach(d => params.append('distrito', d));
    (filtros.tipo || []).forEach(t => params.append('tipo', t));
    if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
    if (filtros.precioMax) params.append('precioMax', filtros.precioMax);
    (filtros.servicios || []).forEach(s => params.append('servicios', s));

    const response = await axios.get(`${API.inmuebles.filtrar}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error al filtrar inmuebles:', error);
    throw error;
  }
};


export const noLikeInmueble = async (inmuebleId) => {
  try {
    await axios.post(`${API.inmuebles.noLike}/${inmuebleId}`);
  } catch (error) {
    console.error('Error not liking inmueble:', error);
    throw error;
  }
};
