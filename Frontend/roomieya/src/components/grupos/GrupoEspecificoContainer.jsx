// src/containers/grupos/GrupoEspecificoContainer.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// import axios from 'axios';
// import { API } from '../../api/endpoints';
import GrupoInfoPanel from '../../components/grupos/GrupoInfoPanel';
import GrupoChat from '../../components/grupos/GrupoChat';
import MiembrosPanel from '../../components/grupos/MiembrosPanel';
import EditarGrupoModalContainer from './EditarGrupoModalContainer';

const GrupoEspecificoContainer = () => {
  const { groupId } = useParams();
  const [grupo, setGrupo] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [miembros, setMiembros] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [mostrarMiembros, setMostrarMiembros] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const modoSimulado = true; // ✅ pon false cuando actives el backend real
  // const token = localStorage.getItem('token');

  // MOCK DATA
  const gruposMock = {
    '939K301': {
      id: '939K301',
      nombre: 'Grupo de gamers',
      visibilidad: 'privado',
      esPropietario: true  // ✅ Eres dueño de este grupo
    },
    '829L492': {
      id: '829L492',
      nombre: 'Estudio UX',
      visibilidad: 'publico',
      esPropietario: false // ❌ Solo eres miembro aquí
    }
  };



  const miembrosMock = [
    { id: 'u001', nombre: 'Ana García' },
    { id: 'u002', nombre: 'Carlos Ruiz' }
  ];

  const pendientesMock = [
    { id: 'u003', nombre: 'Luis Mendoza' }
  ];

  const mensajesMock = [
    { autor: 'Ana García', texto: 'Hola a todos' },
    { autor: 'Carlos Ruiz', texto: '¡Hola Ana!' }
  ];

  // Simulaciones de carga de datos
  const cargarGrupo = async () => {
    if (modoSimulado) {
      const gruposMock = {
        '939K301': {
          id: '939K301',
          nombre: 'Grupo de gamers',
          visibilidad: 'privado',
          esPropietario: true
        },
        '829L492': {
          id: '829L492',
          nombre: 'Estudio UX',
          visibilidad: 'publico',
          esPropietario: false
        }
      };

      const grupo = gruposMock[groupId] || {
        id: groupId,
        nombre: 'Grupo desconocido',
        visibilidad: 'publico',
        esPropietario: false
      };

      setGrupo(grupo);
    } else {
      // ✅ Lógica real del backend (preservada)
      /*
      const token = localStorage.getItem('token');
      const { data } = await axios.get(API.groups.groupDetail(groupId), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGrupo(data);
      */
    }
  };


  const cargarMiembros = async () => {
    // const { data } = await axios.get(API.groups.members(groupId), { headers: { Authorization: `Bearer ${token}` }});
    setMiembros(miembrosMock);
    setPendientes(pendientesMock);
  };

  const cargarMensajes = async () => {
    // const { data } = await axios.get(API.groupChat.messages(groupId), { headers: { Authorization: `Bearer ${token}` }});
    setMensajes(mensajesMock);
  };

  useEffect(() => {
    cargarGrupo();
    cargarMensajes();
    cargarMiembros();
  }, [groupId]);

  
  useEffect(() => {
    const el = document.getElementById('chat-mensajes');
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensajes]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    const nuevo = {
      autor: 'Tú',
      texto: nuevoMensaje
    };
    setMensajes((prev) => [...prev, nuevo]);
    setNuevoMensaje('');

    // await axios.post(API.groupChat.sendMessage(groupId), { texto: nuevoMensaje }, { headers: { Authorization: `Bearer ${token}` }});
    // cargarMensajes();
  };

  const aceptarSolicitud = async (userId) => {
    // await axios.post(API.groups.acceptMember(groupId, userId), {}, { headers: { Authorization: `Bearer ${token}` }});
    const aceptado = pendientes.find(p => p.id === userId);
    setMiembros((prev) => [...prev, aceptado]);
    setPendientes((prev) => prev.filter(p => p.id !== userId));
  };

  const rechazarSolicitud = async (userId) => {
    // await axios.post(API.groups.rejectMember(groupId, userId), {}, { headers: { Authorization: `Bearer ${token}` }});
    setPendientes((prev) => prev.filter(p => p.id !== userId));
  };

  const expulsarMiembro = async (userId) => {
    // await axios.delete(API.groups.removeMember(groupId, userId), { headers: { Authorization: `Bearer ${token}` }});
    setMiembros((prev) => prev.filter(m => m.id !== userId));
  };

return (
  <div className="container-fluid mt-4">
    <div className="row">
      
      {/* Chat (izquierda) */}
      <div className="col-md-8">
        <div className="card shadow rounded-4 p-3 d-flex flex-column" style={{ height: '500px' }}>
          <div className="d-flex justify-content-end mb-2">
            <button className="btn btn-light" onClick={() => window.history.back()}>❌</button>
          </div>

          {/* Lista de mensajes (scrolleable) */}
          <div className="flex-grow-1 overflow-auto px-2" id="chat-mensajes">
            {mensajes.map((msg, idx) => {
              const esPropio = msg.autor === 'Tú';
              return (
                <div
                  key={idx}
                  className={`d-flex mb-3 ${esPropio ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className="rounded-3 p-2"
                    style={{
                      maxWidth: '70%',
                      backgroundColor: '#242424',
                      color: '#ffffff',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    <div className="fw-bold text-warning mb-1" style={{ fontSize: '0.85rem' }}>
                      {msg.autor}
                    </div>
                    <div>{msg.texto}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input de mensaje */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (nuevoMensaje.trim().length === 0) return;
              enviarMensaje(e);
            }}
            className="d-flex mt-3"
          >
            <input
              type="text"
              className="form-control bg-light text-dark"
              placeholder="Escribe tu mensaje"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
            />
            <button
              className="btn btn-dark ms-2"
              type="submit"
              disabled={nuevoMensaje.trim().length === 0}
            >
              📨
            </button>
          </form>
        </div>
      </div>

      {/* Info grupo (derecha) */}
      <div className="col-md-4 d-flex flex-column align-items-center justify-content-start text-center mt-3">
        <h3 className="fw-bold">{grupo?.nombre}</h3>
        <p className="text-warning fs-5">#{grupo?.id}</p>
        <span
          className={`badge px-3 py-2 fs-6 ${
            grupo?.visibilidad === 'publico' ? 'bg-success' : 'bg-warning text-dark'
          }`}
        >
          {grupo?.visibilidad === 'publico' ? 'Público' : 'Privado'}
        </span>

        {grupo?.esPropietario && (
          <button className="btn btn-outline-primary mt-3" onClick={() => setMostrarMiembros(true)}>
            Ver miembros
          </button>
        )}

      </div>
    </div>

    {/* Modal de miembros */}
    {mostrarMiembros && (
      <div className="modal d-block bg-dark bg-opacity-75" onClick={() => setMostrarMiembros(false)}>
        <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content p-4 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="modal-title">Miembros del grupo</h5>
              <button type="button" className="btn-close" onClick={() => setMostrarMiembros(false)}></button>
            </div>

            {/* Miembros actuales */}
            <div className="mb-4">
              <h6 className="fw-bold">Miembros actuales</h6>
              {miembros.map((m) => (
                <div
                  key={m.id}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <span>{m.nombre}</span>
                {grupo?.esPropietario && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => expulsarMiembro(m.id)}
                  >
                    Expulsar
                  </button>
                )}

                </div>
              ))}
            </div>

            {/* Solicitudes pendientes */}
            <div className="pt-3 border-top">
              <h6 className="fw-bold mb-3">Solicitudes pendientes</h6>
              {pendientes.map((p) => (
                <div
                  key={p.id}
                  className="d-flex justify-content-between align-items-center px-3 py-2 mb-2"
                  style={{
                    backgroundColor: '#FFE58E',
                    border: '1px solid #D87300',
                    color: '#000',
                    borderRadius: '0.5rem'
                  }}
                >
                  <span>{p.nombre}</span>
                  {grupo?.esPropietario && (
                  <div>
                    <button
                      className="btn btn-sm me-2"
                      style={{ backgroundColor: '#FF8F40', color: '#fff', border: 'none' }}
                      onClick={() => aceptarSolicitud(p.id)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: '#F36161', color: '#fff', border: 'none' }}
                      onClick={() => rechazarSolicitud(p.id)}
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    )}
  </div>
);




};

export default GrupoEspecificoContainer;
