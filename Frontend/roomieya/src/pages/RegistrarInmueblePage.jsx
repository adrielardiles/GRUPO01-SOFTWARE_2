// src/pages/RegistrarInmueblePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrarInmueblePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
    ubicacion: '',
    tamano: '',
    precio: '',
    servicios: '',
    descripcion: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/inmuebles', formData);
      navigate('/mis-inmuebles');
    } catch (err) {
      console.error(err);
      setError('Error al registrar, inténtalo de nuevo');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registrar Inmueble</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* NOMBRE */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* DIRECCIÓN */}
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            name="direccion"
            type="text"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        {/* TIPO */}
        <div className="mb-3">
          <label className="form-label">Tipo de inmueble</label>
          <select
            name="tipo"
            className="form-select"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Departamento">Departamento</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Casa">Casa</option>
          </select>
        </div>

        {/* UBICACIÓN */}
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            name="ubicacion"
            type="text"
            className="form-control"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        {/* TAMAÑO */}
        <div className="mb-3">
          <label className="form-label">Tamaño (m²)</label>
          <input
            name="tamano"
            type="number"
            className="form-control"
            value={formData.tamano}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRECIO */}
        <div className="mb-3">
          <label className="form-label">Precio mensual (S/)</label>
          <input
            name="precio"
            type="number"
            className="form-control"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* SERVICIOS */}
        <div className="mb-3">
          <label className="form-label">Servicios incluidos</label>
          <input
            name="servicios"
            type="text"
            className="form-control"
            value={formData.servicios}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrar inmueble</button>
      </form>
    </div>
  );
};

export default RegistrarInmueblePage;
