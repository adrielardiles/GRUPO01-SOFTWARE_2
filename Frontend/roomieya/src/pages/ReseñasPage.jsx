import React, { useState, useEffect } from 'react';
import ResenasPublicadas from '../components/ResenasPublicadas';
import ReportedReviews from '../components/ReportedReviews';

const ResenasPage = () => {
  const [tab, setTab] = useState('publicadas');
  const [publicReviews, setPublicReviews] = useState([]);
  const [reportedReviews, setReportedReviews] = useState([]);

  useEffect(() => {
    // Ejemplos iniciales realistas
    setPublicReviews([
      { id: 1, content: "Muy buena experiencia, el lugar era tal como se mostraba", user: "Carlos87", score: 5, tenantId: "T001" },
      { id: 2, content: "No se parecía a las fotos, estaba sucio", user: "LuisaG", score: 2, tenantId: "T002" },
      { id: 3, content: "Excelente ubicación, pero un poco ruidoso", user: "MarcoP", score: 4, tenantId: "T003" }
    ]);
    setReportedReviews([]);
  }, []);

  const reportarResena = (resena) => {
    const opciones = [
      "1. Contenido falso",
      "2. Lenguaje ofensivo",
      "3. Publicidad o spam",
      "4. Otro"
    ];
    const eleccion = prompt(`Selecciona el motivo del reporte:\n${opciones.join('\n')}`);
    let motivo = '';

    switch (eleccion) {
      case '1': motivo = 'Contenido falso'; break;
      case '2': motivo = 'Lenguaje ofensivo'; break;
      case '3': motivo = 'Publicidad o spam'; break;
      case '4': motivo = 'Otro'; break;
      default: alert("Motivo no válido"); return;
    }

    setReportedReviews(prev => [...prev, { ...resena, reason: motivo }]);
    setPublicReviews(prev => prev.filter(r => r.id !== resena.id));
  };

  const eliminarResenaReportada = (id) => {
    setReportedReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="btn-group w-100 mb-3">
        <button
          className={`btn btn-outline-primary ${tab === 'publicadas' ? 'active' : ''}`}
          onClick={() => setTab('publicadas')}
        >
          Reseñas
        </button>
        <button
          className={`btn btn-outline-danger ${tab === 'reportadas' ? 'active' : ''}`}
          onClick={() => setTab('reportadas')}
        >
          Reseñas Reportadas
        </button>
      </div>

      <div className="card shadow p-3">
        {tab === 'publicadas' ? (
          <ResenasPublicadas reseñas={publicReviews} onReport={reportarResena} />
        ) : (
          <ReportedReviews reviews={reportedReviews} onDelete={eliminarResenaReportada} />
        )}
      </div>
    </div>
  );
};

export default ResenasPage;
