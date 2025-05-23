import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRatingsByUserId } from '../features/ratings/ratingsService';
import RatingsList from '../features/ratings/RatingsList';

const RenterProfilePage = () => {
  const { userId } = useParams();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const data = await fetchRatingsByUserId(userId);
        setRatings(data);
      } catch (error) {
        console.error('Error al cargar calificaciones:', error);
      }
    };

    loadRatings();
  }, [userId]);

  return (
    <div>
      <h2>Calificaciones de arrendatario (ID: {userId})</h2>
      <RatingsList ratings={ratings} />
    </div>
  );
};

export default RenterProfilePage;

