import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const provincias = ['Lima', 'Callao', 'Arequipa'];
const distritosPorProvincia = {
  Lima: ['Miraflores', 'Surco', 'San Miguel', 'Barranco'],
  Callao: ['Bellavista', 'La Perla', 'Carmen de la Legua'],
  Arequipa: ['Cercado', 'Yanahuara', 'Sachaca']
};

const RegistrarInmueblePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
    provincia: '',
    distrito: '',
    tamano: '',
    precio: '',
    servicios: '',
    descripcion: '',
    privado: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    // Si cambia la provincia, resetear el distrito
    if (name === 'provincia') {
      setFormData(prev => ({
        ...prev,
        provincia: value,
        distrito: '' // limpiar distrito
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'privado' ? (value === 'true') : value
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Transformar servicios separados por coma en array si el backend lo espera así
    const payload = {
      ...formData,
      servicios: formData.servicios.split(',').map(s => s.trim())
    };

    try {
      await axios.post('http://localhost:8081/api/inmuebles', payload);
      navigate('/mis-inmuebles');
    } catch (err) {
      console.error(err);
      setError('Error al registrar, inténtalo de nuevo');
    }
  };

  const distritosDisponibles = formData.provincia ? distritosPorProvincia[formData.provincia] || [] : [];

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

        {/* PROVINCIA */}
        <div className="mb-3">
          <label className="form-label">Provincia</label>
          <select
            name="provincia"
            className="form-select"
            value={formData.provincia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            {provincias.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* DISTRITO */}
        <div className="mb-3">
          <label className="form-label">Distrito</label>
          <select
            name="distrito"
            className="form-select"
            value={formData.distrito}
            onChange={handleChange}
            required
            disabled={!formData.provincia}
          >
            <option value="">Seleccione</option>
            {distritosDisponibles.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* PRIVACIDAD */}
        <div className="mb-3">
          <label className="form-label">Tipo de acceso</label>
          <select
            name="privado"
            className="form-select"
            value={formData.privado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value={true}>Privado</option>
            <option value={false}>Compartido</option>
          </select>
        </div>

        {/* TAMAÑO */}
        <div className="mb-3">
          <label className="form-label">Tamaño (m²)</label>
          <input
            name="tamano"
            type="number"
            min="0"
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
            min="0"
            step="0.01"
            className="form-control"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* SERVICIOS */}
        <div className="mb-3">
          <label className="form-label">Servicios incluidos (separados por comas)</label>
          <input
            name="servicios"
            type="text"
            className="form-control"
            placeholder="Ej. Wifi, Agua caliente, Cocina"
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
