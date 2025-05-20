// src/components/anuncios/InmueblesContainer.jsx
import React, { useEffect, useState } from 'react';
import InmueblesGrid from './InmueblesGrid';
import AnunciosModal from './AnunciosModal';
// import { API } from '../../api/endpoints';

const InmueblesContainer = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [inmuebleActivo, setInmuebleActivo] = useState(null);

  useEffect(() => {
    // MOCK temporal
    setTimeout(() => {
      setInmuebles([
        { propertyId: 1, propertyName: 'Inmueble 1', role: 'roomie', hasUnread: true },
        { propertyId: 2, propertyName: 'Inmueble 2', role: 'arrendador', hasUnread: false }
      ]);
      setLoading(false);
    }, 300);

    /*
    const fetchInmuebles = async () => {
      try {
        const response = await fetch(API.announcements.propertiesByUser, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setInmuebles(data);
      } catch (err) {
        console.error('Error al obtener inmuebles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
    */
  }, []);

  const abrirModal = (inmueble) => {
    setInmuebleActivo(inmueble);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setInmuebleActivo(null);
    setModalAbierto(false);
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">Cargando inmuebles...</div>
      ) : (
        <>
          <InmueblesGrid inmuebles={inmuebles} onVerAnuncios={abrirModal} />
          {modalAbierto && inmuebleActivo && (
            <AnunciosModal
              propertyId={inmuebleActivo.propertyId}
              propertyName={inmuebleActivo.propertyName}
              role={inmuebleActivo.role}
              onClose={cerrarModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InmueblesContainer;
