import React from "react";

const RatingCard = ({ rating }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-md mx-auto mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{rating.userFrom}</h3>
        <span className="text-yellow-500 font-bold">{"★".repeat(rating.score)}</span>
      </div>
      <p className="text-gray-700 mb-1">{rating.comment}</p>
      <p className="text-sm text-gray-400">{rating.date}</p>
    </div>
  );
};

export default RatingCard;