// src/components/anuncios/AnuncioDetalleModal.jsx
import React, { useState, useEffect } from 'react';

const AnuncioDetalleModal = ({ anuncio, onCerrar, onConfirmarLectura }) => {
  const [confirmado, setConfirmado] = useState(anuncio.isRead);

  useEffect(() => {
    setConfirmado(anuncio.isRead);
  }, [anuncio]);

  const handleConfirmar = () => {
    setConfirmado(true);
    onConfirmarLectura(anuncio.id);
  };

  return (
    <div className="detalle-overlay">
      <div className="detalle-contenido">
        <div className="text-center mb-3">
          <h5 className="fw-bold mb-2">{anuncio.title}</h5>
          {anuncio.isUrgent && (
            <div className="badge bg-danger">URGENTE</div>
          )}
        </div>

        <button onClick={onCerrar} className="btn btn-close position-absolute end-0 top-0 m-3"></button>

        <div className="detalle-mensaje">
          {anuncio.message || 'Sin contenido'}
        </div>

        {anuncio.isUrgent && (
          <div className="text-center mt-4">
            {confirmado ? (
              <div className="text-success fw-bold">
                <i className="bi bi-check-circle me-1"></i> Lectura confirmada
              </div>
            ) : (
              <>
                <button className="btn btn-warning fw-bold" onClick={handleConfirmar}>
                  CONFIRMAR LECTURA
                </button>
                <div className="text-muted small mt-1">*Obligatorio</div>
              </>
            )}
          </div>
        )}

        <div className="text-muted small mt-4">
          Fecha de publicación: {anuncio.createdAt}
        </div>

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
