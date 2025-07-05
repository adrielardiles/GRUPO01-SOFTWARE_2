import React, { useEffect, useState } from 'react';
import { getAllRatings } from '../features/ratings/ratingsService';
import RatingsList from '../features/ratings/RatingsList';

const RenterProfilePage = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const data = await getAllRatings();
        setRatings(data);
      } catch (error) {
        console.error('Error al cargar calificaciones:', error);
      }
    };

    loadRatings();
  }, []);

  return (
    <div>
      <h2>Calificaciones del arrendatario</h2> {/* Eliminado el ID */}
      <RatingsList ratings={ratings} />
    </div>
  );
};

export default RenterProfilePage;


