import React, { useState } from 'react';
import { cancelarCita } from '../api/citaService';

const CitaCard = ({ cita, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      await cancelarCita(cita.id);
      onCancel && onCancel(cita.id);
    } catch (err) {
      setError('No se pudo cancelar la cita. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'relative',
      fontFamily: "'Open Sans', sans-serif"
    }}>
      <h4>Visita programada</h4>
      <p>
        Fecha: <b>{cita.fecha}</b><br/>
        Hora: <b>{cita.hora}</b><br/>
        Inmueble: <b>{cita.inmueble?.titulo || cita.inmueble?.nombre || '---'}</b>
      </p>
      <button
        style={{
          background: '#b91c1c',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 700
        }}
        disabled={loading}
        onClick={() => setShowConfirm(true)}
      >
        {loading ? 'Cancelando...' : 'Cancelar cita'}
      </button>
      {showConfirm &&
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.2)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 2100
        }}>
          <div style={{
            background: '#fff', padding: 30, borderRadius: 10,
            minWidth: 300, boxShadow: '0 8px 24px rgba(0,0,0,0.13)'
          }}>
            <p style={{marginBottom: 18, color: "#333"}}>¿Seguro que quieres cancelar esta cita?</p>
            <button
              style={{
                background: '#b91c1c', color: '#fff',
                border: 'none', borderRadius: 6, padding: '8px 16px',
                marginRight: 12, fontWeight: 700
              }}
              onClick={handleCancel}
              disabled={loading}
            >
              Sí, cancelar
            </button>
            <button
              style={{
                background: '#e5e7eb', color: '#222',
                border: 'none', borderRadius: 6, padding: '8px 16px',
                fontWeight: 600
              }}
              onClick={() => setShowConfirm(false)}
              disabled={loading}
            >
              No, volver
            </button>
          </div>
        </div>
      }
      {error && <div style={{color:'#b91c1c', marginTop: 6}}>{error}</div>}
    </div>
  );
};

export default CitaCard;
