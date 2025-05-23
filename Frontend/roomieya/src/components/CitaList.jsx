import React from 'react';

const CitaList = ({ citas, onCancel, showCancelButton }) => {
  if (!citas.length) {
    return <div className="cita-list-empty">No hay citas agendadas.</div>;
  }

  return (
    <div>
      {citas.map((cita) => (
        <div className="cita-item" key={cita.id}>
          <div className="cita-item-info">
            <div className="cita-item-title">{cita.nombre}</div>
            <div className="cita-item-details">
              Fecha: {cita.fecha} <br />
              Hora: {cita.hora} <br />
              Dirección: {cita.direccion}
            </div>
          </div>
          {showCancelButton && cita.estado !== "CANCELADO" ? (
            <button className="cita-item-btn" onClick={() => onCancel(cita.id)}>
              Cancelar
            </button>
          ) : (
            <span className="cita-cancelada-badge">Cancelado</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CitaList;
