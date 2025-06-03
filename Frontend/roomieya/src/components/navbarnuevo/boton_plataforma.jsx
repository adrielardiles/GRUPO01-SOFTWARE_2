// BotonPlataforma.jsx
import React, { useState } from 'react';
import { FaInfoCircle, FaBullhorn, FaRegNewspaper } from 'react-icons/fa';
import InmueblesContainer from '../anuncios/InmueblesContainer';

const BotonPlataforma = () => {
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [mostrarAnuncios, setMostrarAnuncios] = useState(false);

  return (
    <>
      <div style={{ position: 'absolute', left: '10px', top: '60px', zIndex: 1000 }}>
        <button
          onClick={() => setMostrarPanel(!mostrarPanel)}
          className="btn btn-dark shadow d-flex align-items-center justify-content-center"
          style={{ width: '42px', height: '42px', borderRadius: '50%' }}
        >
          <FaInfoCircle size={20} />
        </button>

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
    </>
  );
};

export default BotonPlataforma;
