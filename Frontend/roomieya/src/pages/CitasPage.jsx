import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // 👈 Importa useParams
import { getCitas, createCita, cancelarCita ,getCitasByPublicacion} from '../api/citaApi';
import CitaForm from '../components/CitaForm';
import CitaList from '../components/CitaList';
import '../styles/CitasPage.css';

const CitasPage = () => {
  const { id } = useParams(); // 👈 Aquí capturas el ID
  const [citas, setCitas] = useState([]);

const loadCitas = async () => {
  const res = await getCitasByPublicacion(id); // usa solo las de esa publicación
  setCitas(res.data);
};

  useEffect(() => {
    loadCitas();
  }, []);

  const handleAdd = async (data) => {
  const usuarioId = localStorage.getItem("usuarioId"); // o tu forma de identificar al usuario
  await createCita({ ...data, publicacionId: id, usuarioId });
  loadCitas();
};


  const handleCancel = async (id) => {
    await cancelarCita(id);
    loadCitas();
  };

  const citasActivas = citas.filter(c => c.estado !== "CANCELADO");
  const citasCanceladas = citas.filter(c => c.estado === "CANCELADO");

  return (
    <div className="citas-container">
      <h2 className="citas-title">Citas para la Publicación #{id}</h2>
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
