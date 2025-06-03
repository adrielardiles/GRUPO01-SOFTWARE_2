import React, { useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const BuscadorVoz = ({ onBuscar }) => {
  const [grabando, setGrabando] = useState(false);
  const reconocimientoRef = useRef(null);

  const iniciarReconocimiento = () => {
    const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    reconocimiento.lang = 'es-PE';
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onstart = () => setGrabando(true);
    reconocimiento.onend = () => setGrabando(false);

    reconocimiento.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      console.log("🎤 Texto reconocido (frontend):", texto);
      onBuscar(texto);
    };

    reconocimientoRef.current = reconocimiento;
    reconocimiento.start();
  };

  const cancelarGrabacion = () => {
    if (reconocimientoRef.current) {
      reconocimientoRef.current.abort(); // Cancela la grabación
      setGrabando(false);
    }
  };

  return (
    <>
      <button
        onClick={iniciarReconocimiento}
        className="btn btn-light shadow"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '15px',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FaMicrophone size={28} color="#000" />
      </button>

      {grabando && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            inset: 0,
            zIndex: 1050
          }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-4 text-center p-4">
              <h5 className="modal-title mb-3">🎙️ Escuchando…</h5>
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3 text-muted">Por favor, habla claramente.</p>
              <button
                onClick={cancelarGrabacion}
                className="btn btn-outline-danger mt-3"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuscadorVoz;
