import React, { useState } from 'react';
import PublicacionForm from '../pages/PublicacionForm';
import { crearPublicacionDTO } from '../utils/publicacionFactory';
import { PublicacionService } from '../services/publicacionService';

export default function PublicacionContainer() {
  const [datos, setDatos] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = crearPublicacionDTO(datos);
      await PublicacionService.crearPublicacion(formData);
      alert('Publicación creada exitosamente');
      setDatos({ titulo: '', descripcion: '', precio: '', imagen: null });
    } catch (error) {
      alert('Error al crear publicación: ' + error.message);
    }
  };

  return (
    <PublicacionForm datos={datos} onChange={handleChange} onSubmit={handleSubmit} />
  );
}
