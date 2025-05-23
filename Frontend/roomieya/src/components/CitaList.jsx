import React from 'react';

const CitaList = ({ citas, onDelete }) => (
  <ul>
    {citas.length === 0 && <li>No hay citas agendadas.</li>}
    {citas.map((cita) => (
      <li key={cita.id} style={{ marginBottom: '1rem', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
        <strong>{cita.nombre}</strong> — {cita.fecha} {cita.hora} | {cita.direccion}
        <button style={{ marginLeft: '1rem', color: 'red' }} onClick={() => onDelete(cita.id)}>
          Cancelar
        </button>
      </li>
    ))}
  </ul>
);

export default CitaList;
