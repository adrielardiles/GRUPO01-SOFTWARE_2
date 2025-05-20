// src/containers/grupos/EditarGrupoModalContainer.jsx
import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Comentado porque no se usará por ahora
import EditarGrupoForm from '../../components/grupos/EditarGrupoForm';
// import { API } from '../../api/endpoints'; // Comentado

const EditarGrupoModalContainer = ({ grupo, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    visibilidad: '',
    afinidad: ''
  });

  useEffect(() => {
    if (grupo) {
      setFormData({
        nombre: grupo.nombre || '',
        descripcion: grupo.descripcion || '',
        visibilidad: grupo.visibilidad || 'publico',
        afinidad: grupo.afinidad || ''
      });
    }
  }, [grupo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulación de actualización exitosa
    console.log('Grupo actualizado localmente:', formData);

    // Simular demora y luego cerrar
    setTimeout(() => {
      if (onUpdate) onUpdate(); // Simula recarga de datos
      onClose(); // Cierra el modal
    }, 500);

    // Código real (comentado hasta que el backend esté listo):
    /*
    try {
      const token = localStorage.getItem('token');
      await axios.put(API.groups.updateGroup(grupo.id), formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error('Error al actualizar grupo:', error);
    }
    */
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-75" onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar grupo</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <EditarGrupoForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarGrupoModalContainer;
