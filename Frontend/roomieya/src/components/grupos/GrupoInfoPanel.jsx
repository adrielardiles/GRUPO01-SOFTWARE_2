// src/components/grupos/GrupoInfoPanel.jsx
import React from 'react';

const GrupoInfoPanel = ({ grupo, esPropietario, onEditarClick, onVerMiembros }) => {
  if (!grupo) return null;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          {grupo.nombre}
          {esPropietario && (
            <button className="btn btn-sm btn-outline-secondary" onClick={onEditarClick}>
              ⚙️
            </button>
          )}

          {esPropietario && (
            <button
              className="btn btn-outline-primary mt-3"
              onClick={onVerMiembros}
            >
              Ver miembros
            </button>
          )}


        </h5>
        <h6 className="card-subtitle mb-2 text-muted">ID: {grupo.id}</h6>
        <p className="card-text">Tipo: {grupo.afinidad}</p>
        <span className={`badge ${grupo.visibilidad === 'publico' ? 'bg-success' : 'bg-secondary'}`}>
          {grupo.visibilidad}
        </span>
        <div className="mt-3">
          <button className="btn btn-info" onClick={onVerMiembros}>Ver miembros</button>
        </div>
      </div>
    </div>
  );
};

export default GrupoInfoPanel;
