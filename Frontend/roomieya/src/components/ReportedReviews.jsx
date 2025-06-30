import React from 'react';

const ReportedReviews = ({ reviews, onDelete }) => {
  return (
    <div>
      <h4 className="text-center text-danger">🚨 Reseñas Reportadas</h4>
      {reviews.length === 0 ? (
        <div className="alert alert-warning text-center">No hay reseñas reportadas.</div>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Contenido</th>
              <th>Usuario</th>
              <th>Motivo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.content}</td>
                <td>{r.user}</td>
                <td>{r.reason}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(r.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportedReviews;
