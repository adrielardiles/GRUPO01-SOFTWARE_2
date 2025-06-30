import React, { useState } from 'react';
import InputField from './InputField';

const AccountEdit = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.correo) {
      setMensaje('❌ No se pudo obtener el correo del usuario.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: user.correo,
          nombreCompleto,
          telefono,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setMensaje('✅ Datos actualizados correctamente.');

      // Actualiza los datos del usuario en localStorage si deseas
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      setMensaje(`❌ Error al actualizar: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#FFF8E1',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ color: '#E65100', textAlign: 'center', marginBottom: '24px' }}>
        Editar Cuenta
      </h2>

      <InputField
        label="Nombre completo"
        type="text"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
      />

      <InputField
        label="Teléfono"
        type="text"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#FF6F00',
          border: 'none',
          borderRadius: '4px',
          color: '#FFFFFF',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Guardar Cambios
      </button>

      {mensaje && (
        <p style={{ marginTop: '16px', color: mensaje.startsWith('✅') ? 'green' : 'red' }}>
          {mensaje}
        </p>
      )}
    </form>
  );
};

export default AccountEdit;
