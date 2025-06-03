import React, { useState, useEffect } from 'react';
import { API } from '../../api/endpoints';
import CrearAnuncioModal from './CrearAnuncioModal';
import { FaCheckCircle, FaEdit, FaTrash, FaBookOpen } from 'react-icons/fa';

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
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [historial, setHistorial] = useState({ leidos: [], noLeidos: [] });
  const esUrgente = anuncio?.tipo?.toUpperCase() === 'URGENTE';
  const esArrendador = role === 'arrendador';

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(API.announcements.detail(anuncio.id, usuarioId));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setDetalle({
          ...data,
          isRead: data.read,
          createdAt: data.fechaPublicacion,
          confirmacionLectura: data.confirmacionLectura
        });
      } catch (error) {
        console.error('Error al obtener detalle del anuncio:', error);
      }
    };
    if (anuncio?.id && usuarioId) fetchDetalle();
  }, [anuncio?.id, usuarioId]);

  const fetchHistorial = async () => {
    try {
      const response = await fetch(API.announcements.historial(anuncio.id));
      if (!response.ok) throw new Error('Error al obtener historial');
      const data = await response.json();
      setHistorial(data);
      setMostrarHistorial(true);
    } catch (error) {
      console.error('Error al cargar historial:', error);
    }
  };

  const handleConfirmar = async () => {
    await onConfirmarLectura(anuncio);
    setDetalle((prev) => ({ ...prev, confirmacionLectura: true }));
    setToast?.({ mensaje: 'Lectura confirmada con éxito.', tipo: 'success' });
  };

  const handleEditar = () => setMostrarEditarModal(true);

  const handleEliminar = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este anuncio?')) return;
    try {
      const response = await fetch(API.announcements.delete(anuncio.id), { method: 'DELETE' });
      if (!response.ok) {
        const msg = response.status === 400
          ? 'No se puede eliminar un anuncio ya leído por un roomie'
          : 'Error al eliminar anuncio';
        return setToast({ mensaje: msg, tipo: 'error' });
      }
      setToast({ mensaje: '✅ Anuncio eliminado correctamente', tipo: 'success' });
      onEditarConfirmado();
      onCerrar();
    } catch {
      setToast({ mensaje: 'Error al procesar la solicitud', tipo: 'error' });
    }
  };

  if (!detalle) return null;

  return (
    <div className="detalle-overlay">
      <div className="detalle-contenido">
        <button onClick={onCerrar} className="btn-close position-absolute end-0 top-0 m-3" />
        
        <div className="text-center mb-3">
          <h4 className="fw-bold">{detalle.titulo}</h4>
          {detalle.tipo && (
            <span className={`badge ${esUrgente ? 'bg-danger' : 'bg-secondary'}`}>
              {detalle.tipo}
            </span>
          )}
        </div>

        <div className="detalle-mensaje border rounded p-3 bg-light mb-3" style={{ whiteSpace: 'pre-line' }}>
          {detalle.mensaje || 'Sin contenido'}
        </div>

        {esUrgente && (
          <div className="text-center mb-4">
            {detalle.confirmacionLectura ? (
              <div className="text-success fw-bold d-flex align-items-center justify-content-center gap-2">
                <FaCheckCircle /> Lectura confirmada
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

        <div className="text-muted small mb-1">📅 Publicado: {detalle.createdAt}</div>
        <div className="text-muted small mb-3">👤 Por: <strong>{detalle.nombreCreador}</strong></div>

        {esArrendador && (
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button className="btn btn-outline-primary" onClick={handleEditar}>
              <FaEdit className="me-2" /> Editar
            </button>
            <button className="btn btn-outline-danger" onClick={handleEliminar}>
              <FaTrash className="me-2" /> Eliminar
            </button>
            <button className="btn btn-outline-dark" onClick={fetchHistorial}>
              <FaBookOpen className="me-2" /> Ver historial
            </button>
          </div>
        )}

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
            onPublicar={() => {
              setMostrarEditarModal(false);
              onEditarConfirmado();
              onCerrar();
            }}
          />
        )}

        {/* Modal historial */}
        {mostrarHistorial && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="modal-title">📜 Historial de Lectura</h5>
                  <button type="button" className="btn-close" onClick={() => setMostrarHistorial(false)} />
                </div>
                <div className="modal-body">
                  <h6 className="text-success">✅ Leídos</h6>
                  <ul className="list-group mb-4">
                    {historial.leidos.map((item, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.usuario}
                        <span className="text-muted small">{item.fechaLectura}</span>
                      </li>
                    ))}
                  </ul>

                  <h6 className="text-secondary">⏳ No leídos</h6>
                  <ul className="list-group">
                    {historial.noLeidos.map((item, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.usuario}
                        <span className="text-muted small">{item.fechaLectura || 'Sin lectura'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .detalle-overlay {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            max-width: 500px;
            height: 100vh;
            background: #fff;
            box-shadow: -2px 0 8px rgba(0,0,0,0.15);
            overflow-y: auto;
            z-index: 1051;
          }
          .detalle-contenido {
            padding: 2rem;
            position: relative;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AnuncioDetalleModal;
