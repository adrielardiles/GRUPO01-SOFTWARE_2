// src/components/anuncios/InmueblesGrid.jsx
import React from 'react';
import InmuebleCard from './InmuebleCard';

const InmueblesGrid = ({ inmuebles, onVerAnuncios }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {inmuebles.map((inmueble) => (
        <InmuebleCard
          key={inmueble.propertyId}
          nombre={inmueble.propertyName}
          rol={inmueble.role}
          tieneNotificacion={inmueble.hasUnread}
          onVerAnuncios={() => onVerAnuncios(inmueble)}
        />
      ))}
    </div>
  );
};

export default InmueblesGrid;
