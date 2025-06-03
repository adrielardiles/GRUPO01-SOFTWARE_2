import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MisInmueblesPage = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/inmuebles')
      .then(({ data }) => setInmuebles(data))
      .catch(err => console.error('Error al cargar inmuebles:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Mis Inmuebles</h1>
      {inmuebles.length === 0
        ? <p>No tienes inmuebles registrados.</p>
        : inmuebles.map(prop => (
            <div key={prop.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{prop.nombre}</h5>
                <p className="card-text"><strong>Dirección:</strong> {prop.direccion}</p>
                <p className="card-text"><strong>Tipo:</strong> {prop.tipo}</p>
                <p className="card-text"><strong>Ubicación:</strong> {prop.ubicacion}</p>
                <p className="card-text"><strong>Tamaño:</strong> {prop.tamano} m²</p>
                <p className="card-text"><strong>Precio:</strong> S/ {prop.precio}</p>
                <p className="card-text"><strong>Servicios:</strong> {prop.servicios}</p>
                <p className="card-text"><strong>Descripción:</strong> {prop.descripcion}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/editar-inmueble/${prop.id}`)}
                >Editar</button>
              </div>
            </div>
      ))}
    </div>
  );
};

export default MisInmueblesPage;