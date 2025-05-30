// src/api/citaApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/citas'; 

export const getCitas = () => axios.get(API_URL);
export const createCita = (data) => axios.post(API_URL, data);
export const updateCita = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const cancelarCita = (id) => axios.put(`${API_URL}/${id}/cancelar`);