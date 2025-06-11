// src/pages/ReglasPendientesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReglasPendientesPage = () => {
  const [reglas, setReglas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarReglasPendientes();
  }, []);

  const cargarReglasPendientes = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/reglas/pendientes')
      .then(({ data }) => {
        setReglas(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar las reglas pendientes.');
        setLoading(false);
      });
  };

  const actualizarEstadoRegla = (id, nuevoEstado) => {
    axios.put(`http://localhost:8080/api/reglas/${id}/estado`, { estadoAceptacion: nuevoEstado })
      .then(() => {
        setMensaje(`Regla ${nuevoEstado === 'aceptada' ? 'aceptada' : 'rechazada'} correctamente.`);
        setError('');
        cargarReglasPendientes();
      })
      .catch(() => {
        setError('Error al actualizar el estado de la regla.');
        setMensaje('');
      });
  };

  const handleAceptar = (id) => {
    setError('');
    setMensaje('');
    actualizarEstadoRegla(id, 'aceptada');
  };

  const handleRechazar = (id) => {
    setError('');
    setMensaje('');
    actualizarEstadoRegla(id, 'rechazada');
  };

  if (loading) return <p>Cargando reglas pendientes...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Reglas pendientes de aceptación</h1>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {reglas.length === 0 ? (
        <p>No tienes reglas pendientes.</p>
      ) : (
        reglas.map((regla) => (
          <div key={regla.id} className="card mb-3">
            <div className="card-body">
              <p>{regla.texto}</p>
              <p><em>Categoría: {regla.categoria || 'No definida'}</em></p>
              <button
                className="btn btn-success me-2"
                onClick={() => handleAceptar(regla.id)}
              >
                Aceptar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRechazar(regla.id)}
              >
                Rechazar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReglasPendientesPage;
