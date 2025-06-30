import React, { useState } from 'react';
import axios from 'axios';

const categorias = [
  'Alquiler',
  'Luz',
  'Agua',
  'Internet',
  'Comida',
];

export default function FormularioGastoCompartido() {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [nuevoParticipante, setNuevoParticipante] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajeTipo, setMensajeTipo] = useState(''); // 'error' o 'success'
  const [showModal, setShowModal] = useState(false);
  const [datosConfirmacion, setDatosConfirmacion] = useState(null);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!monto || monto <= 0) {
      setMensajeTipo('error');
      setMensaje('Ingrese un monto válido');
      return;
    }
    if (!fecha) {
      setMensajeTipo('error');
      setMensaje('Seleccione una fecha');
      return;
    }
    if (participantes.length === 0) {
      setMensajeTipo('error');
      setMensaje('Seleccione al menos un participante');
      return;
    }
    if (!categoria) {
      setMensajeTipo('error');
      setMensaje('Seleccione una categoría');
      return;
    }

    const datos = { monto, descripcion, fecha, participantes, categoria };
    setDatosConfirmacion(datos);
    setShowModal(true);
    setMensaje('');
  };

  const confirmarRegistro = async () => {
    try {
      const payload = {
        monto: parseFloat(datosConfirmacion.monto),
        descripcion: datosConfirmacion.descripcion,
        fecha: datosConfirmacion.fecha,
        participantes: datosConfirmacion.participantes.map(p => p.nombre),
        categoria: datosConfirmacion.categoria,
      };

      const response = await axios.post('http://localhost:8081/api/gastos-compartidos', payload);
      console.log('Respuesta del backend:', response.data);

      setShowModal(false);
      setMensajeTipo('success');
      setMensaje('¡Gasto registrado con éxito!');
      setMonto('');
      setDescripcion('');
      setFecha('');
      setParticipantes([]);
      setCategoria('');
    } catch (error) {
      console.error('Error al registrar el gasto:', error);
      setMensajeTipo('error');
      setMensaje('Hubo un error al registrar el gasto');
      setShowModal(false);
    }
  };

  const agregarParticipante = () => {
    if (nuevoParticipante) {
      setParticipantes([...participantes, { nombre: nuevoParticipante }]);
      setNuevoParticipante('');
    } else {
      setMensajeTipo('error');
      setMensaje('Por favor ingrese el nombre del participante.');
    }
  };

  const eliminarParticipante = (nombre) => {
    const nuevosParticipantes = participantes.filter(p => p.nombre !== nombre);
    setParticipantes(nuevosParticipantes);
  };

  return (
    <>
      <form onSubmit={manejarEnvio} className="mx-auto p-4 border rounded" style={{ maxWidth: 450 }}>
        <h2 className="mb-4">Registrar gasto compartido</h2>

        {mensaje && (
          <div className={`alert ${mensajeTipo === 'error' ? 'alert-danger' : 'alert-success'}`} role="alert">
            {mensaje}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Monto (S/):</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={monto}
            onChange={e => setMonto(e.target.value)}
            placeholder="Ej. 350"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            className="form-control"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Ej. Luz del mes"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label d-block">Nombres de participantes que realizarán el pago:</label>
          <div className="d-flex flex-column mb-3">
            <input
              type="text"
              className="form-control mb-2"
              value={nuevoParticipante}
              onChange={e => setNuevoParticipante(e.target.value)}
              placeholder="Ingrese el nombre del participante"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={agregarParticipante}
            >
              Agregar Participante
            </button>
          </div>

          {participantes.length > 0 && (
            <ul className="list-group">
              {participantes.map((p, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {p.nombre}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarParticipante(p.nombre)}
                  >
                    <span className="material-icons">cancel</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Categoría:</label>
          <select
            className="form-select"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Registrar gasto</button>
      </form>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar gasto</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Monto:</strong> S/ {datosConfirmacion.monto}</p>
                <p><strong>Descripción:</strong> {datosConfirmacion.descripcion || 'N/A'}</p>
                <p><strong>Fecha:</strong> {datosConfirmacion.fecha}</p>
                <p><strong>Categoría:</strong> {datosConfirmacion.categoria}</p>
                <p><strong>Participantes:</strong> {datosConfirmacion.participantes.map(p => p.nombre).join(', ')}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={confirmarRegistro}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
