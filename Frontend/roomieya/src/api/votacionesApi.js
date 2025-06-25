import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/votaciones';

export const API = {
  votaciones: {
    crear: (data) => axios.post(`${BASE_URL}`, data),
    activas: () => axios.get(`${BASE_URL}/activas`),
    votar: (id, data) => axios.post(`${BASE_URL}/${id}/votar`, data),
    votado: (id, usuarioId) => axios.get(`${BASE_URL}/${id}/votado`, { params: { usuarioId } }),
    resultados: (id) => axios.get(`${BASE_URL}/${id}/resultados`)

  }
};