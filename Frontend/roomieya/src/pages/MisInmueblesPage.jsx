import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MisInmueblesPage = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/inmuebles');
        setInmuebles(response.data);
      } catch (error) {
        console.error('Error al cargar inmuebles:', error);
        alert('Error al cargar inmuebles');
      } finally {
        setCargando(false);
      }
    };
    fetchInmuebles();
  }, []);

  if (cargando) return <p>Cargando inmuebles...</p>;

  return (
    <div className="container mt-4">
      <h1>Mis Inmuebles</h1>
      {inmuebles.length === 0 && <p>No tienes inmuebles registrados.</p>}
      {inmuebles.map((inmueble) => (
        <div key={inmueble.id} className="card mb-3" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h5 className="card-title">
              {inmueble.tipo} en {inmueble.ubicacion}
            </h5>
            <p className="card-text">
              <strong>Tamaño:</strong> {inmueble.tamano} m²<br />
              <strong>Precio:</strong> S/ {inmueble.precio}<br />
              <strong>Servicios:</strong> {inmueble.servicios}<br />
              <strong>Descripción:</strong> {inmueble.descripcion}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/editar-inmueble/${inmueble.id}`)}
            >
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MisInmueblesPage;
