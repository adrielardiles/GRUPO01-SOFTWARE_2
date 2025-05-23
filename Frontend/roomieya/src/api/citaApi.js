// src/api/citaApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/citas'; 

export const getCitas = () => axios.get(API_URL);
export const createCita = (data) => axios.post(API_URL, data);
export const updateCita = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCita = (id) => axios.delete(`${API_URL}/${id}`);
