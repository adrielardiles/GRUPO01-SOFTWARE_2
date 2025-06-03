import React, { useState, useEffect, useCallback } from 'react';
import InmueblesGrid from './InmueblesGrid';
import AnunciosLoaderWrapper from './AnunciosLoaderWrapper';
import { API } from '../../api/endpoints';

const InmueblesContainer = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [inmuebleActivo, setInmuebleActivo] = useState(null);

  const usuarioId = 1; // ✅ Usuario hardcodeado

  const fetchInmuebles = useCallback(async () => {
    try {
      const url = `${API.announcements.propertiesByUser}?usuarioId=${usuarioId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      const normalizados = data.map((item) => ({
        propertyId: item.propertyId ?? item.id,
        propertyName: item.propertyName ?? item.nombre,
        role: item.role ?? item.rol,
        hasUnread: item.hasUnread ?? false
      }));

      setInmuebles(normalizados);
    } catch (err) {
      console.error('Error al obtener inmuebles:', err);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    fetchInmuebles();
  }, [fetchInmuebles]);

  const abrirModal = (inmueble) => {
    setInmuebleActivo(inmueble);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setInmuebleActivo(null);
    setModalAbierto(false);
  };

  const actualizarLecturasDelInmueble = (propertyId, tienePendientes) => {
    setInmuebles((prev) =>
      prev.map((i) =>
        i.propertyId === propertyId
          ? { ...i, hasUnread: tienePendientes }
          : i
      )
    );
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">Cargando inmuebles...</div>
      ) : (
        <>
          <InmueblesGrid inmuebles={inmuebles} onVerAnuncios={abrirModal} />
          {modalAbierto && inmuebleActivo && (
          <AnunciosLoaderWrapper
            propertyId={inmuebleActivo.propertyId}
            propertyName={inmuebleActivo.propertyName}
            role={inmuebleActivo.role}
            usuarioId={usuarioId} // ✅ Ahora sí lo pasas correctamente
            onClose={cerrarModal}
            onActualizarInmuebles={fetchInmuebles}
            onActualizarLecturas={(tienePendientes) =>
              actualizarLecturasDelInmueble(inmuebleActivo.propertyId, tienePendientes)
            }
          />

          )}
        </>
      )}
    </div>
  );
};

export default InmueblesContainer;
