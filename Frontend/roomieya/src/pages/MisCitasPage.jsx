import React, { useEffect, useState } from 'react';
import ListaCitas from '../components/ListaCitas';
import { obtenerCitasUsuario } from '../api/citaService';

const MisCitasPage = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuarioId = 1; // Cambia esto si el usuario se obtiene por contexto/autenticación

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await obtenerCitasUsuario(usuarioId);
        setCitas(data);
      } catch (err) {
        // Manejar error, puedes poner un mensaje si quieres
      } finally {
        setLoading(false);
      }
    };
    fetchCitas();
  }, [usuarioId]);

  if (loading) return <div>Cargando citas...</div>;

  return (
    <div style={{maxWidth:500, margin:'auto', marginTop:40}}>
      <ListaCitas citasIniciales={citas} />
    </div>
  );
};

export default MisCitasPage;
