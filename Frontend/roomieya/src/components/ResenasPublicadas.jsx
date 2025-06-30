import React from 'react';

const ResenasPublicadas = ({ reseñas, onReport }) => {
  return (
    <div>
      <h4 className="text-center">Reseñas Publicadas</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Contenido</th>
            <th>Usuario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reseñas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.content}</td>
              <td>{r.user}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    const motivo = prompt("Motivo del reporte:\n(ej: Sucia, No se parece, Ruidos)");
                    if (motivo) onReport(r, motivo);
                  }}
                >
                  Reportar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResenasPublicadas;
