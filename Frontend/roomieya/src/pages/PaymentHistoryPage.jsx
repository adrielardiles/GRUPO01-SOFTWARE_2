import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentHistoryPage = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/pagos/usuario/1')
      .then((res) => {
        setHistorial(res.data);
      })
      .catch((err) => {
        console.error('Error al obtener historial de pagos:', err);
      });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4">
        <h3 className="text-center text-warning mb-4">Historial de Pagos</h3>

        {historial.length === 0 ? (
          <div className="alert alert-secondary text-center">
            No hay pagos registrados.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-warning text-center">
                <tr>
                  <th>Fecha</th>
                  <th>Monto (S/)</th>
                  <th>Método</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {historial.map((pago, index) => (
                  <tr key={index}>
                    <td>{pago.fecha}</td>
                    <td>{pago.monto}</td>
                    <td>{pago.metodoPago}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;