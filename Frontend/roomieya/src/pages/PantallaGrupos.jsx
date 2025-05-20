// src/pages/PantallaGrupos.jsx
import React, { useState, useEffect } from 'react';
import CrearGrupoContainer from '../components/grupos/CrearGrupoContainer';

const PantallaGrupos = () => {
  const [grupos, setGrupos] = useState([]);
  const [idBuscar, setIdBuscar] = useState('');
  const [mostrarCrearGrupo, setMostrarCrearGrupo] = useState(false);
  const [errorBuscar, setErrorBuscar] = useState('');

  const gruposMock = [
    {
      id: '939K301',
      nombre: 'Grupo de gamers',
      afinidad: 'Videojuegos',
      icono: '🎮',
      visibilidad: 'publico'
    },
    {
      id: '829L492',
      nombre: 'Estudio UX',
      afinidad: 'Diseño',
      icono: '🧠',
      visibilidad: 'privado'
    }
  ];

  const cargarGrupos = async () => {
    setGrupos(gruposMock);
  };

  useEffect(() => {
    cargarGrupos();
  }, []);

  const handleBuscar = () => {
    const grupoEncontrado = grupos.find(grupo => grupo.id === idBuscar.trim());

    if (!grupoEncontrado) {
      setErrorBuscar('No se encontró ningún grupo con ese ID.');
      return;
    }

    setErrorBuscar(''); // Limpiar error si encuentra

    if (grupoEncontrado.visibilidad === 'privado') {
      alert('Grupo privado: se ha enviado solicitud al administrador (simulado)');
    } else {
      window.location.href = `/grupo/${grupoEncontrado.id}`;
    }
  };


  return (
    <div className="container text-center mt-5">
      <h2 className="fw-bold mb-4">MIS GRUPOS</h2>

      <div className="d-flex flex-column align-items-center">
        <input
          type="text"
          className={`form-control rounded-pill px-4 w-50 ${errorBuscar ? 'is-invalid' : ''}`}
          placeholder="Ingresa el id del grupo a buscar"
          value={idBuscar}
          onChange={(e) => {
            setIdBuscar(e.target.value);
            setErrorBuscar(''); // Limpiar error al escribir
          }}
        />
        {errorBuscar && (
          <div className="invalid-feedback d-block mt-1 text-center">{errorBuscar}</div>
        )}
      </div>



      <div className="mt-3">
        <button
          className="btn btn-outline-secondary rounded-pill px-4"
          onClick={handleBuscar}
        >
          🔍 Buscar grupo
        </button>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-danger rounded-pill px-4 shadow"
          onClick={() => setMostrarCrearGrupo(true)}
        >
          Crear grupo
        </button>
      </div>

      <div className="row justify-content-center mt-5">
        {grupos.map((grupo) => (
          <div key={grupo.id} className="col-md-3 mb-4">
            <div className="card shadow rounded-4">
              <div className="card-body text-center">
                <h5 className="fw-bold">{grupo.nombre}</h5>
                <p className="text-warning">#{grupo.id}</p>
                <div className="fs-1 my-3">{grupo.icono}</div>
                <button
                  className="btn btn-dark rounded-pill px-4"
                  onClick={() => window.location.href = `/grupo/${grupo.id}`}
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mostrarCrearGrupo && (
        <div className="modal d-block bg-dark bg-opacity-75" onClick={() => setMostrarCrearGrupo(false)}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content p-4 rounded-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title">Crear nuevo grupo</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarCrearGrupo(false)}></button>
              </div>
              <CrearGrupoContainer
                onGrupoCreado={() => {
                  cargarGrupos();
                  setMostrarCrearGrupo(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PantallaGrupos;
