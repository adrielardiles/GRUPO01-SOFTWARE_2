import axios from 'axios';

const API_URL = 'http://localhost:3000/api/inventario'; // Cambia esto según tu backend

export const registerItem = async (itemData) => {
  const response = await axios.post(API_URL, itemData);
  return response.data;
};
