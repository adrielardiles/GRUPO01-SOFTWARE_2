import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarInmueblePage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    axios.get(`http://localhost:8081/api/inmuebles/${id}`)
      .then(({ data }) => setFormData({
        nombre: data.nombre,
        direccion: data.direccion,
        tipo: data.tipo,
        ubicacion: data.ubicacion,
        tamano: data.tamano,
        precio: data.precio,
        servicios: data.servicios,
        descripcion: data.descripcion
      }))
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar el inmueble');
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/inmuebles/${id}`, formData);
      navigate('/mis-inmuebles');
    } catch (err) {
      console.error(err);
      setError('Error al guardar cambios');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Editar Inmueble</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
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
        {/* Dirección */}
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
        {/* Tipo */}
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
        {/* Ubicación */}
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
        {/* Tamaño */}
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
        {/* Precio */}
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
        {/* Servicios */}
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
        {/* Descripción */}
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
        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarInmueblePage;
