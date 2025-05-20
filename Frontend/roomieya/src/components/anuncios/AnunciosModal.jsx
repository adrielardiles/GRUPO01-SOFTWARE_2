import React, { useState } from 'react';
import AnuncioDetalleModal from './AnuncioDetalleModal';
import CrearAnuncioModal from './CrearAnuncioModal';


const mockAnuncios = [
  { id: 1, title: 'Corte de agua', createdAt: '19-05-2025', isUrgent: true, isRead: false },
  { id: 2, title: 'Nueva clave WiFi', createdAt: '18-05-2025', isUrgent: false, isRead: false },
  { id: 3, title: 'Reunión mensual', createdAt: '16-05-2025', isUrgent: false, isRead: true },
  { id: 4, title: 'Fumigación', createdAt: '15-05-2025', isUrgent: true, isRead: true },
  { id: 5, title: 'Pago mantenimiento', createdAt: '14-05-2025', isUrgent: false, isRead: false },
  { id: 6, title: 'Normas de convivencia', createdAt: '13-05-2025', isUrgent: false, isRead: true },
  { id: 7, title: 'Fiesta piso 4', createdAt: '11-05-2025', isUrgent: false, isRead: false },
  {
  id: 8,
  title: "Corte programado de electricidad",
  createdAt: "21-05-2025",
  isUrgent: true,
  isRead: false,
  message: `Estimados residentes:

Este jueves 23 de mayo entre las 9:00 a.m. y 1:00 p.m. se realizará un corte de electricidad debido a trabajos de mantenimiento en el sistema eléctrico del edificio. 

Les recomendamos tomar las precauciones necesarias. Este aviso requiere confirmación de lectura.`
}

];




  const PAGE_SIZE = 3;

  const AnunciosModal = ({ propertyId, propertyName, role, onClose }) => {
    const [anuncioSeleccionado, setAnuncioSeleccionado] = useState(null);
    const [mostrarCrearModal, setMostrarCrearModal] = useState(false);

    const [bloqueoMensaje, setBloqueoMensaje] = useState('');
    const [anuncios, setAnuncios] = useState([...mockAnuncios]);

    const [pagina, setPagina] = useState(1);
    const esArrendador = role === 'arrendador';

  const cambiarAnuncio = (nuevoAnuncio) => {
    if (
      anuncioSeleccionado?.isUrgent &&
      !anuncioSeleccionado?.isRead
    ) {
      setBloqueoMensaje("⚠️ Debes confirmar la lectura del anuncio actual antes de cambiar.");
      return;
    }

    setBloqueoMensaje('');
    setAnuncioSeleccionado(nuevoAnuncio);
  };



  // Priorizar no leídos siempre
    const parseFecha = (fechaStr) => {
    const [dd, mm, yyyy] = fechaStr.split('-');
    return new Date(`${yyyy}-${mm}-${dd}`);
    };

    const anunciosOrdenados = [...anuncios].sort((a, b) => {

    const prioridad = (x) => {
        if (!x.isRead && x.isUrgent) return 1;    // urgente no leído
        if (!x.isRead && !x.isUrgent) return 2;   // normal no leído
        if (x.isRead && x.isUrgent) return 3;     // urgente leído
        return 4;                                 // normal leído
    };

    const pA = prioridad(a);
    const pB = prioridad(b);

    if (pA !== pB) {
        return pA - pB;
    }

    // Desempate por fecha más reciente
    return parseFecha(b.createdAt) - parseFecha(a.createdAt);
    });




  const totalPaginas = Math.ceil(anunciosOrdenados.length / PAGE_SIZE);
  const anunciosPagina = anunciosOrdenados.slice((pagina - 1) * PAGE_SIZE, pagina * PAGE_SIZE);

 return (
  <div className="modal-overlay">
    <div className="modal-contenido">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Anuncios</h4>
        <button onClick={onClose} className="btn fs-5 fw-bold">✕</button>
      </div>

      {/* Leyenda de colores */}
      <div className="legend d-flex justify-content-center gap-4 mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="color-box bg-orange"></span>
          <small>No leído</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="color-box bg-dark"></span>
          <small>Leído</small>
        </div>
      </div>

      {anunciosPagina.map((a) => (
          <div
            key={a.id}
            className={`anuncio-card ${!a.isRead ? 'no-leido' : ''} ${anuncioSeleccionado?.id === a.id ? 'seleccionado' : ''}`}
            onClick={() => cambiarAnuncio(a)}
            style={{ cursor: 'pointer' }}
          >


          <div className="d-flex align-items-center gap-2 mb-1">
            {a.isUrgent && (
                <img src="/images/warning.png" alt="urgente" width={24} />

            )}
            <strong>{a.title}</strong>
          </div>
          <div className="text-white-50 small">
            Fecha: {a.createdAt}
          </div>
        </div>
      ))}

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3 gap-2">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={`btn btn-dark btn-sm rounded-circle ${pagina === i + 1 ? 'fw-bold' : ''}`}
            onClick={() => setPagina(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

            {bloqueoMensaje && (
        <div className="text-danger text-center mt-2 fw-bold">
          {bloqueoMensaje}
        </div>
      )}


      {/* Botón de crear anuncio (solo arrendador) */}
      {esArrendador && (
        <div className="mt-4 text-center">
          <button className="btn btn-warning fw-bold px-4" onClick={() => setMostrarCrearModal(true)}>
            + Crear anuncio
          </button>

        </div>
      )}

    {anuncioSeleccionado && (
      <AnuncioDetalleModal
        anuncio={anuncioSeleccionado}
        onCerrar={() => setAnuncioSeleccionado(null)}
        onConfirmarLectura={(id) => {
          setAnuncios((prev) =>
            prev.map((a) => a.id === id ? { ...a, isRead: true } : a)
          );
          setAnuncioSeleccionado((prev) => ({ ...prev, isRead: true }));
        }}
      />
    )}

    {mostrarCrearModal && (
      <CrearAnuncioModal
        onCerrar={() => setMostrarCrearModal(false)}
        onPublicar={(nuevoAnuncio) => {
          setAnuncios((prev) => [
            { id: Date.now(), ...nuevoAnuncio, isRead: true },
            ...prev,
          ]);
          setMostrarCrearModal(false);
        }}
      />
    )}



      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex; justify-content: center; align-items: center;
          z-index: 10000;
        }

        .modal-contenido {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          width: 90%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .anuncio-card {
          background-color: #333;
          color: white;
          border-radius: 12px;
          padding: 0.8rem 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        }

        .anuncio-card.no-leido {
          background-color: #F97300;
        }

        .anuncio-card.seleccionado {
          background-color: #A63707 !important;
        }


        .color-box {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          display: inline-block;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .bg-orange {
          background-color: #F97300;
        }

        .bg-dark {
          background-color: #333;
        }
      `}</style>
    </div>
  </div>
);

};

export default AnunciosModal;
