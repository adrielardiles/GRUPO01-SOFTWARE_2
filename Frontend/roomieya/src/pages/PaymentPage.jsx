import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap'; // ✅ Asegúrate que Bootstrap esté activo

const PaymentPage = () => {
  const [monto, setMonto] = useState('');
  const [metodoPago, setMetodoPago] = useState('yape');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  const handlePagar = async () => {
    setMensaje('');
    setErrorValidacion('');

    // Validación
    if (!monto || parseFloat(monto) <= 0) {
      setErrorValidacion('Por favor, ingresa un monto válido.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:8080/api/pagos/realizar', {
        monto,
        metodoPago,
        usuarioId: 1
      });
      setMensaje('✅ Pago exitoso');
      setMonto('');
      setMetodoPago('yape');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-warning mb-4">Realizar pago de alquiler</h3>

        <div className="mb-3">
          <label htmlFor="monto" className="form-label">Monto (S/.)</label>
          <input
            type="number"
            id="monto"
            className="form-control"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ejemplo: 450"
          />
          {errorValidacion && <div className="text-danger mt-1">{errorValidacion}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="metodoPago" className="form-label">Método de pago</label>
          <select
            id="metodoPago"
            className="form-select"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="yape">Yape</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </div>

        <button
          className="btn btn-warning w-100 d-flex align-items-center justify-content-center"
          onClick={handlePagar}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Procesando...
            </>
          ) : (
            'Pagar ahora'
          )}
        </button>

        {mensaje && (
          <div className="alert alert-info text-center mt-3" role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
