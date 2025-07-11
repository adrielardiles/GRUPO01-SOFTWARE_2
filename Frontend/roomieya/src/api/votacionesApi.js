import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/votaciones';

export const API = {
  votaciones: {
    crear: (data) => axios.post(`${BASE_URL}`, data),
    activas: () => axios.get(`${BASE_URL}/activas`),

    votar: (id, data) => axios.post(`${BASE_URL}/${id}/votar`, data),

    // ✅ Corrige este para usar query param
    votado: (id, usuarioId) =>
      axios.get(`${BASE_URL}/${id}/votado/${usuarioId}`),

    // ✅ Nueva función para obtener la votación por ID
    getById: (id) => axios.get(`${BASE_URL}/${id}`),

    resultados: (id) => axios.get(`${BASE_URL}/${id}/resultados`),
  },
};
