import React, { useState } from 'react';

const CitaForm = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !fecha || !hora || !direccion) return;
    onSubmit({ nombre, fecha, hora, direccion });
    setNombre('');
    setFecha('');
    setHora('');
    setDireccion('');
  };

  return (
    <form className="cita-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
        required
      />
      <input
        type="time"
        value={hora}
        onChange={e => setHora(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
        required
      />
      <button type="submit">Agendar Cita</button>
    </form>
  );
};

export default CitaForm;
