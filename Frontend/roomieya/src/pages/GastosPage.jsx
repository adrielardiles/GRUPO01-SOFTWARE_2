import React, { useState } from 'react';
import FormularioGastoCompartido from '../components/FormularioGastoCompartido';
import ListaNotificaciones from '../components/ListaNotificaciones';

const GastosPage = () => {
  const [vista, setVista] = useState('formulario'); // 'formulario' o 'notificaciones'

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Gastos Compartidos</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'center' }}>
        <button
          onClick={() => setVista('formulario')}
          style={{
            padding: '8px 16px',
            backgroundColor: vista === 'formulario' ? '#f97316' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Registrar gasto
        </button>
        <button
          onClick={() => setVista('notificaciones')}
          style={{
            padding: '8px 16px',
            backgroundColor: vista === 'notificaciones' ? '#f97316' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Ver notificaciones
        </button>
      </div>

      {/* Mostrar componente según opción */}
      {vista === 'formulario' ? <FormularioGastoCompartido /> : <ListaNotificaciones />}
    </div>
  );
};

export default GastosPage;
