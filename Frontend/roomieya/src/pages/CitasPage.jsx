import React, { useEffect, useState } from 'react';
import { getCitas, createCita, deleteCita } from '../api/citaApi';
import CitaForm from '../components/CitaForm';
import CitaList from '../components/CitaList';

const CitasPage = () => {
  const [citas, setCitas] = useState([]);

  const loadCitas = async () => {
    const res = await getCitas();
    setCitas(res.data);
  };

  useEffect(() => {
    loadCitas();
  }, []);

  const handleAdd = async (data) => {
    await createCita(data);
    loadCitas();
  };

  const handleDelete = async (id) => {
    await deleteCita(id);
    loadCitas();
  };

  return (
    <div>
      <h2>Citas para Visitar Inmuebles</h2>
      <CitaForm onSubmit={handleAdd} />
      <CitaList citas={citas} onDelete={handleDelete} />
    </div>
  );
};

export default CitasPage;
