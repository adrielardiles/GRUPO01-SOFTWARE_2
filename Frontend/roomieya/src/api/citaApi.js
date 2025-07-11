// src/api/citaApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/citas'; 

export const getCitasByPublicacion = (publicacionId) =>
  axios.get(`${API_URL}/publicacion/${publicacionId}`);export const createCita = (data) => axios.post(API_URL, data);
export const updateCita = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const cancelarCita = (id) => axios.put(`${API_URL}/${id}/cancelar`);
export const getCitasByPublicacionAndUsuario = (publicacionId, usuarioId) =>
  axios.get(`${API_URL}/publicacion/${publicacionId}/usuario/${usuarioId}`);