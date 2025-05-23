// src/pages/RatingsReceivedPage.jsx
import React, { useEffect, useState } from "react";
import { fetchRatingsByUserId } from "../features/ratings/ratingsService"; // RUTA CORRECTA
import RatingsList from "../features/ratings/RatingsList"; // RUTA CORRECTA


export default function RatingsReceivedPage() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // ID del arrendador que estamos consultando, puede ser dinámico

  useEffect(() => {
    fetchRatingsByUserId(userId)
      .then((data) => {
        setRatings(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Cargando calificaciones...</p>;

  return (
    <div>
      <h2>Calificaciones recibidas (Arrendador ID: {userId})</h2>
      <RatingsList ratings={ratings} />
    </div>
  );
}
