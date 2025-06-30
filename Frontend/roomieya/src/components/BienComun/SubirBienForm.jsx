// src/components/BienComun/SubirBienForm.jsx

import '../../styles/inventoryForm.css'; // Asegúrate de que la ruta sea correcta
// src/components/BienComun/SubirBienForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SubirBienForm = ({ usuarioId, subirBien }) => {
  const [bien, setBien] = useState({
    nombre: '',
    descripcion: '',
    estado: 'DISPONIBLE',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBien((prevBien) => ({
      ...prevBien,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/bienes/subir', bien, {
        params: { usuarioId: usuarioId }, // Enviamos el usuarioId al backend
      });
      alert('Bien subido con éxito');
      setBien({ nombre: '', descripcion: '', estado: 'DISPONIBLE' });
    } catch (error) {
      console.error('Error al subir el bien:', error);
      alert('Hubo un error al subir el bien');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={bien.nombre}
        onChange={handleChange}
        placeholder="Nombre del bien"
        required
      />
      <input
        type="text"
        name="descripcion"
        value={bien.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <select name="estado" value={bien.estado} onChange={handleChange}>
        <option value="DISPONIBLE">Disponible</option>
        <option value="EN_USO">En uso</option>
        <option value="EN_REPARACION">En reparación</option>
      </select>
      <button type="submit">Subir Bien</button>
    </form>
  );
};

export default SubirBienForm;
