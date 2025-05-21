import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportedReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reviews/reported")
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error("Error al cargar las reseñas:", error));
  }, []);

  const eliminarReview = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta reseña?");
    if (!confirmar) return;

    fetch(`http://localhost:8080/api/reviews/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Filtra la reseña eliminada de la lista actual
          setReviews(prev => prev.filter(r => r.id !== id));
        } else {
          alert("Error al eliminar la reseña.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("No se pudo eliminar la reseña.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center text-danger">Reseñas Reportadas</h2>

        {reviews.length === 0 ? (
          <div className="alert alert-warning text-center">
            No hay reseñas reportadas por el momento.
          </div>
        ) : (
          <table className="table table-bordered table-hover">
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
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.content}</td>
                  <td>{review.user}</td>
                  <td>{review.reason}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarReview(review.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportedReviews;
