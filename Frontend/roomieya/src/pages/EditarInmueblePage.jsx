import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const provincias = ['Lima', 'Callao', 'Arequipa'];
const distritosPorProvincia = {
  Lima: ['Miraflores', 'Surco', 'San Miguel', 'Barranco'],
  Callao: ['Bellavista', 'La Perla', 'Carmen de la Legua'],
  Arequipa: ['Cercado', 'Yanahuara', 'Sachaca']
};

const serviciosDisponibles = ['Wifi', 'Agua caliente', 'Cocina', 'Parrilla', 'Jardín'];

const EditarInmueblePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
    provincia: '',
    distrito: '',
    tamano: '',
    precio: '',
    servicios: [],
    descripcion: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8081/api/inmuebles/${id}`)
      .then(({ data }) => {
        setFormData({
          nombre: data.nombre,
          direccion: data.direccion,
          tipo: data.tipo,
          provincia: data.provincia,
          distrito: data.distrito,
          tamano: data.tamano,
          precio: data.precio,
          servicios: Array.isArray(data.servicios) ? data.servicios : [],
          descripcion: data.descripcion
        });
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo cargar el inmueble');
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'provincia') {
      setFormData(prev => ({
        ...prev,
        provincia: value,
        distrito: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServicioToggle = servicio => {
    setFormData(prev => {
      const serviciosSet = new Set(prev.servicios);
      if (serviciosSet.has(servicio)) {
        serviciosSet.delete(servicio);
      } else {
        serviciosSet.add(servicio);
      }
      return { ...prev, servicios: Array.from(serviciosSet) };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      ...formData,
      servicios: formData.servicios.map(s => s.trim())
    };

    try {
      await axios.put(`http://localhost:8081/api/inmuebles/${id}`, payload);
      navigate('/mis-inmuebles');
    } catch (err) {
      console.error(err);
      setError('Error al guardar cambios');
    }
  };

  const distritosDisponibles = formData.provincia ? distritosPorProvincia[formData.provincia] || [] : [];

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

        {/* Provincia */}
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

        {/* Distrito */}
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

        {/* Tamaño */}
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

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label">Precio mensual (S/)</label>
          <input
            name="precio"
            type="number"
            min="0"
            className="form-control"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Servicios (checkboxes) */}
        <div className="mb-3">
          <label className="form-label">Servicios incluidos</label>
          <div className="d-flex flex-wrap gap-3">
            {serviciosDisponibles.map(servicio => (
              <div key={servicio} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={servicio}
                  checked={formData.servicios.includes(servicio)}
                  onChange={() => handleServicioToggle(servicio)}
                />
                <label className="form-check-label" htmlFor={servicio}>
                  {servicio}
                </label>
              </div>
            ))}
          </div>
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
