// src/features/ratings/ratingsService.js

const API_URL = "http://localhost:8080/api/ratings";

export async function fetchRatingsByUserId(userId) {
  const response = await fetch(`${API_URL}/${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching ratings");
  }
  return response.json();
}
