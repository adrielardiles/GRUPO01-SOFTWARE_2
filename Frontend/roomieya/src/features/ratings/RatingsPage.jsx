// src/features/ratings/RatingsPage.jsx
import React, { useEffect, useState } from "react";
import RatingsList from "./RatingsList";
import RatingsFilter from "./RatingsFilter";
import { fetchRatingsByUserId } from "./ratingsService";

const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ minStars: 0, type: "" });

  useEffect(() => {
    fetchRatingsByUserId("landlord")
      .then((data) => {
        setRatings(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const filteredData = ratings.filter(
      (r) =>
        r.score >= filters.minStars &&
        (filters.type === "" || r.type === filters.type)
    );
    setFiltered(filteredData);
  }, [filters, ratings]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calificaciones de arrendadores</h1>
      <RatingsFilter filters={filters} onChange={setFilters} />
      <RatingsList ratings={filtered} />
    </div>
  );
};

export default RatingsPage;