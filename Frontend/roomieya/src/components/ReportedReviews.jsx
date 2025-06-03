import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportedReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Activar esta bandera para usar datos simulados en lugar del fetch real
  const modoPrueba = true;

  useEffect(() => {
    if (modoPrueba) {
      // Datos simulados para pruebas
      const mockReviews = [
        {
          id: 1,
          content: "Esta reseña es ofensiva.",
          user: "DiegoBuenaño47",
          reason: "Lenguaje inapropiado"
        },
        {
          id: 2,
          content: "La información es falsa.",
          user: "FabrizioVela94",
          reason: "Contenido engañoso"
        }
      ];
      setReviews(mockReviews);
    } else {
      fetch("http://localhost:8081/api/reviews/reported")
        .then(response => response.json())
        .then(data => setReviews(data))
        .catch(error => console.error("Error al cargar las reseñas:", error));
    }
  }, []);

  const eliminarReview = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta reseña?");
    if (!confirmar) return;

    if (modoPrueba) {
      setReviews(prev => prev.filter(r => r.id !== id));
    } else {
      fetch(`http://localhost:8081/api/reviews/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            setReviews(prev => prev.filter(r => r.id !== id));
          } else {
            alert("Error al eliminar la reseña.");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("No se pudo eliminar la reseña.");
        });
    }
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
