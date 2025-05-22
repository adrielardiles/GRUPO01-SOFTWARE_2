import axios from 'axios';
import { API_BASE_URL } from './endpoints';

// Agendar una cita
export const agendarCita = async ({ inmuebleId, fecha, hora }) => {
  const body = { inmuebleId, fecha, hora };
  const response = await axios.post(`${API_BASE_URL}/citas`, body);
  return response.data;
};

// Cancelar una cita
export const cancelarCita = async (citaId) => {
  const response = await axios.patch(`${API_BASE_URL}/citas/${citaId}/cancelar`);
  return response.data;
};

// Obtener todas las citas del usuario
export const obtenerCitasUsuario = async (usuarioId) => {
  // Si tu API requiere un parámetro usuarioId en la ruta, ajústalo aquí.
  // Si el backend usa el usuario autenticado, no necesitas pasar usuarioId.
  const response = await axios.get(`${API_BASE_URL}/citas/usuario/${usuarioId}`);
  return response.data;
};
