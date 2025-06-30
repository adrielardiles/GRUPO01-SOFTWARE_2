import React, { useState } from 'react';
import InputField from './InputField';

const PasswordRecovery = () => {
  const [correo, setCorreo] = useState('');
  const [message, setMessage] = useState('');

  const handleRecovery = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/users/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }),
      });

      const text = await response.text();

      if (response.ok) {
        setMessage(`📧 ${text}`);
      } else {
        setMessage(`❌ ${text}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error del servidor al intentar recuperar la contraseña.');
    }
  };

  return (
    <form
      onSubmit={handleRecovery}
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#FFFDE7',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ color: '#F57F17', textAlign: 'center', marginBottom: '24px' }}>
        Recuperar Contraseña
      </h2>

      {message && (
        <p style={{ textAlign: 'center', marginBottom: '16px', color: message.includes('❌') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      <InputField
        label="Correo electrónico"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#FBC02D',
          border: 'none',
          borderRadius: '4px',
          color: '#FFFFFF',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Enviar enlace
      </button>
    </form>
  );
};

export default PasswordRecovery;
