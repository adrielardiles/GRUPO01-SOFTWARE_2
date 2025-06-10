import React, { useState } from 'react';

const notificacionesSimuladas = [
  { id: 1, mensaje: 'Juan pagó S/ 100 por luz', fecha: '2025-06-01' },
  { id: 2, mensaje: 'María pagó S/ 200 por alquiler', fecha: '2025-06-02' },
  { id: 3, mensaje: 'Carlos pagó S/ 50 por agua', fecha: '2025-06-03' },
];

export default function ListaNotificaciones() {
  const [notificaciones, setNotificaciones] = useState(notificacionesSimuladas);

  const marcarLeida = (id) => {
    setNotificaciones(notificaciones.filter(n => n.id !== id));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Notificaciones de pagos</h2>
      {notificaciones.length === 0 && (
        <div className="alert alert-info" role="alert">
          No hay notificaciones.
        </div>
      )}
      <ul className="list-group">
        {notificaciones.map(n => (
          <li key={n.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1">{n.mensaje}</p>
              <small className="text-muted">{n.fecha}</small>
            </div>
            <button className="btn btn-sm btn-outline-primary" onClick={() => marcarLeida(n.id)}>
              Marcar como leída
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
