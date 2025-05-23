import React, { useState, useEffect } from 'react';
import { API } from '../../api/endpoints';
import CrearAnuncioModal from './CrearAnuncioModal';

const AnuncioDetalleModal = ({
  anuncio,
  usuarioId,
  role,
  onCerrar,
  onConfirmarLectura,
  onEditarConfirmado,
  setToast
}) => {
  const [detalle, setDetalle] = useState(null);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const esUrgente = anuncio?.tipo?.toUpperCase() === 'URGENTE';
  const esArrendador = role === 'arrendador';

  const fetchDetalle = async () => {
  try {
    const response = await fetch(API.announcements.detail(anuncio.id, usuarioId));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    const tipoEsUrgente = data.tipo?.toUpperCase() === 'URGENTE';

    setDetalle({
      ...data,
      isRead: data.read,
      createdAt: data.fechaPublicacion,
      confirmacionLectura: data.confirmacionLectura
    });

    if (!data.read && !tipoEsUrgente) {
      const refresh = await fetch(API.announcements.detail(anuncio.id, usuarioId));
      const data2 = await refresh.json();

      setDetalle({
        ...data2,
        isRead: data2.read,
        createdAt: data2.fechaPublicacion,
        confirmacionLectura: data2.confirmacionLectura
      });
    }

  } catch (error) {
    console.error('Error al obtener detalle del anuncio:', error);
  }
};


  useEffect(() => {
    if (anuncio?.id && usuarioId) {
      fetchDetalle();
    }
  }, [anuncio?.id, usuarioId]);

  const handleConfirmar = async () => {
    await onConfirmarLectura(anuncio);
    setDetalle((prev) => ({ ...prev, confirmacionLectura: true }));
    setToast?.({ mensaje: 'Lectura confirmada con éxito.', tipo: 'success' });
  };

  const handleEditar = () => {
    setMostrarEditarModal(true);
  };

  const handleEliminar = async () => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este anuncio?');
    if (!confirmar) return;

    try {
      const response = await fetch(API.announcements.delete(anuncio.id), {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorMsg = response.status === 400
          ? 'No se puede eliminar un anuncio que ya ha sido leído por un roomie'
          : 'Error al eliminar anuncio';
        setToast({ mensaje: errorMsg, tipo: 'error' });
        return;
      }

      setToast({ mensaje: '✅ Anuncio eliminado correctamente', tipo: 'success' });
      onEditarConfirmado();
      onCerrar();
    } catch (err) {
      console.error('Error al eliminar anuncio:', err);
      setToast({ mensaje: 'Error al procesar la solicitud', tipo: 'error' });
    }
  };

  const handleGuardarEdicion = async (editado) => {
    try {
      const response = await fetch(API.announcements.update(anuncio.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: editado.title,
          mensaje: editado.message,
          tipo: editado.type,
          usuarioId: usuarioId  // 🔴 Asegúrate de que usuarioId esté definido
        })
      });

      if (!response.ok) throw new Error('Error al editar anuncio');

      onEditarConfirmado();
      setMostrarEditarModal(false);
      onCerrar();
    } catch (err) {
      console.error('Error al guardar edición:', err);
    }
  };


  if (!detalle) return null;

  return (
    <div className="detalle-overlay">
      <div className="detalle-contenido">
        <div className="text-center mb-3">
          <h5 className="fw-bold mb-2">{detalle.titulo}</h5>
          {detalle.tipo && (
            <div className={`badge ${detalle.tipo.toUpperCase() === 'URGENTE' ? 'bg-danger' : 'bg-secondary'} text-capitalize`}>
              {detalle.tipo}
            </div>
          )}
        </div>

        <button
          onClick={onCerrar}
          className="btn btn-close position-absolute end-0 top-0 m-3"
        ></button>

        <div className="detalle-mensaje">
          {detalle.mensaje  || 'Sin contenido'}
        </div>

        {detalle.tipo?.toUpperCase() === 'URGENTE' && (
          <div className="text-center mt-4">
            {detalle.confirmacionLectura ? (
              <div className="text-success fw-bold">
                <i className="bi bi-check-circle me-1"></i> Lectura confirmada
              </div>
            ) : (
              <>
                <button
                  className="btn btn-warning fw-bold"
                  onClick={handleConfirmar}
                >
                  CONFIRMAR LECTURA
                </button>
                <div className="text-muted small mt-1">*Obligatorio</div>
              </>
            )}
          </div>
        )}

        <div className="text-muted small mt-4">
          Fecha de publicación: {detalle.createdAt}
        </div>
        <div className="text-muted small">
          Publicado por: <strong>{detalle.nombreCreador}</strong>
        </div>

        {mostrarEditarModal && (
          <CrearAnuncioModal
            esEdicion
            anuncioOriginal={{
              id: detalle.id,
              title: detalle.titulo,
              message: detalle.mensaje,
              type: detalle.tipo
            }}
            onCerrar={() => setMostrarEditarModal(false)}
            onPublicar={handleGuardarEdicion}
          />
        )}

        {esArrendador && (
          <div className="text-center mt-4 d-flex justify-content-center gap-2 flex-wrap">
            <button className="btn btn-outline-primary fw-bold" onClick={handleEditar}>
              ✏️ Editar anuncio
            </button>
            <button className="btn btn-outline-danger fw-bold" onClick={handleEliminar}>
              🗑️ Eliminar
            </button>
          </div>
        )}

        <style>{`
          .detalle-overlay {
            position: fixed;
            top: 0; right: 0;
            height: 100vh;
            width: 100%;
            max-width: 500px;
            background: #fff;
            box-shadow: -2px 0 8px rgba(0,0,0,0.2);
            z-index: 10001;
            padding: 1.5rem;
            overflow-y: auto;
            transition: transform 0.3s ease-in-out;
          }

          .detalle-mensaje {
            max-height: 300px;
            overflow-y: auto;
            white-space: pre-line;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AnuncioDetalleModal;
