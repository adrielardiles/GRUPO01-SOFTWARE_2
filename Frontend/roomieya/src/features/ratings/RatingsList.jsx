// src/features/ratings/RatingsList.jsx
import React from "react";
import RatingCard from "../../components/RatingCard";

const RatingsList = ({ ratings }) => {
  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <RatingCard key={rating.id} rating={rating} />
      ))}
    </div>
  );
};

export default RatingsList;