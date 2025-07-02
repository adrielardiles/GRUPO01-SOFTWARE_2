import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir

const ReglasPendientesPage = () => {
  const [reglas, setReglas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  useEffect(() => {
    cargarReglasPendientes();
  }, []);

  const cargarReglasPendientes = () => {
    setLoading(true);
    axios
      .get('http://localhost:8081/api/reglas/pendientes')
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
    axios
      .put(`http://localhost:8081/api/reglas/${id}/aceptar?aceptar=${nuevoEstado}`)
      .then(() => {
        setMensaje(`Regla ${nuevoEstado === true ? 'aceptada' : 'rechazada'} correctamente.`);
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
    actualizarEstadoRegla(id, true); // Ahora enviamos 'true' para aceptar
  };

  const handleRechazar = (id) => {
    setError('');
    setMensaje('');
    actualizarEstadoRegla(id, false); // Ahora enviamos 'false' para rechazar
  };

  const handleCrearRegla = () => {
    navigate('/crear-regla'); // Redirige a la página de crear regla
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

      {/* Botón para crear una nueva regla centrado */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-danger" // Este es el color rojo
          onClick={handleCrearRegla} // Al hacer clic redirige a la página de crear regla
        >
          Crear Nueva Regla
        </button>
      </div>
    </div>
  );
};

export default ReglasPendientesPage;
