// src/components/grupos/CrearGrupoContainer.jsx
import React, { useState, useEffect } from 'react';
import CrearGrupoForm from './CrearGrupoForm';
// import axios from 'axios';
// import { API } from '../../api/endpoints';

const CrearGrupoContainer = ({ onGrupoCreado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    visibilidad: 'publico',
    afinidad: ''
  });

  const [tiposDisponibles, setTiposDisponibles] = useState([]);

  useEffect(() => {
    const cargarTipos = async () => {
      // Simulación de llamada al backend
      /*
      const token = localStorage.getItem('token');
      const { data } = await axios.get(API.groups.affinityTypes, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTiposDisponibles(data);
      */
      // Mock temporal
      setTiposDisponibles([
        'Videojuegos',
        'Estudios',
        'Deportes',
        'Arte',
        'Tecnología',
        'Música'
      ]);
    };

    cargarTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    // await axios.post(API.groups.create, formData, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    console.log('Grupo creado:', formData);
    if (onGrupoCreado) onGrupoCreado();
  };

  return (
    <CrearGrupoForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      tiposDisponibles={tiposDisponibles}
    />
  );
};

export default CrearGrupoContainer;
