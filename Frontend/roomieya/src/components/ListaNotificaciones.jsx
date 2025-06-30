import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ejemplosSimulados = [
  { id: 'ej1', mensaje: 'Ejemplo: Juan pagó S/ 100 por luz', fecha: '2025-06-01' },
  { id: 'ej2', mensaje: 'Ejemplo: María pagó S/ 200 por alquiler', fecha: '2025-06-02' },
  { id: 'ej3', mensaje: 'Ejemplo: Carlos pagó S/ 50 por agua', fecha: '2025-06-03' },
];

export default function ListaNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const cargarNotificaciones = async () => {
    setCargando(true);
    try {
      const response = await axios.get('http://localhost:8081/api/notificaciones');
      const noLeidas = response.data.filter(n => !n.leida);

      if (noLeidas.length === 0) {
        setNotificaciones(ejemplosSimulados); // Mostrar ejemplos si no hay reales
      } else {
        setNotificaciones(noLeidas);
      }
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
      // Mostrar ejemplos si hay error de red
      setNotificaciones(ejemplosSimulados);
    } finally {
      setCargando(false);
    }
  };

  const marcarLeida = async (id) => {
    try {
      if (id.startsWith('ej')) {
        // No hacer nada si es ejemplo
        setNotificaciones(prev => prev.filter(n => n.id !== id));
        return;
      }

      await axios.put(`http://localhost:8081/api/notificaciones/${id}/leida`);
      setNotificaciones(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Notificaciones de pagos</h2>
        <button className="btn btn-sm btn-outline-secondary" onClick={cargarNotificaciones} disabled={cargando}>
          {cargando ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {notificaciones.length === 0 && !cargando ? (
        <div className="alert alert-info">No hay notificaciones.</div>
      ) : (
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
      )}
    </div>
  );
}
