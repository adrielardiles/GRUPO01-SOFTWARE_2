import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarInmueblePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipo: '',
    ubicacion: '',
    tamano: '',
    precio: '',
    servicios: '',
    descripcion: '',
  });

  const [errores, setErrores] = useState({});

  // Cargar datos iniciales simulados o desde backend (se puede modificar luego)
  useEffect(() => {
    // Aquí podrías hacer fetch para traer datos reales, por ahora datos falsos:
    const fetchInmueble = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/inmuebles/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al cargar inmueble:', error);
        alert('No se pudo cargar el inmueble');
      }
    };
    fetchInmueble();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validar = () => {
    const newErrors = {};
    if (!formData.tipo) newErrors.tipo = 'Seleccione un tipo de inmueble';
    if (!formData.ubicacion || formData.ubicacion.length < 3)
      newErrors.ubicacion = 'Ubicación muy corta (mínimo 3 caracteres)';
    if (!formData.tamano || Number(formData.tamano) <= 0)
      newErrors.tamano = 'El tamaño debe ser mayor a 0';
    if (!formData.precio || Number(formData.precio) <= 0)
      newErrors.precio = 'El precio debe ser mayor a 0';
    if (formData.servicios && formData.servicios.length < 5)
      newErrors.servicios = 'Especifique mejor los servicios (mínimo 5 caracteres)';
    if (!formData.descripcion || formData.descripcion.length < 10)
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validar()) {
      try {
        const response = await axios.put(
          `http://localhost:8081/api/inmuebles/${id}`,
          formData
        );
        console.log('Inmueble actualizado:', response.data);
        alert('Cambios guardados correctamente');
        navigate('/mis-inmuebles');
      } catch (error) {
        console.error('Error al actualizar inmueble:', error);
        alert('Error al guardar los cambios, intenta de nuevo');
      }
    } else {
      console.log('Errores:', errores);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h1>Editar Inmueble</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Tipo de inmueble</label>
          <select
            className={`form-select ${errores.tipo ? 'is-invalid' : ''}`}
            name="tipo"
            value={formData.tipo || ''}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Departamento">Departamento</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Casa">Casa</option>
          </select>
          {errores.tipo && <div className="invalid-feedback">{errores.tipo}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className={`form-control ${errores.ubicacion ? 'is-invalid' : ''}`}
            name="ubicacion"
            value={formData.ubicacion || ''}
            onChange={handleChange}
          />
          {errores.ubicacion && <div className="invalid-feedback">{errores.ubicacion}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tamaño (m²)</label>
          <input
            type="number"
            className={`form-control ${errores.tamano ? 'is-invalid' : ''}`}
            name="tamano"
            value={formData.tamano || ''}
            onChange={handleChange}
          />
          {errores.tamano && <div className="invalid-feedback">{errores.tamano}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Precio mensual (S/)</label>
          <input
            type="number"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
            name="precio"
            value={formData.precio || ''}
            onChange={handleChange}
          />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Servicios incluidos</label>
          <input
            type="text"
            className={`form-control ${errores.servicios ? 'is-invalid' : ''}`}
            name="servicios"
            value={formData.servicios || ''}
            onChange={handleChange}
          />
          {errores.servicios && <div className="invalid-feedback">{errores.servicios}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            name="descripcion"
            value={formData.descripcion || ''}
            onChange={handleChange}
          />
          {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarInmueblePage;
