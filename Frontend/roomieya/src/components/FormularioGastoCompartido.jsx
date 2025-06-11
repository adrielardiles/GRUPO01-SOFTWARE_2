import React, { useState } from 'react';

const listaParticipantes = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'María' },
  { id: 3, nombre: 'Carlos' },
];

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

  const [mensaje, setMensaje] = useState('');
  const [mensajeTipo, setMensajeTipo] = useState(''); // 'error' o 'success'
  const [showModal, setShowModal] = useState(false);
  const [datosConfirmacion, setDatosConfirmacion] = useState(null);

  const manejarCambioParticipantes = (e) => {
    const valor = parseInt(e.target.value);
    if (e.target.checked) {
      setParticipantes([...participantes, valor]);
    } else {
      setParticipantes(participantes.filter(id => id !== valor));
    }
  };

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

  const confirmarRegistro = () => {
    console.log('Gasto confirmado:', datosConfirmacion);
    setShowModal(false);
    setMensajeTipo('success');
    setMensaje('¡Gasto registrado con éxito!');
    setMonto('');
    setDescripcion('');
    setFecha('');
    setParticipantes([]);
    setCategoria('');
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
          <label className="form-label d-block">Participantes:</label>
          {listaParticipantes.map(p => (
            <div key={p.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value={p.id}
                checked={participantes.includes(p.id)}
                onChange={manejarCambioParticipantes}
                id={`participante-${p.id}`}
              />
              <label className="form-check-label" htmlFor={`participante-${p.id}`}>
                {p.nombre}
              </label>
            </div>
          ))}
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
                <p><strong>Participantes:</strong> {datosConfirmacion.participantes.join(', ')}</p>
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
