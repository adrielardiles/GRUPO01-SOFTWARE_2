import React, { useEffect, useState } from 'react';
import { getCitas, createCita, cancelarCita } from '../api/citaApi';
import CitaForm from '../components/CitaForm';
import CitaList from '../components/CitaList';
import '../styles/CitasPage.css';

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

  const handleCancel = async (id) => {
    await cancelarCita(id);
    loadCitas();
  };

  // Dividir las citas en activas y canceladas
  const citasActivas = citas.filter(c => c.estado !== "CANCELADO");
  const citasCanceladas = citas.filter(c => c.estado === "CANCELADO");

  return (
    <div className="citas-container">
      <h2 className="citas-title">Citas para Visitar Inmuebles</h2>
      <CitaForm onSubmit={handleAdd} />

      <div className="cita-list">
        <h3>Citas Activas</h3>
        <CitaList citas={citasActivas} onCancel={handleCancel} showCancelButton />

        {citasCanceladas.length > 0 && (
          <>
            <h3>Citas Canceladas</h3>
            <CitaList citas={citasCanceladas} showCancelButton={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default CitasPage;