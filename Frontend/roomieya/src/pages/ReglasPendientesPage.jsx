// src/pages/ReglasPendientesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReglasPendientesPage = () => {
  const [reglas, setReglas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Cambiar la URL por la del backend real que devuelva reglas pendientes para el usuario
    axios.get('http://localhost:8080/api/reglas/pendientes')
      .then(({ data }) => {
        setReglas(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar las reglas pendientes.');
        setLoading(false);
      });
  }, []);

  const handleAceptar = (id) => {
    console.log(`Aceptar regla ${id}`);
    // Aquí iría la lógica para actualizar backend (TA007)
  };

  const handleRechazar = (id) => {
    console.log(`Rechazar regla ${id}`);
    // Aquí iría la lógica para actualizar backend (TA007)
  };

  if (loading) return <p>Cargando reglas pendientes...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (reglas.length === 0) return <p>No tienes reglas pendientes.</p>;

  return (
    <div className="container mt-5">
      <h1>Reglas pendientes de aceptación</h1>
      {reglas.map((regla) => (
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
      ))}
    </div>
  );
};

export default ReglasPendientesPage;
