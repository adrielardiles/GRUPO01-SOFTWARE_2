// src/components/grupos/MiembrosPanel.jsx
import React from 'react';

const MiembrosPanel = ({ miembros, pendientes, esPropietario, onAceptar, onRechazar, onExpulsar }) => (
  <div>
    <h5>Miembros</h5>
    <ul className="list-group mb-4">
      {miembros.map((m) => (
        <li key={m.id} className="list-group-item d-flex justify-content-between align-items-center">
          {m.nombre}
          {esPropietario && (
            <button className="btn btn-sm btn-danger" onClick={() => onExpulsar(m.id)}>Expulsar</button>
          )}
        </li>
      ))}
    </ul>

    {esPropietario && (
      <>
        <h5>Solicitudes pendientes</h5>
        <ul className="list-group">
          {pendientes.map((p) => (
            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{p.nombre}</span>
              <div>
                <button className="btn btn-sm btn-success me-2" onClick={() => onAceptar(p.id)}>Aceptar</button>
                <button className="btn btn-sm btn-secondary" onClick={() => onRechazar(p.id)}>Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
);

export default MiembrosPanel;
