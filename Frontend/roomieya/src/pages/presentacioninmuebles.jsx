import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBookmark, FaInfoCircle, FaBullhorn, FaRegNewspaper } from 'react-icons/fa';
import BuscadorVoz from '../components/voz/BuscadorVoz';
import InmueblesContainer from '../components/anuncios/InmueblesContainer';

const BASE_URL = 'http://localhost:8081';

const TinderInmueblesIntegrado = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [esBusquedaPorVoz, setEsBusquedaPorVoz] = useState(false);
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [mostrarAnuncios, setMostrarAnuncios] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    cargarInmuebles('', 0);
  }, []);

  const cargarInmuebles = async (texto, page) => {
    try {
      if (!texto || texto.trim().length === 0) setEsBusquedaPorVoz(false);

      const endpoint = texto && texto.trim().length > 0
        ? `${BASE_URL}/api/inmuebles/buscar?texto=${encodeURIComponent(texto)}&page=${page}&size=10`
        : `${BASE_URL}/api/inmuebles?page=${page}&size=10`;

      const res = await fetch(endpoint);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Respuesta no JSON:\n${text}`);
      }

      const data = await res.json();
      setInmuebles(data);
      setPagina(page);
      setTextoBusqueda(texto);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Error al cargar inmuebles:', err);
    }
  };

  const buscarPorVoz = (texto) => {
    setEsBusquedaPorVoz(true);
    cargarInmuebles(texto, 0);
  };

  const handleAnimationEnd = () => {
    setAnimation(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const onLike = () => {
    if (animation) return;
    const actual = inmuebles[currentIndex];
    if (actual) setFavoritos([...favoritos, actual]);
    setAnimation('like');
  };

  const onNo = () => {
    if (animation) return;
    setAnimation('no');
  };

  const inmueble = inmuebles[currentIndex];

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      background: '#FF7F3E',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* BOTONES LATERALES IZQUIERDOS */}
      <div style={{ position: 'absolute', left: '10px', top: '40px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Botón de Información */}
        <button
          onClick={() => setMostrarPanel(!mostrarPanel)}
          className="btn btn-dark shadow"
          style={{ width: '60px', height: '60px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <FaInfoCircle size={24} />
        </button>

        {/* Botón de Voz */}
        <BuscadorVoz onBuscar={buscarPorVoz} />

        {mostrarPanel && (
          <div
            style={{
              marginTop: '10px',
              width: '160px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <button onClick={() => setMostrarAnuncios(true)} className="btn btn-outline-dark d-flex align-items-center gap-2">
              <FaBullhorn /> Anuncios
            </button>
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
              <FaRegNewspaper /> Placeholder 1
            </button>
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
              <FaRegNewspaper /> Placeholder 2
            </button>
          </div>
        )}
      </div>

      {/* MODAL ANUNCIOS */}
      {mostrarAnuncios && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="modal-title">Anuncios</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarAnuncios(false)}></button>
              </div>
              <div className="modal-body">
                <InmueblesContainer />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={() => setMostrarModal(true)}
          className="btn btn-light rounded-pill text-dark shadow"
          style={{ fontSize: '0.9rem', padding: '6px 12px' }}
        >
          <FaBookmark className="me-2" /> Ver seleccionados
        </button>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)', overflow: 'hidden', width: '320px', maxWidth: '90vw', height: '620px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ flexGrow: 1, padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {inmueble ? (
                <div
                  ref={cardRef}
                  onAnimationEnd={handleAnimationEnd}
                  style={{ background: '#fff', borderRadius: '16px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, opacity 0.3s ease', animation: animation === 'like' ? 'swipe-right 0.35s forwards' : animation === 'no' ? 'swipe-left 0.35s forwards' : 'none', overflow: 'hidden' }}
                >
                  <img
                    src={inmueble.imagenurl || inmueble.imagenUrl || 'https://via.placeholder.com/400x300'}
                    alt={`Imagen de ${inmueble.nombre}`}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                  />
                  <div style={{ padding: '12px 16px', flexGrow: 1, overflowY: 'auto', fontSize: '0.9rem', minHeight: 0 }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#333' }}>{inmueble.nombre}</h2>
                    <p style={{ color: inmueble.ubicacionExacta ? 'green' : inmueble.ubicacionCercana ? '#ff8c00' : '#333' }}>
                      <strong>Dirección:</strong> {inmueble.direccion}
                    </p>
                    <p><strong>Tipo:</strong> {inmueble.tipoInmueble || inmueble.tipo}</p>
                    <p><strong>Precio:</strong> S/ {inmueble.precio}</p>
                    <p><strong>Servicios:</strong> {inmueble.servicios}</p>
                    {esBusquedaPorVoz && inmueble.serviciosCoincidentes?.length > 0 && (
                      <p><strong>Servicios coincidentes:</strong> <span style={{ color: '#007bff', fontWeight: 'bold' }}>{inmueble.serviciosCoincidentes.join(', ')}</span></p>
                    )}
                    <button
                      style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}
                      onClick={() => alert(`Más información de: ${inmueble.nombre}`)}
                    >
                      Ver más información
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '50px', textAlign: 'center', color: '#555', fontSize: '16px' }}>
                  No hay más inmuebles.
                </div>
              )}
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '40px' }}>
              <button onClick={() => { onNo(); setTimeout(() => setCurrentIndex(prev => prev + 1), 350); }} style={btnEstilo('#dc3545')}>✖</button>
              <button onClick={() => { onLike(); setTimeout(() => setCurrentIndex(prev => prev + 1), 350); }} style={btnEstilo('#28a745')}>✔</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const btnEstilo = (color) => ({
  width: 48,
  height: 48,
  fontSize: 22,
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: `2.5px solid ${color}`,
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  cursor: 'pointer'
});

export default TinderInmueblesIntegrado;
