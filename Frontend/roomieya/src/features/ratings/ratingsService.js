import axios from "axios";

const BASE_URL = "http://localhost:8081/api/ratings"; // nota el puerto y el /api

export const addRating = async (ratingData) => {
  try {
    const response = await axios.post(BASE_URL, ratingData);
    return response.data;
  } catch (error) {
    console.error("Error al crear rating:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllRatings = async () => {
  const response = await axios.get("http://localhost:8081/api/ratings");
  return response.data;
};

