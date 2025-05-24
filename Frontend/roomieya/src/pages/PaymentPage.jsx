import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../api/endpoints';
import { Toast, ToastContainer, Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

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
    setMensaje('');

    try {
      const response = await axios.post(API.payments.make, {
        monto: parseFloat(monto),
        metodoPago,
        usuarioId: 1
      });

      if (response.status === 200) {
        setMensaje('✅ Pago realizado con éxito');
        setShowToast(true);
        setMonto('');
      }
    } catch (error) {
  if (error.response && error.response.data) {
    const mensajeError = error.response.data.message || error.response.data || 'Error desconocido';
    setMensaje(`❌ ${mensajeError}`);
  } else {
    setMensaje('❌ Error de conexión con el servidor');
  }
}
 finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">💰 Pagar alquiler</h2>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Monto (S/)</Form.Label>
                  <Form.Control
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    placeholder="Ej. 350"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Método de pago</Form.Label>
                  <Form.Select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="yape">Yape</option>
                    <option value="tarjeta">Tarjeta</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    onClick={handlePago}
                    disabled={cargando}
                  >
                    {cargando ? 'Procesando...' : 'Pagar ahora'}
                  </Button>
                </div>
              </Form>

              {mensaje && <p className="text-center mt-3">{mensaje}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
          <Toast.Body className="text-white">
            ✅ ¡Pago registrado con éxito!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default PaymentPage;
