import React, { useEffect, useState } from 'react';
import { API } from '../../api/endpoints';

const formatearFecha = (fechaStr) => {
  const opciones = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return new Date(fechaStr).toLocaleString('es-PE', opciones);
};

const ModalHistorialLectura = ({ anuncioId, onCerrar }) => {
  const [historial, setHistorial] = useState({ leidos: [], noLeidos: [] });

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await fetch(API.announcements.historial(anuncioId));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setHistorial(data);
      } catch (err) {
        console.error('Error al obtener historial:', err);
      }
    };

    fetchHistorial();
  }, [anuncioId]);

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-4">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="modal-title">📜 Historial de Lecturas</h5>
            <button className="btn-close" onClick={onCerrar}></button>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h6 className="text-success fw-bold">✔ Leídos</h6>
              <ul className="list-group">
                {historial.leidos.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.usuario}
                    <span className="badge bg-success">
                      {item.fechaLectura ? formatearFecha(item.fechaLectura) : 'Sin fecha'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="text-danger fw-bold">⏳ No leídos</h6>
              <ul className="list-group">
                {historial.noLeidos.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.usuario}
                    <span className="badge bg-secondary">Sin fecha</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHistorialLectura;
