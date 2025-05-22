import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { agendarCita } from '../../api/citaService';

// Si ya tienes un modal global, importa ese modal y reemplaza el div modal aquí.
// Este modal es simple y funciona bien para pruebas.
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>×</button>
        {children}
      </div>
    </div>
  );
};

const AgendarCitaModal = ({ inmuebleId, isOpen, onClose, onSuccess }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await agendarCita({ inmuebleId, fecha, hora });
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError('No se pudo agendar la cita. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 style={styles.title}>Agendar visita</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Fecha de visita</label>
        <input
          style={styles.input}
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
          min={new Date().toISOString().split("T")[0]}
        />
        <label style={styles.label}>Hora de visita</label>
        <input
          style={styles.input}
          type="time"
          value={hora}
          onChange={e => setHora(e.target.value)}
          required
        />
        {error && <div style={styles.error}>{error}</div>}
        <button
          type="submit"
          style={{
            ...styles.button,
            background: loading ? "#a3a3a3" : "#0056b3",
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading}
        >
          {loading ? 'Agendando...' : 'Agendar cita'}
        </button>
      </form>
    </Modal>
  );
};

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.4)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 2000,
    fontFamily: "'Open Sans', sans-serif"
  },
  modal: {
    background: "#fff", borderRadius: "16px", padding: "32px 24px 24px 24px",
    boxShadow: "0 6px 32px rgba(0,0,0,0.20)", minWidth: 320,
    position: "relative", maxWidth: 380, width: "95%"
  },
  closeBtn: {
    position: "absolute", top: 12, right: 16, background: "none", border: "none",
    fontSize: 24, color: "#333", cursor: "pointer"
  },
  title: {
    margin: 0, marginBottom: 20, color: "#0056b3", fontWeight: 700,
    fontFamily: "'Open Sans', sans-serif"
  },
  form: {
    display: "flex", flexDirection: "column", gap: 18,
    fontFamily: "'Open Sans', sans-serif"
  },
  label: {
    fontSize: 15, fontWeight: 600, color: "#444", marginBottom: 2,
    fontFamily: "'Open Sans', sans-serif"
  },
  input: {
    padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db",
    fontSize: 16, outline: "none", fontFamily: "'Open Sans', sans-serif"
  },
  button: {
    padding: "10px 0", borderRadius: "6px", border: "none",
    color: "#fff", fontWeight: 700, fontSize: 17, marginTop: 4,
    transition: "background 0.2s", fontFamily: "'Open Sans', sans-serif"
  },
  error: {
    color: "#b91c1c", background: "#fee2e2", padding: "8px",
    borderRadius: "6px", fontSize: 14, marginTop: -8
  }
};

AgendarCitaModal.propTypes = {
  inmuebleId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default AgendarCitaModal;
