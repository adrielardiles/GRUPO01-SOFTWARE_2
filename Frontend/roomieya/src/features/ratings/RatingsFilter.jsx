import React from "react";

const RatingsFilter = ({ filters, onChange }) => {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <select
        className="border rounded-xl p-2"
        value={filters.minStars}
        onChange={(e) => onChange({ ...filters, minStars: parseInt(e.target.value) })}
      >
        <option value={0}>Todas las estrellas</option>
        <option value={3}>3 estrellas o más</option>
        <option value={4}>4 estrellas o más</option>
        <option value={5}>Solo 5 estrellas</option>
      </select>
      <select
        className="border rounded-xl p-2"
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">Todos los tipos</option>
        <option value="positiva">Positiva</option>
        <option value="neutral">Neutral</option>
        <option value="negativa">Negativa</option>
      </select>
    </div>
  );
};

export default RatingsFilter;