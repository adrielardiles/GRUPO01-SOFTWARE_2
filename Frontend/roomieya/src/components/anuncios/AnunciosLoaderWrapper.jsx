import React, { useEffect, useState } from 'react';
import AnunciosModal from './AnunciosModal';
import { API } from '../../api/endpoints';

const AnunciosLoaderWrapper = ({
  propertyId,
  propertyName,
  role,
  usuarioId, // ✅ Ahora se recibe correctamente como prop
  onClose,
  onActualizarInmuebles,
  onActualizarLecturas
}) => {
  const [totalPaginas, setTotalPaginas] = useState(null);
  const [paginaInicial] = useState(1);

  useEffect(() => {
    const preload = async () => {
      try {
        const response = await fetch(API.announcements.byProperty(propertyId, 1, usuarioId));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        setTotalPaginas(data.totalPaginas || 1);
      } catch (error) {
        console.error('Error en precarga de totalPaginas:', error);
        setTotalPaginas(1);
      }
    };

    preload();
  }, [propertyId, usuarioId]);

  if (totalPaginas === null) return null; // No renderiza hasta que haya datos

  return (
    <AnunciosModal
      propertyId={propertyId}
      propertyName={propertyName}
      role={role}
      usuarioId={usuarioId}
      onClose={onClose}
      onActualizarInmuebles={onActualizarInmuebles}
      onActualizarLecturas={onActualizarLecturas}
      paginaInicial={paginaInicial}
      totalPaginasPreload={totalPaginas}
    />
  );
};

export default AnunciosLoaderWrapper;
