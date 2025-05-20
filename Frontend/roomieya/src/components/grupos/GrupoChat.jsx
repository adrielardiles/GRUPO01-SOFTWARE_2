// src/components/grupos/GrupoChat.jsx
import React from 'react';

const GrupoChat = ({ mensajes, nuevoMensaje, onMensajeChange, onEnviar }) => (
  <div className="d-flex flex-column" style={{ height: '500px' }}>
    <ul className="list-group flex-grow-1 overflow-auto">
      {mensajes.map((msg, i) => (
        <li key={i} className="list-group-item">
          <strong>{msg.autor}:</strong> {msg.texto}
        </li>
      ))}
    </ul>
    <form className="d-flex mt-2" onSubmit={onEnviar}>
      <input
        type="text"
        className="form-control"
        value={nuevoMensaje}
        onChange={(e) => onMensajeChange(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button className="btn btn-primary ms-2" type="submit">Enviar</button>
    </form>
  </div>
);

export default GrupoChat;
