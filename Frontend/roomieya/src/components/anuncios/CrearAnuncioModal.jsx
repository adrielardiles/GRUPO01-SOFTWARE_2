import React, { useState, useEffect } from 'react';

const CrearAnuncioModal = ({ onCerrar, onPublicar, esEdicion = false, anuncioOriginal = {} }) => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (esEdicion && anuncioOriginal) {
      setTitulo(anuncioOriginal.title || '');
      setTipo(anuncioOriginal.type || '');
      setMensaje(anuncioOriginal.message || '');
    }
  }, [esEdicion, anuncioOriginal]);

  const handleSubmit = () => {
    if (!titulo || !tipo || !mensaje) {
      alert('Por favor completa todos los campos');
      return;
    }

    onPublicar({
      id: anuncioOriginal.id,
      title: titulo,
      type: tipo,
      message: mensaje
    });
  };

  return (
    <div className="crear-overlay">
      <div className="crear-contenido">
        <h5 className="fw-bold text-center mb-3">
          {esEdicion ? 'Editar Anuncio' : 'Nuevo Anuncio'}
        </h5>

        <label className="form-label">Título</label>
        <input
          className="form-control mb-2"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />

        <label className="form-label">Tipo de Evento</label>
        <select
          className="form-select mb-2"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="URGENTE">Urgente</option>
          <option value="COMUNICADO">Comunicado</option>
          <option value="EVENTO">Evento</option>
        </select>

        {!esEdicion && (
          <>
            <label className="form-label">Fecha de publicación</label>
            <input
              type="date"
              className="form-control mb-2"
              disabled
              value={new Date().toISOString().split('T')[0]}
            />
          </>
        )}

        <label className="form-label">Mensaje</label>
        <textarea
          className="form-control mb-3"
          rows={4}
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
        />

        <button className="btn btn-danger w-100 fw-bold" onClick={handleSubmit}>
          {esEdicion ? 'GUARDAR CAMBIOS' : 'PUBLICAR'}
        </button>

        <button className="btn-close position-absolute top-0 end-0 m-3" onClick={onCerrar}></button>

        <style>{`
          .crear-overlay {
            position: fixed;
            top: 0; right: 0;
            width: 100%;
            max-width: 500px;
            height: 100vh;
            background: white;
            box-shadow: -2px 0 6px rgba(0,0,0,0.2);
            z-index: 10001;
            padding: 1.5rem;
            overflow-y: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CrearAnuncioModal;
