import React, { useEffect, useState } from 'react';
import { getCitas, createCita, deleteCita } from '../api/citaApi';
import CitaForm from '../components/CitaForm';
import CitaList from '../components/CitaList';
import '../styles/CitasPage.css'; // 👈 Asegúrate de importar el CSS

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
    <div className="citas-container">
      <h2 className="citas-title">Citas para Visitar Inmuebles</h2>
      <CitaForm onSubmit={handleAdd} />
      <div className="cita-list">
        <CitaList citas={citas} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CitasPage;
