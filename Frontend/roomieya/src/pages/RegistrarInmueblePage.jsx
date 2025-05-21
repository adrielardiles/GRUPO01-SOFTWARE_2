import React, { useState } from 'react';

const RegistrarInmueblePage = () => {
  const [formData, setFormData] = useState({
    tipo: '',
    ubicacion: '',
    tamano: '',
    precio: '',
    servicios: '',
    descripcion: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      console.log('Datos válidos:', formData);
      alert('Inmueble registrado (simulado)');
    } else {
      console.log('Errores de validación:', errores);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registrar Inmueble</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <label>
          Tipo de inmueble:
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="Departamento">Departamento</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Casa">Casa</option>
          </select>
          {errores.tipo && <p style={{ color: 'red' }}>{errores.tipo}</p>}
        </label>

        <label>
          Ubicación:
          <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
          {errores.ubicacion && <p style={{ color: 'red' }}>{errores.ubicacion}</p>}
        </label>

        <label>
          Tamaño (m²):
          <input type="number" name="tamano" value={formData.tamano} onChange={handleChange} />
          {errores.tamano && <p style={{ color: 'red' }}>{errores.tamano}</p>}
        </label>

        <label>
          Precio mensual (S/):
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} />
          {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
        </label>

        <label>
          Servicios incluidos:
          <input type="text" name="servicios" value={formData.servicios} onChange={handleChange} />
          {errores.servicios && <p style={{ color: 'red' }}>{errores.servicios}</p>}
        </label>

        <label>
          Descripción:
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
          {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
        </label>

        <button type="submit">Registrar inmueble</button>
      </form>
    </div>
  );
};

export default RegistrarInmueblePage;
