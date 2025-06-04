import React, { useState } from 'react';
import InventoryForm from '../components/InventoryForm';
import { registerItem } from '../services/inventoryService';

const InventoryFormContainer = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cantidad: '',
    estado: '',
    observaciones: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerItem(formData);
      alert('Bien registrado con éxito');
      setFormData({ nombre: '', cantidad: '', estado: '', observaciones: '' });
    } catch (error) {
      console.error('Error al registrar bien:', error);
      alert('Hubo un error al registrar el bien.');
    }
  };

  return (
    <InventoryForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default InventoryFormContainer;
