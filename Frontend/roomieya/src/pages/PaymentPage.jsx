import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../api/endpoints';
import { Toast, ToastContainer } from 'react-bootstrap';

const PaymentPage = () => {
  const [monto, setMonto] = useState('');
  const [metodoPago, setMetodoPago] = useState('yape');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePago = async () => {
    if (!monto || parseFloat(monto) <= 0) {
      setMensaje('⚠️ Ingrese un monto válido.');
      return;
    }

    setCargando(true);
    try {
      await axios.post(API.payments.make, {
        monto: parseFloat(monto),
        metodoPago,
        usuarioId: 1
      });
      setMensaje('✅ Pago realizado con éxito');
      setShowToast(true); // 🎉 Mostrar Toast
      setMonto('');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al realizar el pago');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pagar alquiler</h2>
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto en soles"
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <select
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      >
        <option value="yape">Yape</option>
        <option value="tarjeta">Tarjeta</option>
      </select>
      <button onClick={handlePago} disabled={cargando}>
        {cargando ? 'Procesando...' : 'Pagar ahora'}
      </button>
      <p>{mensaje}</p>

      {/* Toast visual */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">RoomieYA</strong>
          </Toast.Header>
          <Toast.Body className="text-white">✅ ¡Pago registrado con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default PaymentPage;
