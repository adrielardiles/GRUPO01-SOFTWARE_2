import React, { useEffect } from 'react';

const Toast = ({ mensaje, tipo = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto cierra
    return () => clearTimeout(timer);
  }, [onClose]);

  const color = tipo === 'success' ? '#198754' : '#dc3545';

  return (
    <div className="toast-container">
      <div className="toast-box" style={{ backgroundColor: color }}>
        {mensaje}
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 10500;
        }

        .toast-box {
          padding: 0.75rem 1.2rem;
          color: white;
          font-weight: bold;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Toast;
