import React, { useState, useEffect, useCallback } from 'react';
import AnuncioDetalleModal from './AnuncioDetalleModal';
import CrearAnuncioModal from './CrearAnuncioModal';
import { API } from '../../api/endpoints';
import Toast from './Toast';

const PAGE_SIZE = 3;

const AnunciosModal = ({
  propertyId,
  propertyName,
  role,
  usuarioId,
  onClose,
  onActualizarInmuebles,
  onActualizarLecturas,
  paginaInicial = 1,
  totalPaginasPreload = 1
}) => {
  const [anuncioSeleccionado, setAnuncioSeleccionado] = useState(null);
  const [mostrarCrearModal, setMostrarCrearModal] = useState(false);
  const [bloqueoMensaje, setBloqueoMensaje] = useState('');
  const [anuncios, setAnuncios] = useState([]);
  const [pagina, setPagina] = useState(paginaInicial);
  const [totalPaginas, setTotalPaginas] = useState(totalPaginasPreload);
  const [loadingAnuncios, setLoadingAnuncios] = useState(false);
  const [toast, setToast] = useState(null);
  const esArrendador = role === 'arrendador';

  const fetchAnuncios = useCallback(async (paginaActual) => {
    setLoadingAnuncios(true);
    try {
      const response = await fetch(API.announcements.byProperty(propertyId, paginaActual, usuarioId));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const transformados = data.contenido.map((a) => ({
        id: a.id,
        title: a.title,
        createdAt: a.createdAt,
        tipo: a.tipo,
        isRead: a.read,
        message: a.message ?? ''
      }));

      setAnuncios(transformados);
      setTotalPaginas(data.totalPaginas || 1);

      if (onActualizarLecturas) {
        const tienePendientes = transformados.some((a) => !a.isRead);
        onActualizarLecturas(tienePendientes);
      }
    } catch (error) {
      console.error('Error al cargar anuncios:', error);
    } finally {
      setLoadingAnuncios(false);
    }
  }, [propertyId, usuarioId]);

  useEffect(() => {
    fetchAnuncios(pagina);
  }, [pagina, fetchAnuncios]);

  const confirmarLectura = async (anuncio) => {
    try {
      const endpoint = anuncio.tipo === 'Urgent'
        ? API.announcements.confirmUrgent(anuncio.id, usuarioId)
        : API.announcements.markAsRead(anuncio.id, usuarioId);

      await fetch(endpoint, { method: 'POST' });

      const nuevos = anuncios.map((a) =>
        a.id === anuncio.id ? { ...a, isRead: true } : a
      );

      setAnuncios(nuevos);
      setAnuncioSeleccionado((prev) => ({ ...prev, isRead: true }));

      const quedanSinLeer = nuevos.some((a) => !a.isRead);
      if (onActualizarLecturas) onActualizarLecturas(quedanSinLeer);
      if (onActualizarInmuebles) onActualizarInmuebles();

    } catch (error) {
      console.error('Error al confirmar lectura:', error);
    }
  };

  const publicarAnuncio = async (nuevo) => {
    try {
      const response = await fetch(API.announcements.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creadorId: usuarioId,
          inmuebleId: propertyId,
          titulo: nuevo.title,
          descripcion: nuevo.message,
          tipo: nuevo.type
        })
      });

      if (!response.ok) throw new Error('Error al crear anuncio');

      setPagina(1);
      await fetchAnuncios(1);

      if (onActualizarInmuebles) onActualizarInmuebles();
    } catch (err) {
      console.error('Error al publicar anuncio:', err);
    }
  };

  const cambiarAnuncio = async (nuevo) => {
    if (anuncioSeleccionado?.tipo === 'Urgente' && !anuncioSeleccionado?.isRead) {
      setBloqueoMensaje('⚠️ Debes confirmar la lectura antes de cambiar de anuncio.');
      return;
    }
    setBloqueoMensaje('');
    setAnuncioSeleccionado(nuevo);

    // ✅ Solo marcar como leído automáticamente si no es urgente
    if (nuevo.tipo?.toUpperCase() !== 'URGENTE' && !nuevo.isRead) {
      await confirmarLectura(nuevo);
    }
  };



  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Anuncios de {propertyName}</h4>
          <button onClick={onClose} className="btn fs-5 fw-bold">✕</button>
        </div>

        <div className="legend d-flex justify-content-center gap-4 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="color-box bg-orange"></span>
            <small>No leído</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="color-box bg-dark"></span>
            <small>Leído</small>
          </div>
        </div>

        {loadingAnuncios ? (
          <div className="text-center my-3">Cargando anuncios...</div>
        ) : (
          anuncios.map((a) => (
            <div
              key={a.id}
              className={`anuncio-card ${!a.isRead ? 'no-leido' : ''} ${anuncioSeleccionado?.id === a.id ? 'seleccionado' : ''}`}
              onClick={() => cambiarAnuncio(a)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                {a.tipo.toUpperCase() === 'URGENTE' && <img src="/images/warning.png" alt="urgente" width={24} />}
                <strong>{a.title}</strong>
              </div>
              <div className="text-white-50 small">Fecha: {a.createdAt}</div>
            </div>
          ))
        )}

        <div className="d-flex justify-content-center mt-3 gap-2">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              className={`btn btn-dark btn-sm rounded-circle ${pagina === i + 1 ? 'fw-bold' : ''}`}
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {bloqueoMensaje && <div className="text-danger text-center mt-2 fw-bold">{bloqueoMensaje}</div>}

        {esArrendador && (
          <div className="mt-4 text-center">
            <button className="btn btn-warning fw-bold px-4" onClick={() => setMostrarCrearModal(true)}>
              + Crear anuncio
            </button>
          </div>
        )}

        {anuncioSeleccionado && (
          <AnuncioDetalleModal
            anuncio={anuncioSeleccionado}
            usuarioId={usuarioId}
            role={role}
            onCerrar={() => setAnuncioSeleccionado(null)}
            onConfirmarLectura={() => confirmarLectura(anuncioSeleccionado)}
            onEditarConfirmado={() => fetchAnuncios(pagina)}
            setToast={setToast}
          />
        )}

        {mostrarCrearModal && (
          <CrearAnuncioModal
            onCerrar={() => setMostrarCrearModal(false)}
            onPublicar={(nuevo) => {
              publicarAnuncio(nuevo);
              setMostrarCrearModal(false);
            }}
          />
        )}

        {toast && (
          <Toast
            mensaje={toast.mensaje}
            tipo={toast.tipo}
            onClose={() => setToast(null)}
          />
        )}

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            display: flex; justify-content: center; align-items: center;
            z-index: 10000;
          }

          .modal-contenido {
            background: white;
            padding: 1.5rem;
            border-radius: 16px;
            width: 90%;
            max-width: 480px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .anuncio-card {
            background-color: #333;
            color: white;
            border-radius: 12px;
            padding: 0.8rem 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          }

          .anuncio-card.no-leido {
            background-color: #F97300;
          }

          .anuncio-card.seleccionado {
            background-color: #A63707 !important;
          }

          .color-box {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            display: inline-block;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }

          .bg-orange { background-color: #F97300; }
          .bg-dark { background-color: #333; }
        `}</style>
      </div>
    </div>
  );
};

export default AnunciosModal;
