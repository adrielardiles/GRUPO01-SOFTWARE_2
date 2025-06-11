// src/pages/CrearReglaPage.jsx
import React, { useState } from 'react';

const CrearReglaPage = () => {
  const [formData, setFormData] = useState({
    regla: '',
    categoria: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.regla.trim()) {
      setError('La regla no puede estar vacía');
      return;
    }
    setError('');
    // Aquí llamarías al backend para enviar la regla
    alert('Regla guardada: ' + formData.regla + ', categoría: ' + formData.categoria);
  };

  return (
    <div className="container mt-5">
      <h1>Crear Regla de Convivencia</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="regla" className="form-label">Regla de convivencia</label>
          <textarea
            id="regla"
            name="regla"
            className="form-control"
            placeholder="Escribe la regla"
            value={formData.regla}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría (opcional)</label>
          <select
            id="categoria"
            name="categoria"
            className="form-select"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            <option value="General">General</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Ruido">Ruido</option>
            <option value="Uso de espacios">Uso de espacios</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Guardar regla</button>
      </form>
    </div>
  );
};

export default CrearReglaPage;
