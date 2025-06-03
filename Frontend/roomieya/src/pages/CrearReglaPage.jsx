// src/pages/CrearReglaPage.jsx
import React, { useState } from 'react';

const CrearReglaPage = () => {
  const [regla, setRegla] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setRegla(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regla.trim()) {
      setError('La regla no puede estar vacía.');
      return;
    }
    setError('');
    // Aquí iría la lógica para enviar la regla al backend (pendiente TA007)
    setMensaje('Regla creada correctamente (simulado)');
    setRegla('');
  };

  return (
    <div className="container mt-5">
      <h1>Crear regla de convivencia</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="regla" className="form-label">Regla</label>
          <textarea
            id="regla"
            className="form-control"
            value={regla}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear regla</button>
      </form>
    </div>
  );
};

export default CrearReglaPage;
