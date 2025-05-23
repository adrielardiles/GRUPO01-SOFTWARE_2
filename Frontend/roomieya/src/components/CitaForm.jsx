import React, { useState } from 'react';

const CitaForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nombre: '', fecha: '', hora: '', direccion: '' }); // Limpia el formulario
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="fecha"
        type="date"
        value={form.fecha}
        onChange={handleChange}
        required
      />
      <input
        name="hora"
        type="time"
        value={form.hora}
        onChange={handleChange}
        required
      />
      <input
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
        required
      />
      <button type="submit">Agendar Cita</button>
    </form>
  );
};

export default CitaForm;
