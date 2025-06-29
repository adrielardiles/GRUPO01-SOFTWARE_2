import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { FaFilter, FaTimesCircle, FaCheckCircle } from 'react-icons/fa'; // agregado FaCheckCircle
import {
  filtrarPublicacionesTR,
  listarPublicacionesTR,
  getTipos,
  getProvincias,
  getDistritosPorProvincia,
  getCaracteristicas
} from '../api/api';

const etiquetasFiltro = {
  precioMin: 'Precio Mínimo',
  precioMax: 'Precio Máximo',
  tipo: 'Tipo',
  provincia: 'Provincia',
  distrito: 'Distrito',
  caracteristicas: 'Características'
};

const TinderPublicacionesTR = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritosDisponibles, setDistritosDisponibles] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [filtros, setFiltros] = useState({
    precioMin: '',
    precioMax: '',
    tipo: [],
    provincia: '',
    distrito: [],
    caracteristicas: []
  });
  const [hayFiltrosActivos, setHayFiltrosActivos] = useState(false); // nuevo estado
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchDatosIniciales = async () => {
      try {
        const [tiposData, provinciasData, caracteristicasData, publicacionesData] = await Promise.all([
          getTipos(),
          getProvincias(),
          getCaracteristicas(),
          listarPublicacionesTR() // carga inicial de todas las publicaciones
        ]);
        setTipos(tiposData);
        setProvincias(provinciasData);
        setCaracteristicas(caracteristicasData);
        setPublicaciones(publicacionesData);
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
      }
    };
    fetchDatosIniciales();
  }, []);

  useEffect(() => {
    const fetchDistritos = async () => {
      if (filtros.provincia) {
        try {
          const distritosData = await getDistritosPorProvincia(filtros.provincia);
          setDistritosDisponibles(distritosData);
        } catch (error) {
          console.error('Error al cargar distritos:', error);
        }
      } else {
        setDistritosDisponibles([]);
      }
    };
    fetchDistritos();
  }, [filtros.provincia]);

  const aplicarFiltros = async () => {
    try {
      const resultados = await filtrarPublicacionesTR(filtros);
      setPublicaciones(resultados);
      setCurrentIndex(0);
      // determina si hay filtros activos
      const activos = Object.values(filtros).some(val =>
        Array.isArray(val) ? val.length > 0 : val !== ''
      );
      setHayFiltrosActivos(activos);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  const handleAnimationEnd = () => {
    setAnimation(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const onLike = () => {
    if (animation) return;
    setAnimation('like');
  };

  const onNo = () => {
    if (animation) return;
    setAnimation('no');
  };

  const handleRemoveFiltro = (clave, valor) => {
    setFiltros(prev => {
      if (Array.isArray(prev[clave])) {
        return { ...prev, [clave]: prev[clave].filter(v => v !== valor) };
      }
      return { ...prev, [clave]: '' };
    });
  };

  const toggleSelection = (clave, valor) => {
    setFiltros(prev => {
      const actual = new Set(prev[clave]);
      if (actual.has(valor)) actual.delete(valor);
      else actual.add(valor);
      return { ...prev, [clave]: Array.from(actual) };
    });
  };

  const publicacion = publicaciones[currentIndex];

  return (
    <div style={estilos.fondo}>
      <style>{estilosCSS}</style>

      <button
        onClick={() => setMostrarFiltros(true)}
        className="btn text-white fw-semibold shadow"
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          backgroundColor: '#FF8A08',
          border: '1px solid white'
        }}
      >
        <FaFilter className="me-2" /> Filtros
        {hayFiltrosActivos && (
          <FaCheckCircle className="ms-2" color="#28a745" /> // icono de filtros activos
        )}
      </button>

      {mostrarFiltros && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            inset: 0,
            zIndex: 1050
          }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
            <div
              className="modal-content p-4"
              style={{
                borderRadius: '20px',
                background: '#ffffff',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title fw-semibold" style={{ color: '#FF8A08' }}>
                  Filtrar Publicaciones
                </h5>
                <button type="button" className="btn-close" onClick={() => setMostrarFiltros(false)}></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMostrarFiltros(false);
                  aplicarFiltros();
                }}
              >
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label fw-medium" style={{ color: '#FF8A08' }}>
                      Precio mínimo (S/)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={filtros.precioMin}
                      onChange={e => setFiltros({ ...filtros, precioMin: e.target.value })}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label fw-medium" style={{ color: '#FF8A08' }}>
                      Precio máximo (S/)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={filtros.precioMax}
                      onChange={e => setFiltros({ ...filtros, precioMax: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: '#FF8A08' }}>Provincia</label>
                  <select
                    className="form-select"
                    value={filtros.provincia}
                    onChange={(e) => setFiltros({ ...filtros, provincia: e.target.value, distrito: [] })}
                  >
                    <option value="">Seleccionar...</option>
                    {provincias.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: '#FF8A08' }}>Distrito</label>
                  <Select
                    isMulti
                    options={distritosDisponibles.map(d => ({ label: d, value: d }))}
                    value={distritosDisponibles
                      .filter(d => filtros.distrito.includes(d))
                      .map(d => ({ label: d, value: d }))}
                    onChange={(selected) => setFiltros({ ...filtros, distrito: selected.map(s => s.value) })}
                  />
                </div>

                {[['tipo', tipos], ['caracteristicas', caracteristicas]].map(([clave, opciones]) => (
                  <div key={clave} className="form-group mb-3">
                    <label className="form-label fw-medium" style={{ color: '#FF8A08' }}>{etiquetasFiltro[clave]}</label>
                    <div className="d-flex flex-wrap gap-2">
                      {opciones.map(op => (
                        <button
                          key={op}
                          type="button"
                          className={`btn btn-sm ${filtros[clave].includes(op) ? 'btn-warning' : 'btn-outline-warning'}`}
                          onClick={() => toggleSelection(clave, op)}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between flex-wrap gap-2">
                  {Object.entries(filtros).flatMap(([clave, val]) => {
                    if (Array.isArray(val)) return val.map(v => [clave, v]);
                    return val ? [[clave, val]] : [];
                  }).map(([clave, valor]) => (
                    <span
                      key={clave + valor}
                      className="badge bg-warning text-dark d-flex align-items-center"
                    >
                      {etiquetasFiltro[clave] || clave}: {valor}{' '}
                      <FaTimesCircle
                        onClick={() => handleRemoveFiltro(clave, valor)}
                        style={{ marginLeft: '6px', cursor: 'pointer' }}
                      />
                    </span>
                  ))}
                  <button type="submit" className="btn text-white fw-semibold" style={{ backgroundColor: '#FF8A08' }}>
                    Aplicar filtros
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div style={estilos.card}>
        <div style={{
          flexGrow: 1,
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {publicacion ? (
<div
  ref={cardRef}
  onAnimationEnd={handleAnimationEnd}
  style={{
    background: '#fff',
    borderRadius: '16px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    animation: animation === 'like' ? 'swipe-right 0.35s forwards' :
      animation === 'no' ? 'swipe-left 0.35s forwards' : 'none',
    overflow: 'hidden'
  }}
>
  <img
    src={publicacion.imagenurl}
    alt={publicacion.nombreInmueble}
    style={{
      width: '100%',
      height: '220px', // altura fija para mejor estética
      objectFit: 'cover',
    }}
  />
  <div style={{
    flex: 1,
    padding: '12px 16px',
    overflowY: 'auto',
    fontSize: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}>
    <div>
      <h2 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '6px' }}>{publicacion.nombreInmueble}</h2>
      <p style={{ marginBottom: '4px' }}><strong>Dirección:</strong> {publicacion.direccion}</p>
      <p style={{ marginBottom: '4px' }}><strong>Distrito:</strong> {publicacion.distrito}</p>
      <p style={{ marginBottom: '4px' }}><strong>Provincia:</strong> {publicacion.provincia}</p>
      <p style={{ marginBottom: '4px' }}><strong>Tipo:</strong> {publicacion.tipo}</p>
      <p style={{ marginBottom: '4px' }}><strong>Precio:</strong> S/ {publicacion.precio}</p>
      <p style={{ marginBottom: '4px' }}><strong>Arrendatario:</strong> {publicacion.arrendatario}</p>
      <p style={{ marginBottom: '0' }}><strong>Características:</strong> {publicacion.servicios && publicacion.servicios.join(', ')}</p>
    </div>
  </div>
</div>

          ) : (
            <div style={{ padding: '50px', textAlign: 'center', color: '#555', fontSize: '16px' }}>
              No hay más publicaciones.
            </div>
          )}
        </div>
        <div style={estilos.botones}>
          <button onClick={() => { onNo(); setTimeout(() => setCurrentIndex(prev => prev + 1), 350); }} className="btn-rechazar">✖</button>
          <button onClick={() => { onLike(); setTimeout(() => setCurrentIndex(prev => prev + 1), 350); }} className="btn-aceptar">✔</button>
        </div>
      </div>
    </div>
  );
};

const estilos = {
  fondo: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: 'white',
    backgroundImage: `repeating-linear-gradient(45deg, rgba(255,138,8,0.1), rgba(255,138,8,0.1) 1px, transparent 1px, transparent 20px)`,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    width: '320px',
    maxWidth: '90vw',
    height: '620px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  botones: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px'
  }
};

const estilosCSS = `
.btn-aceptar, .btn-rechazar {
  width: 48px;
  height: 48px;
  font-size: 22px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-aceptar {
  border-color: #28a745;
  color: #28a745;
}

.btn-rechazar {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-aceptar:hover {
  background-color: #28a745;
  color: white;
}

.btn-rechazar:hover {
  background-color: #dc3545;
  color: white;
}`;

export default TinderPublicacionesTR;
