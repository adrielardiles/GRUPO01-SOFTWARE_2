import React, { useState } from 'react';
import CitaCard from './CitaCard';

const ListaCitas = ({ citasIniciales }) => {
  const [citas, setCitas] = useState(citasIniciales);

  const handleCancel = (citaId) => {
    setCitas(citas.filter(cita => cita.id !== citaId));
  };

  return (
    <div>
      <h3 style={{marginBottom: 20}}>Mis citas agendadas</h3>
      {citas.length === 0 && <p>No tienes citas agendadas.</p>}
      {citas.map(cita => (
        <CitaCard key={cita.id} cita={cita} onCancel={handleCancel} />
      ))}
    </div>
  );
};

export default ListaCitas;
