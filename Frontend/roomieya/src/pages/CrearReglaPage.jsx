import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearReglaPage = () => {
  const [formData, setFormData] = useState({
    regla: '',
    categoria: ''
  });
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const navigate = useNavigate(); // Hook de React Router para redirección

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    if (!formData.regla.trim()) {
      setError('La regla no puede estar vacía');
      return;
    }
    if (formData.categoria === '') {
      setError('Debe seleccionar una categoría');
      return;
    }

    setError('');
    // Llamada al backend para guardar la regla
    axios
      .post('http://localhost:8081/api/reglas', formData) // Aquí cambia el puerto si es necesario
      .then((response) => {
        setMensajeExito('Regla guardada exitosamente');
        setFormData({ regla: '', categoria: '' }); // Limpiar formulario
      })
      .catch((err) => {
        setError('Error al guardar la regla');
        console.error(err);
      });
  };

  const handleRedirigir = () => {
    navigate('/reglas-pendientes'); // Redirige a la página de reglas pendientes
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1>Crear Regla de Convivencia</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="regla" className="form-label">
              Regla de convivencia
            </label>
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
            <label htmlFor="categoria" className="form-label">
              Categoría (opcional)
            </label>
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

          <button type="submit" className="btn btn-danger">
            Guardar regla
          </button>

          {/* Botón para redirigir a la página de reglas pendientes dentro del formulario */}
          <button
            type="button" // El botón no debe enviar el formulario
            className="btn btn-danger mt-3" // Cambié 'btn-primary' por 'btn-danger' para hacerlo rojo
            onClick={handleRedirigir}
          >
            Ver Reglas Pendientes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearReglaPage;
