import React, { useState } from 'react';
import InputField from './InputField';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va tu lógica para enviar datos al backend
    console.log({ email, password, name });
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
        Registro de Usuario
      </h2>

      <InputField
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputField
        label="Nombre completo"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        Crear cuenta
      </button>
    </form>
  );
};

export default RegisterForm;
