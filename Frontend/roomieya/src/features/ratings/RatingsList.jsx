import React from 'react';

const RatingsList = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return <p>No hay calificaciones para mostrar.</p>;
  }

  return (
    <ul>
      {ratings.map((rating) => (
        <li key={rating.id}>
          <strong>{rating.reviewerName}</strong>: {rating.comment} — ⭐ {rating.score}
        </li>
      ))}
    </ul>
  );
};

export default RatingsList;
