// src/pages/CrearReglaPage.jsx
import React, { useState } from 'react';

const CrearReglaPage = () => {
  const [textoRegla, setTextoRegla] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textoRegla.trim().length < 10) {
      setError('La regla debe tener al menos 10 caracteres.');
      return;
    }
    setError('');
    // Aquí agregarás la lógica para enviar la regla al backend en tareas posteriores
    setMensaje('Regla creada correctamente (simulado)');
    setTextoRegla('');
    setCategoria('');
  };

  return (
    <div className="container mt-5">
      <h1>Crear regla de convivencia</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="textoRegla" className="form-label">Regla de convivencia</label>
          <textarea
            id="textoRegla"
            className="form-control"
            value={textoRegla}
            onChange={(e) => setTextoRegla(e.target.value)}
            rows={4}
            required
            minLength={10}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría (opcional)</label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            <option value="ruido">Ruido</option>
            <option value="limpieza">Limpieza</option>
            <option value="visitas">Visitas</option>
            <option value="seguridad">Seguridad</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Guardar regla</button>
      </form>
    </div>
  );
};

export default CrearReglaPage;
