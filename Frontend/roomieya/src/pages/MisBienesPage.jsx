// src/pages/MisBienesPage.jsx
import React, { useState, useEffect } from 'react';
import MisBienes from '../components/BienComun/MisBienes';
import useBienes from '../hooks/useBienes';

const MisBienesPage = () => {
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const storedUsuarioId = localStorage.getItem('usuarioId');
    if (storedUsuarioId) {
      setUsuarioId(storedUsuarioId);
    } else {
      window.location.href = '/login';  // Si no está logueado, redirige al login
    }
  }, []);

  const { bienes, loading, error } = useBienes(usuarioId);  // El hook obtiene los bienes del backend

  return (
    <div>
      <h1>Mis Bienes Comunes</h1>
      {loading && <p>Cargando bienes...</p>}
      {error && <p>{error}</p>}
      <MisBienes bienes={bienes} />  {/* Componente para mostrar los bienes */}
    </div>
  );
};

export default MisBienesPage;
